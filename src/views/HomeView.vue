<template>
  <div class="home">
    <StatCarousel />
    <WorldImpactStats />

    <section class="cta-section">
      <v-container class="text-center">
        <div class="cta-primary">
          <h2 class="cta-headline">Is there an energy vampire in your house?</h2>
          <p class="cta-subline">It only takes 2 minutes. The results might surprise you.</p>
          <v-btn
            to="/game"
            color="primary"
            size="x-large"
            class="cta-button cta-button--pulse"
            :elevation="6"
          >
            Find Out Now
            <v-icon icon="mdi-arrow-right" end />
          </v-btn>
        </div>

        <div class="cta-secondary">
          <p class="cta-lead-in">Already know you have a problem?</p>
          <v-btn
            to="/tips"
            variant="outlined"
            color="on-background"
            size="large"
          >
            Learn How to Ward Off Your Energy Vampire
            <v-icon icon="mdi-arrow-right" end />
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import StatCarousel from '@/components/home/StatCarousel.vue'
import WorldImpactStats from '@/components/home/WorldImpactStats.vue'
</script>

<style scoped>
.home {
  background-color: #1A1A2E;
}
.cta-section {
  padding: 5rem 0;
  background: #1A1A2E;
}
.cta-primary {
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(15, 52, 96, 0.2) 100%);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 12px;
  margin-bottom: 3rem;
}
.cta-headline {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  color: #ECF0F1;
  margin-bottom: 1rem;
}
.cta-subline {
  color: #95A5A6;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.cta-button {
  font-size: 1.1rem;
  font-weight: 600;
  padding-inline: 2rem;
}
.cta-button--pulse {
  animation: pulse 2.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.6); }
  50%      { box-shadow: 0 0 0 16px rgba(231, 76, 60, 0); }
}
.cta-secondary {
  margin-top: 2rem;
}
.cta-lead-in {
  color: #95A5A6;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-style: italic;
}
</style>
