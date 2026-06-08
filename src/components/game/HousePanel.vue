<template>
  <v-card class="house-panel" color="surface" :elevation="2">
    <div class="house-title">
      <v-icon icon="mdi-home-outline" class="me-2" />
      Your House
    </div>

    <div class="house-grid">
      <!-- Upper floor -->
      <div class="floor floor--upper">
        <div class="floor-label">Upper Floor</div>
        <div class="floor-rooms">
          <RoomZone
            v-for="room in upperRooms"
            :key="room.id"
            :room="room"
            :instances="devicesByRoom[room.id] || []"
            :highest-tier="roomHighestTier[room.id]"
            @open="onOpen"
            @drop-device="onDrop"
          />
        </div>
      </div>

      <!-- Ground floor -->
      <div class="floor floor--ground">
        <div class="floor-label">Ground Floor</div>
        <div class="floor-rooms">
          <RoomZone
            v-for="room in groundRooms"
            :key="room.id"
            :room="room"
            :instances="devicesByRoom[room.id] || []"
            :highest-tier="roomHighestTier[room.id]"
            @open="onOpen"
            @drop-device="onDrop"
          />
        </div>
      </div>

      <!-- Whole home zone -->
      <div class="floor floor--base">
        <RoomZone
          :room="wholeHome"
          :instances="devicesByRoom[wholeHome.id] || []"
          :highest-tier="roomHighestTier[wholeHome.id]"
          @open="onOpen"
          @drop-device="onDrop"
        />
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore.js'
import RoomZone from './RoomZone.vue'

const { devicesByRoom, roomHighestTier, addDevice } = useGameStore()

const emit = defineEmits(['open-room'])

const upperRooms = [
  { id: 'bedroom',    label: 'Bedroom',     icon: '🛏️' },
  { id: 'bathroom',   label: 'Bathroom',    icon: '🚿' },
  { id: 'home-office', label: 'Home Office', icon: '🏠' }
]

const groundRooms = [
  { id: 'living-room',  label: 'Living Room',  icon: '🛋️' },
  { id: 'kitchen',      label: 'Kitchen',      icon: '🍳' },
  { id: 'laundry-room', label: 'Laundry Room', icon: '🧺' },
  { id: 'garage',       label: 'Garage & Outdoor', icon: '🏡' }
]

const wholeHome = { id: 'whole-home', label: 'Whole Home (always-on systems)', icon: '🌐' }

function onOpen(roomId) {
  emit('open-room', roomId)
}

function onDrop({ deviceId, roomId }) {
  addDevice(deviceId, roomId)
}
</script>

<style scoped>
.house-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
}
.house-title {
  display: flex;
  align-items: center;
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.house-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background:
    linear-gradient(180deg, rgba(15, 52, 96, 0.15) 0%, rgba(15, 52, 96, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1rem;
  /* Subtle roof feel */
  position: relative;
}
.house-grid::before {
  content: '';
  position: absolute;
  top: -16px;
  left: 10%;
  right: 10%;
  height: 16px;
  background: linear-gradient(180deg, transparent 0%, rgba(15, 52, 96, 0.4) 100%);
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}
.floor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.floor-label {
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #95A5A6;
  padding-left: 0.25rem;
}
.floor-rooms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.6rem;
}
.floor--base .floor-rooms,
.floor--base {
  margin-top: 0.25rem;
}
</style>
