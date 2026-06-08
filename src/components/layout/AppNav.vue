<template>
  <v-app-bar
    :elevation="4"
    color="secondary"
    density="comfortable"
    class="app-nav"
  >
    <router-link to="/" class="brand-link">
      <v-toolbar-title class="brand-title">
        <v-icon icon="mdi-lightning-bolt" color="primary" class="me-2" />
        <span class="brand-name">Volt Watch</span>
      </v-toolbar-title>
    </router-link>

    <v-spacer />

    <div class="nav-links">
      <v-btn
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :variant="link.cta ? 'flat' : 'text'"
        :color="link.cta ? 'primary' : undefined"
        :class="['nav-link', { 'nav-link--cta': link.cta }]"
        :prepend-icon="link.icon"
        exact-active-class="nav-link--active"
      >
        {{ link.label }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
const links = [
  { to: '/', label: 'Home', icon: 'mdi-home-outline' },
  { to: '/tips', label: 'Ward Off Your Vampire', icon: 'mdi-shield-cross' },
  { to: '/game', label: 'Play the Game', icon: 'mdi-gamepad-variant', cta: true }
]
</script>

<style scoped>
.app-nav {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.brand-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}
.brand-title {
  display: flex;
  align-items: center;
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-weight: 700;
  font-size: 1.4rem;
}
.brand-name {
  letter-spacing: 0.5px;
}
.nav-links {
  display: flex;
  gap: 0.25rem;
  padding-right: 0.75rem;
}
.nav-link {
  font-weight: 500;
}
.nav-link--cta {
  font-weight: 600;
  margin-left: 0.5rem;
}
.nav-link--active {
  color: rgb(var(--v-theme-primary)) !important;
}
.nav-link--cta.nav-link--active {
  color: #ECF0F1 !important;
}
</style>
