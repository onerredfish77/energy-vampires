<template>
  <div class="vampire-display">
    <div
      v-for="s in states"
      :key="s.state"
      class="vampire-stage"
      :class="{ 'vampire-stage--active': s.state === currentState }"
    >
      <img
        :src="s.src"
        :alt="s.alt"
        class="vampire-image"
        loading="eager"
        decoding="async"
      />
    </div>

    <div class="vampire-caption">
      <transition name="caption-fade" mode="out-in">
        <p :key="currentState">{{ currentCaption }}</p>
      </transition>
      <div class="vampire-watts">{{ Math.round(totalWatts) }}W standby</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore.js'
import vampire1 from '@/assets/images/vampire-1.jpg'
import vampire2 from '@/assets/images/vampire-2.jpg'
import vampire3 from '@/assets/images/vampire-3.jpg'
import vampire4 from '@/assets/images/vampire-4.jpg'

const { vampireState, totalWatts } = useGameStore()

const states = [
  { state: 1, src: vampire1, alt: 'A normal-looking person',          caption: 'Looks harmless enough...' },
  { state: 2, src: vampire2, alt: 'Pale, slightly off-looking person', caption: 'Something seems... off.' },
  { state: 3, src: vampire3, alt: 'Person turning into a vampire',     caption: 'Your house is feeding the vampire.' },
  { state: 4, src: vampire4, alt: 'Full vampire',                      caption: 'YOUR HOUSE IS FULLY HAUNTED. 🧛' }
]

const currentState = computed(() => vampireState.value)
const currentCaption = computed(
  () => states.find(s => s.state === currentState.value)?.caption ?? ''
)
</script>

<style scoped>
.vampire-display {
  position: relative;
  height: 100%;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem 5rem;
  border-radius: 12px;
  overflow: hidden;
  background: #0F1828;
}
.vampire-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 800ms ease-in-out;
  pointer-events: none;
}
.vampire-stage--active {
  opacity: 1;
}
.vampire-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  user-select: none;
  -webkit-user-drag: none;
}
.vampire-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 1rem 1rem;
  text-align: center;
  font-family: 'Playfair Display', Georgia, serif;
  background: linear-gradient(180deg, transparent 0%, rgba(15, 24, 40, 0.85) 60%, rgba(15, 24, 40, 0.95) 100%);
  z-index: 2;
}
.vampire-caption p {
  font-size: clamp(1rem, 1.6vw, 1.35rem);
  color: #ECF0F1;
  margin: 0 0 0.5rem;
  font-style: italic;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}
.vampire-watts {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #95A5A6;
  letter-spacing: 1px;
}
.caption-fade-enter-active,
.caption-fade-leave-active {
  transition: opacity 0.4s ease;
}
.caption-fade-enter-from,
.caption-fade-leave-to {
  opacity: 0;
}
</style>
