<template>
  <v-footer color="surface" class="app-footer">
    <v-container class="text-center">
      <div class="footer-brand">
        <v-icon icon="mdi-lightning-bolt" color="primary" class="me-1" size="small" />
        <span class="footer-name">Volt Watch</span>
        <span class="footer-tagline">— Know what's draining you.</span>
      </div>

      <div class="footer-links">
        <v-btn
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          variant="text"
          size="small"
          class="footer-link"
        >
          {{ link.label }}
        </v-btn>
      </div>

      <div class="footer-copy">
        &copy; 2025 Volt Watch Initiative. A nonprofit public awareness project.
        Not affiliated with any utility provider.
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
const links = [
  { to: '/', label: 'Home' },
  { to: '/game', label: 'Play the Game' },
  { to: '/tips', label: 'Ward Off Your Vampire' }
]
</script>

<style scoped>
.app-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
}
.footer-brand {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.footer-name {
  font-weight: 700;
}
.footer-tagline {
  color: #95A5A6;
  font-family: 'Inter', sans-serif;
  font-style: italic;
  margin-left: 0.25rem;
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin: 0.5rem 0;
  flex-wrap: wrap;
}
.footer-copy {
  color: #95A5A6;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
