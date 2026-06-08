<template>
  <div class="game-view">
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
      <div class="game-col game-col--right">
        <VampireDisplay />
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
.game-grid {
  display: grid;
  grid-template-columns: 25% 45% 30%;
  gap: 1rem;
  align-items: stretch;
  height: calc(100vh - 240px);
  min-height: 540px;
}
.game-col {
  min-width: 0;
  height: 100%;
}
.game-col--right {
  position: relative;
}
@media (max-width: 960px) {
  .game-grid {
    grid-template-columns: 1fr;
    height: auto;
  }
  .game-col {
    height: auto;
    min-height: 320px;
  }
}
.savings-toast :deep(.v-snackbar__wrapper) {
  margin-bottom: 100px;
}
</style>
