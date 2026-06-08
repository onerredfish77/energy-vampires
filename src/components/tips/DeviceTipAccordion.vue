<template>
  <v-expansion-panels variant="accordion" class="tip-accordions">
    <v-expansion-panel
      v-for="cat in categories"
      :key="cat.id"
      bg-color="surface"
    >
      <v-expansion-panel-title>
        <span class="acc-icon">{{ cat.icon }}</span>
        <span class="acc-name">{{ cat.name }}</span>
        <v-spacer />
        <v-chip
          :color="tierColor(cat.tier)"
          size="x-small"
          variant="flat"
          class="me-2"
        >
          {{ cat.tier }}
        </v-chip>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <p class="acc-meta">Average idle draw: <strong>{{ cat.wattsHint }}</strong></p>
        <v-list density="compact" bg-color="transparent">
          <v-list-item
            v-for="(tip, i) in cat.tips"
            :key="i"
            class="acc-tip"
          >
            <template #prepend>
              <v-icon icon="mdi-check-circle" color="success" size="small" />
            </template>
            {{ tip }}
          </v-list-item>
        </v-list>
        <router-link to="/game" class="acc-link">
          See how this device affects your house →
        </router-link>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true }
})

function tierColor(tier) {
  if (tier.toLowerCase().includes('high')) return 'error'
  if (tier.toLowerCase().includes('moderate')) return 'warning'
  return 'info'
}
</script>

<style scoped>
.tip-accordions {
  border-radius: 8px;
  overflow: hidden;
}
.acc-icon {
  font-size: 1.3rem;
  margin-right: 0.6rem;
}
.acc-name {
  font-weight: 500;
}
.acc-meta {
  color: #95A5A6;
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
  padding: 0 1rem;
}
.acc-tip {
  font-size: 0.9rem;
  color: #ECF0F1;
}
.acc-link {
  display: inline-block;
  margin: 0.75rem 0 0.5rem 1rem;
  color: #E74C3C;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
}
.acc-link:hover {
  text-decoration: underline;
}
</style>
