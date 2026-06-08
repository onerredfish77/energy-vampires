import { reactive, computed, watch } from 'vue'
import { DEVICES } from '@/data/devices.js'

export const ELECTRICITY_RATE = 0.16

const STORAGE_KEY = 'volt-watch:game-state'
const STORAGE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours
const STORAGE_VERSION = 1

const VAMPIRE_THRESHOLDS = [
  { state: 1, max: 50 },
  { state: 2, max: 150 },
  { state: 3, max: 300 },
  { state: 4, max: Infinity }
]

const DEVICE_BY_ID = new Map(DEVICES.map(d => [d.id, d]))

function hydrateFromStorage() {
  if (typeof window === 'undefined' || !window.localStorage) return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.version !== STORAGE_VERSION) return null
    if (!parsed.savedAt || Date.now() - parsed.savedAt > STORAGE_TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    if (!Array.isArray(parsed.housedDevices)) return null
    // Drop any instances whose deviceId no longer exists in the catalog.
    const housedDevices = parsed.housedDevices.filter(i => DEVICE_BY_ID.has(i?.deviceId))
    return { housedDevices, instanceCounter: parsed.instanceCounter ?? 0 }
  } catch {
    return null
  }
}

const hydrated = hydrateFromStorage()

const state = reactive({
  housedDevices: hydrated?.housedDevices ?? [],
  lastSaving: 0
})

let instanceCounter = hydrated?.instanceCounter ?? 0
const nextInstanceId = () => `inst-${++instanceCounter}-${Date.now()}`

function persist() {
  if (typeof window === 'undefined' || !window.localStorage) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: STORAGE_VERSION,
      savedAt: Date.now(),
      instanceCounter,
      housedDevices: state.housedDevices
    }))
  } catch {
    // Quota exceeded or storage unavailable — silently ignore; in-memory state still works.
  }
}

watch(
  () => state.housedDevices,
  () => persist(),
  { deep: true }
)

const lookupDevice = (deviceId) => DEVICE_BY_ID.get(deviceId)

const dailyKwhFor = (instance) => {
  const device = lookupDevice(instance.deviceId)
  if (!device) return 0
  return (device.wattsDefault * 24 * instance.quantity) / 1000
}

const annualCostFor = (instance) => {
  return dailyKwhFor(instance) * 365 * ELECTRICITY_RATE
}

const totalWatts = computed(() =>
  state.housedDevices.reduce((sum, inst) => {
    if (!inst.pluggedIn) return sum
    const device = lookupDevice(inst.deviceId)
    return device ? sum + device.wattsDefault * inst.quantity : sum
  }, 0)
)

const vampireState = computed(() => {
  const watts = totalWatts.value
  return VAMPIRE_THRESHOLDS.find(t => watts <= t.max).state
})

const tallyDaily = computed(() => {
  const kwh = (totalWatts.value * 24) / 1000
  return { kwh, cost: kwh * ELECTRICITY_RATE }
})

const tallyWeekly = computed(() => ({
  kwh: tallyDaily.value.kwh * 7,
  cost: tallyDaily.value.cost * 7
}))

const tallyYearly = computed(() => ({
  kwh: tallyDaily.value.kwh * 365,
  cost: tallyDaily.value.cost * 365
}))

const deviceCounts = computed(() => {
  const counts = { total: 0, high: 0, moderate: 0, low: 0 }
  for (const inst of state.housedDevices) {
    const device = lookupDevice(inst.deviceId)
    if (!device) continue
    counts.total += inst.quantity
    counts[device.tier] += inst.quantity
  }
  return counts
})

const devicesByRoom = computed(() => {
  const map = {}
  for (const inst of state.housedDevices) {
    if (!map[inst.room]) map[inst.room] = []
    map[inst.room].push(inst)
  }
  return map
})

const roomHighestTier = computed(() => {
  const order = { high: 3, moderate: 2, low: 1 }
  const map = {}
  for (const inst of state.housedDevices) {
    if (!inst.pluggedIn) continue
    const device = lookupDevice(inst.deviceId)
    if (!device) continue
    const current = map[inst.room]
    if (!current || order[device.tier] > order[current]) {
      map[inst.room] = device.tier
    }
  }
  return map
})

function addDevice(deviceId, room) {
  if (!lookupDevice(deviceId)) return null
  const instance = {
    instanceId: nextInstanceId(),
    deviceId,
    room,
    quantity: 1,
    pluggedIn: true
  }
  state.housedDevices.push(instance)
  return instance
}

function removeDevice(instanceId) {
  const idx = state.housedDevices.findIndex(i => i.instanceId === instanceId)
  if (idx !== -1) state.housedDevices.splice(idx, 1)
}

function updateQuantity(instanceId, quantity) {
  const inst = state.housedDevices.find(i => i.instanceId === instanceId)
  if (inst) inst.quantity = Math.max(1, Math.min(10, quantity))
}

function togglePlugStatus(instanceId) {
  const inst = state.housedDevices.find(i => i.instanceId === instanceId)
  if (!inst) return
  inst.pluggedIn = !inst.pluggedIn
  state.lastSaving = inst.pluggedIn ? 0 : annualCostFor(inst)
}

function clearSaving() {
  state.lastSaving = 0
}

function resetGame() {
  state.housedDevices.splice(0)
  state.lastSaving = 0
  if (typeof window !== 'undefined' && window.localStorage) {
    try { window.localStorage.removeItem(STORAGE_KEY) } catch { /* noop */ }
  }
}

export function useGameStore() {
  return {
    state,
    totalWatts,
    vampireState,
    tallyDaily,
    tallyWeekly,
    tallyYearly,
    deviceCounts,
    devicesByRoom,
    roomHighestTier,
    addDevice,
    removeDevice,
    updateQuantity,
    togglePlugStatus,
    clearSaving,
    resetGame,
    lookupDevice
  }
}
