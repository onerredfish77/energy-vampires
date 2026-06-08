<template>
  <div class="home">
    <section class="hero">
      <div class="hero-split">
        <div class="hero-col hero-col--carousel">
          <StatCarousel />
        </div>

        <div class="hero-col hero-col--cta">
          <div
            class="hero-cta"
            :style="{ backgroundImage: `url(${vampireImg})` }"
          >
            <div class="hero-cta__scrim" />
            <div class="hero-cta__content">
              <p class="hero-cta__eyebrow">Is there an energy vampire in your house?</p>
              <h1 class="hero-cta__headline">Don't let it<br />drain you dry.</h1>
              <p class="hero-cta__lede">
                The average home has 20+ energy vampires quietly siphoning power.
                Build your house in 2 minutes and see what they're costing you.
              </p>
              <v-btn
                to="/game"
                color="primary"
                size="x-large"
                class="hero-cta__button"
                prepend-icon="mdi-gamepad-variant"
                :elevation="6"
              >
                Play the Game
                <v-icon icon="mdi-arrow-right" end />
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WorldImpactStats />

    <section class="secondary-cta">
      <v-container class="text-center">
        <p class="cta-lead-in">Already know you have a problem?</p>
        <v-btn
          to="/tips"
          variant="outlined"
          color="on-background"
          size="large"
          prepend-icon="mdi-shield-cross"
        >
          Learn How to Ward Off Your Energy Vampire
          <v-icon icon="mdi-arrow-right" end />
        </v-btn>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import StatCarousel from '@/components/home/StatCarousel.vue'
import WorldImpactStats from '@/components/home/WorldImpactStats.vue'
import vampireImg from '@/assets/images/vampire-4.jpg'
</script>

<style scoped>
.home {
  background-color: #0D0D0D;
}

.hero {
  padding: 2rem 1.5rem;
}
.hero-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: stretch;
}
.hero-col {
  display: flex;
  min-width: 0;
}
.hero-col > * {
  width: 100%;
}

.hero-cta {
  position: relative;
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center right;
  border: 1px solid rgba(231, 76, 60, 0.4);
  min-height: 420px;
  display: flex;
  align-items: stretch;
  isolation: isolate;
}
.hero-cta__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(8, 8, 8, 0.92) 0%, rgba(8, 8, 8, 0.7) 45%, rgba(8, 8, 8, 0.2) 100%);
  z-index: 1;
}
.hero-cta__content {
  position: relative;
  z-index: 2;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 60%;
}
.hero-cta__eyebrow {
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #E74C3C;
  margin: 0 0 0.75rem;
  font-weight: 600;
}
.hero-cta__headline {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-size: clamp(2rem, 4vw, 3.25rem);
  color: #ECF0F1;
  line-height: 1.05;
  margin: 0 0 1.25rem;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.8);
}
.hero-cta__lede {
  color: #ECF0F1;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 1.75rem;
  opacity: 0.9;
}
.hero-cta__button {
  align-self: flex-start;
  font-size: 1.05rem;
  font-weight: 600;
  padding-inline: 1.75rem;
  animation: cta-pulse 2.5s ease-in-out infinite;
}
@keyframes cta-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.6); }
  50%      { box-shadow: 0 0 0 16px rgba(231, 76, 60, 0); }
}

.secondary-cta {
  padding: 3rem 0 4rem;
  background: #0D0D0D;
}
.cta-lead-in {
  color: #95A5A6;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-style: italic;
}

@media (max-width: 960px) {
  .hero-split {
    grid-template-columns: 1fr;
  }
  .hero-cta {
    min-height: 360px;
  }
  .hero-cta__content {
    max-width: 100%;
  }
}
</style>
