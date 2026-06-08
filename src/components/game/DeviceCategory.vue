<template>
  <v-expansion-panel
    :value="category.id"
    bg-color="surface"
    class="device-category"
  >
    <v-expansion-panel-title>
      <span class="cat-icon">{{ category.icon }}</span>
      <span class="cat-label">{{ category.label }}</span>
      <v-spacer />
      <v-badge
        :content="devices.length"
        color="primary"
        inline
      />
    </v-expansion-panel-title>

    <v-expansion-panel-text class="cat-body">
      <DeviceRow
        v-for="device in devices"
        :key="device.id"
        :device="device"
        :checked="!!checkedMap[device.id]"
        @update:checked="onCheck(device.id, $event)"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup>
import DeviceRow from './DeviceRow.vue'

defineProps({
  category: { type: Object, required: true },
  devices:  { type: Array,  required: true },
  checkedMap: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['check'])

function onCheck(deviceId, isChecked) {
  emit('check', { deviceId, checked: isChecked })
}
</script>

<style scoped>
.device-category :deep(.v-expansion-panel-title) {
  padding: 0.75rem 1rem;
  font-weight: 500;
}
.cat-icon {
  font-size: 1.25rem;
  margin-right: 0.6rem;
}
.cat-label {
  color: #ECF0F1;
}
.cat-body :deep(.v-expansion-panel-text__wrapper) {
  padding: 0.25rem 0.5rem 0.75rem;
}
</style>
