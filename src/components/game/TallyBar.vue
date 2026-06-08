<template>
  <v-footer
    :elevation="8"
    color="surface"
    class="tally-bar"
  >
    <div class="tally-row">
      <!-- Devices -->
      <div class="tally-zone tally-zone--counts">
        <div class="zone-label">Devices</div>
        <div class="counts">
          <span class="count-total">{{ deviceCounts.total }}</span>
          <div class="count-tiers">
            <v-chip size="x-small" color="error" variant="flat">🔴 {{ deviceCounts.high }}</v-chip>
            <v-chip size="x-small" color="warning" variant="flat">🟠 {{ deviceCounts.moderate }}</v-chip>
            <v-chip size="x-small" color="info" variant="flat">🟡 {{ deviceCounts.low }}</v-chip>
          </div>
        </div>
      </div>

      <!-- Energy Wasted -->
      <div class="tally-zone tally-zone--metric">
        <div class="zone-label">Energy Wasted</div>
        <div class="metric-figures">
          <span class="metric-figure"><span class="figure-sub">{{ animDailyKwh.toFixed(2) }}</span> daily</span>
          <span class="metric-figure"><span class="figure-sub">{{ animWeeklyKwh.toFixed(1) }}</span> weekly</span>
          <span class="metric-figure metric-figure--lead">
            <span class="figure-main">{{ Math.round(animYearlyKwh) }}</span> kWh/yr
          </span>
        </div>
      </div>

      <!-- Money Lost -->
      <div class="tally-zone tally-zone--metric">
        <div class="zone-label">Money Lost</div>
        <div class="metric-figures">
          <span class="metric-figure">${{ animDailyCost.toFixed(2) }} daily</span>
          <span class="metric-figure">${{ animWeeklyCost.toFixed(2) }} weekly</span>
          <span class="metric-figure metric-figure--lead">
            <span class="figure-main">${{ animYearlyCost.toFixed(0) }}</span>/yr
          </span>
        </div>
      </div>

      <!-- CTA -->
      <div class="tally-zone tally-zone--cta">
        <v-btn
          to="/tips"
          color="primary"
          size="large"
          :elevation="2"
        >
          Learn How to Save
          <v-icon icon="mdi-arrow-right" end />
        </v-btn>
      </div>
    </div>
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
  position: sticky;
  bottom: 0;
  z-index: 5;
  border-top: 2px solid rgba(231, 76, 60, 0.3);
  padding: 0.5rem 1rem !important;
  min-height: 0 !important;
  background: linear-gradient(180deg, #16213E 0%, #0F1828 100%) !important;
}
.tally-row {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.tally-zone {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.zone-label {
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #95A5A6;
  margin-bottom: 0.2rem;
}
.counts {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: nowrap;
}
.count-total {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #ECF0F1;
  line-height: 1;
}
.count-tiers {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.25rem;
}
.metric-figures {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: nowrap;
  color: #ECF0F1;
}
.metric-figure {
  font-variant-numeric: tabular-nums;
  font-size: 1.05rem;
  color: #ECF0F1;
  font-weight: 500;
  white-space: nowrap;
}
.metric-figure--lead {
  color: #E74C3C;
  font-weight: 700;
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
}
.figure-main {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-size: clamp(1.75rem, 2.6vw, 2.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.5px;
}
.figure-sub {
  color: #ECF0F1;
  font-weight: 600;
}
.tally-zone--cta {
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .tally-row {
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
