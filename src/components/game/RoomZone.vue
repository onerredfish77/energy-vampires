<template>
  <div
    class="room-zone"
    :class="[
      `room-zone--${highestTier || 'empty'}`,
      {
        'room-zone--populated': instances.length > 0,
        'room-zone--drag-over': isDragOver
      }
    ]"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
    @click="$emit('open', room.id)"
  >
    <div class="room-header">
      <span class="room-icon">{{ room.icon }}</span>
      <span class="room-label">{{ room.label }}</span>
    </div>

    <div class="room-body">
      <div v-if="instances.length === 0" class="room-empty">
        + Add devices
      </div>

      <div v-else class="room-chips">
        <DeviceChip
          v-for="(inst, i) in visibleInstances"
          :key="inst.instanceId"
          :instance="inst"
        />
        <span v-if="overflow > 0" class="overflow-pill">+{{ overflow }} more</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DeviceChip from './DeviceChip.vue'

const props = defineProps({
  room: { type: Object, required: true },
  instances: { type: Array, default: () => [] },
  highestTier: { type: String, default: null }
})

const emit = defineEmits(['open', 'drop-device'])

const isDragOver = ref(false)
const MAX_VISIBLE = 5

const visibleInstances = computed(() => props.instances.slice(0, MAX_VISIBLE))
const overflow = computed(() => Math.max(0, props.instances.length - MAX_VISIBLE))

function onDragOver(e) {
  e.dataTransfer.dropEffect = 'copy'
  isDragOver.value = true
}
function onDragLeave() {
  isDragOver.value = false
}
function onDrop(e) {
  isDragOver.value = false
  const deviceId = e.dataTransfer.getData('text/x-device-id')
    || e.dataTransfer.getData('text/plain')
  if (deviceId) emit('drop-device', { deviceId, roomId: props.room.id })
}
</script>

<style scoped>
.room-zone {
  position: relative;
  min-height: 110px;
  padding: 0.75rem;
  border: 2px dashed rgba(255, 255, 255, 0.72);
  border-radius: 10px;
  background: rgba(42, 42, 42, 0.25);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: room-zone-pulse 2.6s ease-in-out infinite;
}
@keyframes room-zone-pulse {
  0%, 100% {
    border-color: rgba(255, 255, 255, 0.72);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
  50% {
    border-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
  }
}
.room-zone:hover {
  background: rgba(42, 42, 42, 0.45);
  border-color: rgba(255, 255, 255, 0.95);
  animation-play-state: paused;
}
.room-zone--drag-over {
  border-style: solid;
  border-color: #E74C3C;
  background: rgba(231, 76, 60, 0.12);
  transform: scale(1.02);
  animation: none;
}
.room-zone--high {
  border-color: rgba(231, 76, 60, 0.72);
  box-shadow: inset 0 0 30px rgba(231, 76, 60, 0.15);
  animation: room-zone-pulse-high 2.6s ease-in-out infinite;
}
@keyframes room-zone-pulse-high {
  0%, 100% {
    border-color: rgba(231, 76, 60, 0.72);
    box-shadow: inset 0 0 30px rgba(231, 76, 60, 0.15), 0 0 0 0 rgba(231, 76, 60, 0);
  }
  50% {
    border-color: rgba(231, 76, 60, 1);
    box-shadow: inset 0 0 30px rgba(231, 76, 60, 0.22), 0 0 0 3px rgba(231, 76, 60, 0.18);
  }
}
.room-zone--moderate {
  border-color: rgba(243, 156, 18, 0.72);
  box-shadow: inset 0 0 30px rgba(243, 156, 18, 0.12);
  animation: room-zone-pulse-moderate 2.6s ease-in-out infinite;
}
@keyframes room-zone-pulse-moderate {
  0%, 100% {
    border-color: rgba(243, 156, 18, 0.72);
    box-shadow: inset 0 0 30px rgba(243, 156, 18, 0.12), 0 0 0 0 rgba(243, 156, 18, 0);
  }
  50% {
    border-color: rgba(243, 156, 18, 1);
    box-shadow: inset 0 0 30px rgba(243, 156, 18, 0.18), 0 0 0 3px rgba(243, 156, 18, 0.18);
  }
}
.room-zone--low {
  border-color: rgba(241, 196, 15, 0.72);
  box-shadow: inset 0 0 20px rgba(241, 196, 15, 0.08);
  animation: room-zone-pulse-low 2.6s ease-in-out infinite;
}
@keyframes room-zone-pulse-low {
  0%, 100% {
    border-color: rgba(241, 196, 15, 0.72);
    box-shadow: inset 0 0 20px rgba(241, 196, 15, 0.08), 0 0 0 0 rgba(241, 196, 15, 0);
  }
  50% {
    border-color: rgba(241, 196, 15, 1);
    box-shadow: inset 0 0 20px rgba(241, 196, 15, 0.14), 0 0 0 3px rgba(241, 196, 15, 0.16);
  }
}

/* Populated rooms always show green dashed border, regardless of tier.
   Placed after tier rules so it wins on border-color + animation.
   Tier classes still provide the inset glow for severity signal. */
.room-zone--populated {
  border-color: rgba(39, 174, 96, 0.72);
  animation: room-zone-pulse-populated 2.6s ease-in-out infinite;
}
@keyframes room-zone-pulse-populated {
  0%, 100% {
    border-color: rgba(39, 174, 96, 0.72);
    box-shadow: 0 0 0 0 rgba(39, 174, 96, 0);
  }
  50% {
    border-color: rgba(39, 174, 96, 1);
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.18);
  }
}
.room-zone--populated.room-zone--high {
  box-shadow: inset 0 0 30px rgba(231, 76, 60, 0.15);
}
.room-zone--populated.room-zone--moderate {
  box-shadow: inset 0 0 30px rgba(243, 156, 18, 0.12);
}
.room-zone--populated.room-zone--low {
  box-shadow: inset 0 0 20px rgba(241, 196, 15, 0.08);
}
.room-zone--populated:hover {
  border-color: rgba(39, 174, 96, 1);
}

@media (prefers-reduced-motion: reduce) {
  .room-zone,
  .room-zone--high,
  .room-zone--moderate,
  .room-zone--low,
  .room-zone--populated {
    animation: none;
  }
}
.room-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #ECF0F1;
}
.room-icon {
  font-size: 1.1rem;
}
.room-body {
  flex: 1;
  min-width: 0;
}
.room-empty {
  font-size: 0.75rem;
  color: #95A5A6;
  font-style: italic;
  padding: 0.5rem 0;
}
.room-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  min-width: 0;
}
.overflow-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  color: #95A5A6;
  background: rgba(255, 255, 255, 0.05);
}
</style>
