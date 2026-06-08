<template>
  <div
    class="device-row"
    draggable="true"
    @dragstart="onDragStart"
  >
    <v-checkbox
      :model-value="checked"
      hide-details
      density="compact"
      color="primary"
      class="device-check"
      @update:model-value="$emit('update:checked', $event)"
    />

    <span class="device-icon">{{ device.icon }}</span>

    <div class="device-meta">
      <div class="device-name">{{ device.name }}</div>
      <div class="device-watts">~{{ device.wattsDefault }}W idle</div>
    </div>

    <v-chip
      size="x-small"
      :color="tierColor"
      variant="flat"
      class="device-tier"
    >
      {{ tierLabel }}
    </v-chip>

    <v-icon icon="mdi-drag-vertical" size="small" class="device-drag" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  device: { type: Object, required: true },
  checked: { type: Boolean, default: false }
})

defineEmits(['update:checked'])

const tierMap = {
  high:     { color: 'error',   label: 'High' },
  moderate: { color: 'warning', label: 'Moderate' },
  low:      { color: 'info',    label: 'Low' }
}

const tierColor = computed(() => tierMap[props.device.tier].color)
const tierLabel = computed(() => tierMap[props.device.tier].label)

function onDragStart(e) {
  e.dataTransfer.effectAllowed = 'copy'
  e.dataTransfer.setData('text/x-device-id', props.device.id)
  e.dataTransfer.setData('text/plain', props.device.id)
}
</script>

<style scoped>
.device-row {
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  border-radius: 6px;
  cursor: grab;
  transition: background-color 0.15s ease;
}
.device-row:hover {
  background-color: rgba(255, 255, 255, 0.04);
}
.device-row:active {
  cursor: grabbing;
}
.device-check {
  flex: 0 0 auto;
}
.device-icon {
  font-size: 1.4rem;
  width: 1.8rem;
  text-align: center;
}
.device-meta {
  min-width: 0;
}
.device-name {
  font-size: 0.9rem;
  color: #ECF0F1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.device-watts {
  font-size: 0.75rem;
  color: #95A5A6;
}
.device-tier {
  flex: 0 0 auto;
  font-size: 0.65rem;
  font-weight: 600;
}
.device-drag {
  color: #95A5A6;
  cursor: grab;
}
</style>
