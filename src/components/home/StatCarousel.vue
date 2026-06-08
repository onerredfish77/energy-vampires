<template>
  <section
    class="stat-carousel"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <div class="stat-bg" />

    <v-window
      v-model="active"
      :show-arrows="false"
      class="stat-window"
    >
      <v-window-item
        v-for="(stat, i) in stats"
        :key="i"
        :transition="'fade-transition'"
      >
        <div class="stat-card">
          <div class="stat-headline">{{ stat.headline }}</div>
          <div class="stat-descriptor">{{ stat.descriptor }}</div>
          <div class="stat-subtext">{{ stat.subtext }}</div>
        </div>
      </v-window-item>
    </v-window>

    <div class="stat-controls">
      <v-btn
        icon="mdi-chevron-left"
        variant="text"
        size="large"
        color="on-background"
        @click="prev"
        aria-label="Previous stat"
      />
      <div class="stat-dots">
        <button
          v-for="(stat, i) in stats"
          :key="i"
          class="stat-dot"
          :class="{ 'stat-dot--active': i === active }"
          @click="goTo(i)"
          :aria-label="`Go to stat ${i + 1}`"
        />
      </div>
      <v-btn
        icon="mdi-chevron-right"
        variant="text"
        size="large"
        color="on-background"
        @click="next"
        aria-label="Next stat"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const stats = [
  {
    headline: '$200',
    descriptor: 'The average American household wastes up to $200/year on energy they never use',
    subtext: 'Your devices are silently draining power while you sleep'
  },
  {
    headline: '40+',
    descriptor: 'The average home has over 40 devices drawing phantom power right now',
    subtext: 'Even when they\'re "off" — they\'re never truly off'
  },
  {
    headline: '10%',
    descriptor: 'Up to 10% of your electricity bill comes from devices doing absolutely nothing',
    subtext: 'You\'re paying for power you\'re not using — every single month'
  },
  {
    headline: '$19 Billion',
    descriptor: 'Vampire power costs consumers $19 billion globally every year',
    subtext: 'A problem hiding in plain sight — in every home, in every outlet'
  },
  {
    headline: '24/7',
    descriptor: 'Your cable box works as hard while you sleep as when you\'re watching',
    subtext: 'Some devices never rest — and your wallet feels every second of it'
  }
]

const active = ref(0)
const paused = ref(false)
let timer = null

const next = () => { active.value = (active.value + 1) % stats.length }
const prev = () => { active.value = (active.value - 1 + stats.length) % stats.length }
const goTo = (i) => { active.value = i }

onMounted(() => {
  timer = setInterval(() => {
    if (!paused.value) next()
  }, 6000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.stat-carousel {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  overflow: hidden;
}
.stat-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, rgba(231, 76, 60, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 20% 80%, rgba(42, 42, 42, 0.4) 0%, transparent 50%),
    #0D0D0D;
  z-index: 0;
}
.stat-window {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
}
.stat-card {
  text-align: center;
  padding: 2rem;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}
.stat-headline {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-weight: 900;
  font-size: clamp(4rem, 14vw, 11rem);
  line-height: 1;
  color: #E74C3C;
  text-shadow: 0 4px 40px rgba(231, 76, 60, 0.3);
}
.stat-descriptor {
  font-size: clamp(1.1rem, 2.5vw, 1.75rem);
  color: #ECF0F1;
  max-width: 800px;
  font-weight: 500;
  line-height: 1.4;
}
.stat-subtext {
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  color: #95A5A6;
  font-style: italic;
  max-width: 700px;
}
.stat-controls {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}
.stat-dots {
  display: flex;
  gap: 0.75rem;
}
.stat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.25s ease;
}
.stat-dot:hover {
  background: rgba(255, 255, 255, 0.5);
}
.stat-dot--active {
  background: #E74C3C;
  transform: scale(1.3);
}
</style>
