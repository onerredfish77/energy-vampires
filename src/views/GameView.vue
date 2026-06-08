<template>
  <div class="game-view">
    <header class="game-header">
      <h1 class="game-title">Is There an Energy Vampire in Your House?</h1>
      <p class="game-instruction">
        Add devices to your house, then mark which ones stay plugged in when not in use. Watch what happens...
      </p>
    </header>

    <div class="game-stage">
      <VampireDisplay class="game-stage__vampire" />

      <div class="game-grid">
        <div class="game-col game-col--left">
          <DevicePanel />
        </div>
        <div class="game-col game-col--center">
          <HousePanel @open-room="openDrawer" />
        </div>
        <div class="game-col game-col--right" aria-hidden="true" />
      </div>
    </div>

    <RoomDrawer
      v-model="drawerOpen"
      :room-id="activeRoomId"
    />

    <v-snackbar
      v-model="toastOpen"
      color="success"
      timeout="3000"
      location="bottom"
      class="savings-toast"
    >
      <v-icon icon="mdi-check-circle" class="me-2" />
      You just saved ${{ savingsAmount.toFixed(2) }}/year!
    </v-snackbar>

    <TallyBar />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore.js'
import DevicePanel from '@/components/game/DevicePanel.vue'
import HousePanel from '@/components/game/HousePanel.vue'
import VampireDisplay from '@/components/game/VampireDisplay.vue'
import RoomDrawer from '@/components/game/RoomDrawer.vue'
import TallyBar from '@/components/game/TallyBar.vue'

const { state, clearSaving } = useGameStore()

const drawerOpen = ref(false)
const activeRoomId = ref(null)

const toastOpen = ref(false)
const savingsAmount = ref(0)

function openDrawer(roomId) {
  activeRoomId.value = roomId
  drawerOpen.value = true
}

watch(() => state.lastSaving, (v) => {
  if (v > 0) {
    savingsAmount.value = v
    toastOpen.value = true
  }
})

watch(toastOpen, (open) => {
  if (!open) clearSaving()
})
</script>

<style scoped>
.game-view {
  padding: 1rem 1rem 6rem;
  min-height: calc(100vh - 64px);
  background: #1A1A2E;
}
.game-header {
  text-align: center;
  padding: 0.5rem 1rem 1.25rem;
}
.game-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  color: #ECF0F1;
  margin: 0 0 0.5rem;
}
.game-instruction {
  color: #95A5A6;
  font-size: 0.95rem;
  margin: 0;
  font-style: italic;
}

/* Stage holds the vampire as a full-width background layer with the
   panel grid sitting on top. */
.game-stage {
  position: relative;
  height: calc(100vh - 240px);
  min-height: 540px;
  border-radius: 14px;
  overflow: hidden;
  isolation: isolate;
}
.game-stage__vampire {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.game-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 25% 45% 30%;
  gap: 1rem;
  align-items: stretch;
  height: 100%;
  padding: 1rem;
}
.game-col {
  min-width: 0;
  height: 100%;
}
.game-col--right {
  /* Intentionally empty so the vampire (positioned on the right side of
     each illustration) is always visible. */
  pointer-events: none;
}

@media (max-width: 960px) {
  .game-stage {
    height: auto;
    min-height: 0;
  }
  .game-stage__vampire {
    position: relative;
    height: 320px;
    inset: auto;
  }
  .game-grid {
    grid-template-columns: 1fr;
    height: auto;
    padding: 0.5rem;
  }
  .game-col {
    height: auto;
    min-height: 320px;
  }
  .game-col--right {
    display: none;
  }
}
.savings-toast :deep(.v-snackbar__wrapper) {
  margin-bottom: 100px;
}
</style>
