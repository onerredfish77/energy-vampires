<template>
  <v-tooltip location="top" open-delay="400">
    <template #activator="{ props }">
      <div
        v-bind="props"
        class="device-chip"
        :class="[`device-chip--${device?.tier || 'low'}`, { 'device-chip--off': !instance.pluggedIn }]"
      >
        <span class="chip-icon">{{ device?.icon }}</span>
        <span class="chip-name">{{ shortName }}</span>
        <span v-if="instance.quantity > 1" class="chip-qty">×{{ instance.quantity }}</span>
      </div>
    </template>
    <div class="tip-content">
      <strong>{{ device?.name }}</strong>
      <div>{{ device?.wattsDefault }}W idle</div>
    </div>
  </v-tooltip>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore.js'

const props = defineProps({
  instance: { type: Object, required: true }
})

const { lookupDevice } = useGameStore()
const device = computed(() => lookupDevice(props.instance.deviceId))

const shortName = computed(() => {
  const n = device.value?.name || ''
  return n.length > 22 ? n.slice(0, 20) + '…' : n
})
</script>

<style scoped>
.device-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.75rem;
  color: #ECF0F1;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.device-chip--high {
  background: rgba(231, 76, 60, 0.18);
  border-color: rgba(231, 76, 60, 0.5);
}
.device-chip--moderate {
  background: rgba(243, 156, 18, 0.18);
  border-color: rgba(243, 156, 18, 0.5);
}
.device-chip--low {
  background: rgba(241, 196, 15, 0.15);
  border-color: rgba(241, 196, 15, 0.4);
}
.device-chip--off {
  opacity: 0.4;
  background: rgba(39, 174, 96, 0.1);
  border-color: rgba(39, 174, 96, 0.4);
  text-decoration: line-through;
}
.chip-icon {
  font-size: 0.9rem;
}
.chip-qty {
  font-weight: 700;
  color: #ECF0F1;
}
.tip-content strong {
  display: block;
  margin-bottom: 2px;
}
</style>
