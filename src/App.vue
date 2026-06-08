<template>
  <v-app>
    <AppNav />
    <v-main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="route-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<style>
.app-main {
  background-color: #1A1A2E;
  min-height: 100vh;
}
.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.25s ease;
}
.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0;
}
</style>
