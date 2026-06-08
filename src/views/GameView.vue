<template>
  <div class="game-view">
    <VampireDisplay class="game-view__vampire" />

    <div class="game-content">
      <header class="game-header">
        <h1 class="game-title">Is There an Energy Vampire in Your House?</h1>
        <p class="game-instruction">
          Add devices to your house, then mark which ones stay plugged in when not in use. Watch what happens...
        </p>
      </header>

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
  position: relative;
  padding: 0;
  min-height: calc(100vh - 64px);
  background: #1A1A2E;
  isolation: isolate;
  display: flex;
  flex-direction: column;
}

/* Vampire is pinned to the visible space between the app bar and the
   bottom of the viewport. The opaque sticky tally bar covers its lower
   edge, so the image never bleeds past the tally. */
.game-view__vampire {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.game-content {
  position: relative;
  z-index: 1;
  padding: 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.game-header {
  text-align: center;
  padding: 0.5rem 1rem 1.25rem;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
}
.game-title {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  color: #ECF0F1;
  margin: 0 0 0.5rem;
}
.game-instruction {
  color: #ECF0F1;
  font-size: 0.95rem;
  margin: 0;
  font-style: italic;
  opacity: 0.9;
}

.game-grid {
  display: grid;
  grid-template-columns: 25% 45% 30%;
  gap: 1rem;
  align-items: stretch;
  flex: 1;
  min-height: 540px;
}
.game-col {
  min-width: 0;
}
.game-col--right {
  /* Empty so the vampire on the right side of the image stays visible. */
  pointer-events: none;
}

@media (max-width: 960px) {
  .game-view__vampire {
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    height: 280px;
  }
  .game-grid {
    grid-template-columns: 1fr;
    min-height: 0;
  }
  .game-col {
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
