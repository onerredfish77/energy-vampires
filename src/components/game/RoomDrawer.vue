<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    location="right"
    temporary
    width="420"
    color="surface"
  >
    <template v-if="room">
      <div class="drawer-header">
        <span class="drawer-icon">{{ room.icon }}</span>
        <span class="drawer-title">{{ room.label }}</span>
        <v-spacer />
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="$emit('update:modelValue', false)"
          aria-label="Close drawer"
        />
      </div>

      <div class="drawer-body">
        <div v-if="instances.length === 0" class="drawer-empty">
          <p>No devices here yet.</p>
          <p class="drawer-empty-sub">Drag devices from the left, or use bulk add.</p>
        </div>

        <div
          v-for="inst in instances"
          :key="inst.instanceId"
          class="drawer-item"
        >
          <div class="item-header">
            <span class="item-icon">{{ deviceFor(inst).icon }}</span>
            <div class="item-name-wrap">
              <div class="item-name">{{ deviceFor(inst).name }}</div>
              <div class="item-watts">{{ deviceFor(inst).wattsDefault }}W idle</div>
            </div>
            <v-btn
              icon="mdi-close"
              variant="text"
              size="x-small"
              @click="removeDevice(inst.instanceId)"
              aria-label="Remove device"
            />
          </div>

          <div class="item-controls">
            <v-select
              :model-value="inst.quantity"
              :items="QTY_OPTIONS"
              label="Qty"
              density="compact"
              variant="outlined"
              hide-details
              class="qty-select"
              @update:model-value="updateQuantity(inst.instanceId, $event)"
            />

            <v-switch
              :model-value="inst.pluggedIn"
              :label="inst.pluggedIn ? '🔌 Always Plugged In' : '✅ Unplugged When Idle'"
              :color="inst.pluggedIn ? 'error' : 'success'"
              hide-details
              density="compact"
              class="plug-switch"
              @update:model-value="togglePlugStatus(inst.instanceId)"
            />
          </div>

          <div class="item-cost">
            <span>
              <strong>${{ annualCost(inst).toFixed(2) }}/yr</strong>
              <span class="cost-sub">if plugged in</span>
            </span>
          </div>

          <div class="item-fact">💡 {{ deviceFor(inst).funFact }}</div>
          <div class="item-tip">✨ <em>{{ deviceFor(inst).tip }}</em></div>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore, ELECTRICITY_RATE } from '@/stores/gameStore.js'
import { CATEGORIES } from '@/data/devices.js'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  roomId: { type: String, default: null }
})

defineEmits(['update:modelValue'])

const { state, lookupDevice, removeDevice, updateQuantity, togglePlugStatus } = useGameStore()

const QTY_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1)

const ALL_ROOMS = [
  ...CATEGORIES,
  { id: 'whole-home', label: 'Whole Home', icon: '🌐' }
]

const room = computed(() =>
  props.roomId ? ALL_ROOMS.find(r => r.id === props.roomId) : null
)

const instances = computed(() =>
  state.housedDevices.filter(i => i.room === props.roomId)
)

function deviceFor(inst) {
  return lookupDevice(inst.deviceId) || {}
}

function annualCost(inst) {
  const d = deviceFor(inst)
  if (!d) return 0
  const dailyKwh = (d.wattsDefault * 24 * inst.quantity) / 1000
  return dailyKwh * 365 * ELECTRICITY_RATE
}
</script>

<style scoped>
.drawer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'Protest Riot', Impact, Georgia, serif;
}
.drawer-icon {
  font-size: 1.4rem;
}
.drawer-title {
  font-size: 1.2rem;
  font-weight: 700;
}
.drawer-body {
  padding: 1rem;
  overflow-y: auto;
  height: calc(100% - 60px);
}
.drawer-empty {
  text-align: center;
  color: #95A5A6;
  padding: 2rem 1rem;
}
.drawer-empty-sub {
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 0.5rem;
}
.drawer-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}
.item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.item-icon {
  font-size: 1.4rem;
}
.item-name-wrap {
  flex: 1;
  min-width: 0;
}
.item-name {
  font-size: 0.9rem;
  color: #ECF0F1;
  font-weight: 500;
}
.item-watts {
  font-size: 0.75rem;
  color: #95A5A6;
}
.item-controls {
  display: flex;
  gap: 0.75rem;
  margin: 0.5rem 0;
  align-items: center;
}
.qty-select {
  max-width: 90px;
  flex: 0 0 auto;
}
.plug-switch {
  flex: 1;
}
.item-cost {
  font-size: 0.85rem;
  color: #E74C3C;
  margin: 0.25rem 0 0.5rem;
}
.cost-sub {
  color: #95A5A6;
  font-weight: 400;
  margin-left: 0.4rem;
}
.item-fact {
  font-size: 0.8rem;
  color: #ECF0F1;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}
.item-tip {
  font-size: 0.8rem;
  color: #95A5A6;
  line-height: 1.4;
}
</style>
