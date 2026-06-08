<template>
  <section class="world-stats">
    <v-container>
      <h2 class="section-header">This Isn't Just Your Problem</h2>

      <v-row>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            class="impact-card"
            color="surface"
            :elevation="2"
            height="100%"
          >
            <div class="impact-icon">{{ item.icon }}</div>
            <div class="impact-stat">{{ item.stat }}</div>
            <div class="impact-body">{{ item.body }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
const items = [
  {
    icon: '🌍',
    stat: '1% of global CO₂',
    body: 'Standby power accounts for roughly 1% of worldwide carbon dioxide emissions — equivalent to the domestic flight emissions of an entire country.'
  },
  {
    icon: '⚡',
    stat: '400 TWh wasted/year',
    body: 'The world wastes over 400 terawatt-hours annually to standby power alone — enough electricity to power the entire state of California for a year.'
  },
  {
    icon: '🏭',
    stat: '50 power plants',
    body: 'The US Department of Energy estimates that standby power in America requires the equivalent output of 50 large power plants running around the clock — just to power things that are "off."'
  },
  {
    icon: '🌡️',
    stat: '44 million tons of CO₂',
    body: 'Phantom loads in the US generate over 44 million tons of CO₂ every year — the same as adding 9 million cars to the road.'
  }
]
</script>

<style scoped>
.world-stats {
  padding: 5rem 0;
  background: linear-gradient(180deg, #0D0D0D 0%, #1F1F1F 100%);
}
.section-header {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  color: #ECF0F1;
  margin-bottom: 3rem;
}
.impact-card {
  padding: 2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.impact-card:hover {
  transform: translateY(-4px);
}
.impact-icon {
  font-size: 3.5rem;
  line-height: 1;
}
.impact-stat {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #E74C3C;
  line-height: 1.2;
}
.impact-body {
  color: #ECF0F1;
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>
