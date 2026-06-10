<template>
  <v-card class="device-panel" color="surface" :elevation="2">
    <div class="panel-header">
      <v-icon icon="mdi-lightning-bolt" color="primary" />
      <span>Energy Vampires</span>
      <v-spacer />
      <span class="panel-sub">Add your devices</span>
    </div>

    <div class="panel-filter">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Filter devices"
        density="compact"
        variant="outlined"
        hide-details
        clearable
        single-line
      />
    </div>

    <v-fade-transition>
      <div
        v-if="checkedCount > 0"
        class="bulk-bar"
      >
        <span>{{ checkedCount }} selected</span>
        <v-spacer />
        <v-btn
          size="small"
          variant="text"
          @click="clearChecked"
        >
          Clear
        </v-btn>
        <v-btn
          color="primary"
          size="small"
          @click="dialogOpen = true"
        >
          Add Selected
          <v-icon icon="mdi-arrow-right" end />
        </v-btn>
      </div>
    </v-fade-transition>

    <div class="panel-scroll">
      <v-expansion-panels
        v-if="!isFiltering"
        v-model="openPanels"
        variant="accordion"
        multiple
      >
        <DeviceCategory
          v-for="cat in visibleCategories"
          :key="cat.id"
          :category="cat"
          :devices="devicesByCategory[cat.id] || []"
          :checked-map="checkedMap"
          @check="onCheck"
        />
      </v-expansion-panels>

      <div v-else-if="filteredDevices.length > 0" class="panel-flat-list">
        <DeviceRow
          v-for="device in filteredDevices"
          :key="device.id"
          :device="device"
          :checked="!!checkedMap[device.id]"
          @update:checked="onCheck({ deviceId: device.id, checked: $event })"
        />
      </div>

      <div v-else class="panel-empty">
        No devices match “{{ searchQuery }}”
      </div>
    </div>

    <div class="panel-actions">
      <v-btn
        size="large"
        :elevation="2"
        prepend-icon="mdi-home-lightning-bolt"
        class="panel-action-btn panel-action-btn--example"
        @click="populateExampleHouse"
      >
        Example house
      </v-btn>
      <v-btn
        size="large"
        variant="outlined"
        color="error"
        prepend-icon="mdi-restart"
        class="panel-action-btn panel-action-btn--reset"
        :disabled="state.housedDevices.length === 0"
        @click="resetDialogOpen = true"
      >
        Reset all
      </v-btn>
    </div>

    <v-dialog v-model="dialogOpen" max-width="420">
      <v-card color="surface">
        <v-card-title>Add to which room?</v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedRoom"
            :items="ROOM_OPTIONS"
            item-title="label"
            item-value="id"
            label="Destination room"
            density="comfortable"
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialogOpen = false">Cancel</v-btn>
          <v-btn
            color="primary"
            :disabled="!selectedRoom"
            @click="confirmBulkAdd"
          >
            Add {{ checkedCount }} device{{ checkedCount === 1 ? '' : 's' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="resetDialogOpen" max-width="420">
      <v-card color="surface">
        <v-card-title>Reset the house?</v-card-title>
        <v-card-text>
          This will remove all {{ state.housedDevices.length }} device{{ state.housedDevices.length === 1 ? '' : 's' }} from your house. This can’t be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="resetDialogOpen = false">Cancel</v-btn>
          <v-btn color="error" variant="flat" @click="confirmReset">
            Reset all
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { DEVICES, CATEGORIES } from '@/data/devices.js'
import { useGameStore } from '@/stores/gameStore.js'
import DeviceCategory from './DeviceCategory.vue'
import DeviceRow from './DeviceRow.vue'

const { addDevice, resetGame, populateExampleHouse, state } = useGameStore()

const checkedMap = reactive({})
const dialogOpen = ref(false)
const resetDialogOpen = ref(false)
const selectedRoom = ref(null)
const searchQuery = ref('')
const openPanels = ref([])

const ROOM_OPTIONS = CATEGORIES.map(c => ({ id: c.id, label: `${c.icon}  ${c.label}` }))

const isFiltering = computed(() => !!(searchQuery.value && searchQuery.value.trim()))

const filteredDevices = computed(() => {
  const q = (searchQuery.value || '').trim().toLowerCase()
  if (!q) return []
  return DEVICES.filter(d => d.name.toLowerCase().includes(q))
})

const devicesByCategory = computed(() => {
  const map = {}
  for (const d of DEVICES) {
    if (!map[d.category]) map[d.category] = []
    map[d.category].push(d)
  }
  return map
})

const visibleCategories = computed(() =>
  CATEGORIES.filter(c => (devicesByCategory.value[c.id] || []).length > 0)
)

const checkedCount = computed(
  () => Object.values(checkedMap).filter(Boolean).length
)

function onCheck({ deviceId, checked }) {
  if (checked) checkedMap[deviceId] = true
  else delete checkedMap[deviceId]
}

function clearChecked() {
  for (const k of Object.keys(checkedMap)) delete checkedMap[k]
}

function confirmBulkAdd() {
  const ids = Object.keys(checkedMap).filter(k => checkedMap[k])
  for (const id of ids) addDevice(id, selectedRoom.value)
  clearChecked()
  dialogOpen.value = false
  selectedRoom.value = null
}

function confirmReset() {
  resetGame()
  resetDialogOpen.value = false
}
</script>

<style scoped>
.device-panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: rgba(31, 31, 31, 0.90) !important;
  backdrop-filter: blur(4px);
}
.panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.panel-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #95A5A6;
}
.panel-filter {
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.panel-empty {
  padding: 1rem;
  font-size: 0.85rem;
  color: #95A5A6;
  text-align: center;
}
.panel-flat-list {
  padding: 0.25rem 0.5rem 0.75rem;
}
.panel-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.panel-action-btn {
  flex: 1 1 0;
  min-width: 0;
}
.panel-action-btn :deep(.v-btn__content) {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.panel-action-btn--example {
  background-color: #000 !important;
  color: rgb(var(--v-theme-primary)) !important;
}
.panel-action-btn--example :deep(.v-icon) {
  color: rgb(var(--v-theme-primary)) !important;
}
.panel-scroll {
  padding: 0.5rem;
}
.bulk-bar {
  position: sticky;
  top: 57px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #2a1418;
  border-top: 1px solid rgba(231, 76, 60, 0.6);
  border-bottom: 1px solid rgba(231, 76, 60, 0.6);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}
</style>
