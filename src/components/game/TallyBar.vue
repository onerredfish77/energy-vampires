<template>
  <v-footer
    app
    :elevation="8"
    color="surface"
    class="tally-bar"
  >
    <v-row no-gutters align="center" class="tally-row">
      <!-- Zone 1: Device counts -->
      <v-col cols="12" sm="3" class="tally-zone tally-zone--counts">
        <div class="zone-label">Devices</div>
        <div class="counts">
          <span class="count-total">{{ deviceCounts.total }}</span>
          <div class="count-tiers">
            <v-chip size="x-small" color="error" variant="flat">🔴 {{ deviceCounts.high }}</v-chip>
            <v-chip size="x-small" color="warning" variant="flat">🟠 {{ deviceCounts.moderate }}</v-chip>
            <v-chip size="x-small" color="info" variant="flat">🟡 {{ deviceCounts.low }}</v-chip>
          </div>
        </div>
      </v-col>

      <!-- Zone 2: Energy + Money -->
      <v-col cols="12" sm="6" class="tally-zone tally-zone--metrics">
        <div class="metric-row">
          <span class="metric-icon">⚡</span>
          <span class="metric-label">Energy Wasted:</span>
          <span class="metric-figure"><span class="figure-sub">{{ animDailyKwh.toFixed(2) }}</span> daily</span>
          <span class="metric-figure"><span class="figure-sub">{{ animWeeklyKwh.toFixed(1) }}</span> weekly</span>
          <span class="metric-figure metric-figure--lead">
            <span class="figure-main">{{ Math.round(animYearlyKwh) }}</span> kWh/yr
          </span>
        </div>
        <div class="metric-row">
          <span class="metric-icon">💸</span>
          <span class="metric-label">Money Lost:</span>
          <span class="metric-figure">${{ animDailyCost.toFixed(2) }} daily</span>
          <span class="metric-figure">${{ animWeeklyCost.toFixed(2) }} weekly</span>
          <span class="metric-figure metric-figure--lead">
            <span class="figure-main">${{ animYearlyCost.toFixed(0) }}</span>/yr
          </span>
        </div>
      </v-col>

      <!-- Zone 3: CTA -->
      <v-col cols="12" sm="3" class="tally-zone tally-zone--cta">
        <v-btn
          to="/tips"
          color="primary"
          size="large"
          :elevation="2"
        >
          Learn How to Save
          <v-icon icon="mdi-arrow-right" end />
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore.js'

const { deviceCounts, tallyDaily, tallyWeekly, tallyYearly } = useGameStore()

const animDailyKwh   = ref(0)
const animWeeklyKwh  = ref(0)
const animYearlyKwh  = ref(0)
const animDailyCost  = ref(0)
const animWeeklyCost = ref(0)
const animYearlyCost = ref(0)

function animate(refObj, target, duration = 500) {
  const start = refObj.value
  const delta = target - start
  if (Math.abs(delta) < 0.001) {
    refObj.value = target
    return
  }
  const t0 = performance.now()
  function step(now) {
    const p = Math.min(1, (now - t0) / duration)
    const eased = 1 - Math.pow(1 - p, 3)
    refObj.value = start + delta * eased
    if (p < 1) requestAnimationFrame(step)
    else refObj.value = target
  }
  requestAnimationFrame(step)
}

watch(() => tallyDaily.value.kwh,   v => animate(animDailyKwh,   v))
watch(() => tallyWeekly.value.kwh,  v => animate(animWeeklyKwh,  v))
watch(() => tallyYearly.value.kwh,  v => animate(animYearlyKwh,  v))
watch(() => tallyDaily.value.cost,  v => animate(animDailyCost,  v))
watch(() => tallyWeekly.value.cost, v => animate(animWeeklyCost, v))
watch(() => tallyYearly.value.cost, v => animate(animYearlyCost, v))
</script>

<style scoped>
.tally-bar {
  border-top: 2px solid rgba(231, 76, 60, 0.3);
  padding: 0.75rem 1rem;
  background: linear-gradient(180deg, #16213E 0%, #0F1828 100%) !important;
}
.tally-row {
  width: 100%;
  gap: 0.75rem;
}
.tally-zone {
  padding: 0.25rem 0.75rem;
}
.zone-label {
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #95A5A6;
  margin-bottom: 0.25rem;
}
.counts {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.count-total {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ECF0F1;
  line-height: 1;
}
.count-tiers {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tally-zone--metrics {
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}
.metric-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: #95A5A6;
  flex-wrap: wrap;
  margin: 0.15rem 0;
}
.metric-icon {
  font-size: 1.1rem;
}
.metric-label {
  font-weight: 600;
  color: #ECF0F1;
}
.metric-figure {
  font-variant-numeric: tabular-nums;
}
.metric-figure--lead {
  color: #E74C3C;
  font-weight: 600;
}
.figure-main {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
}
.figure-sub {
  color: #ECF0F1;
}
.tally-zone--cta {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media (max-width: 600px) {
  .tally-zone--cta {
    justify-content: center;
    margin-top: 0.5rem;
  }
}
</style>
