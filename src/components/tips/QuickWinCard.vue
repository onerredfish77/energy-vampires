<template>
  <v-card
    class="quick-win"
    color="surface"
    :elevation="2"
    height="100%"
  >
    <div class="qw-icon">{{ icon }}</div>
    <v-card-title class="qw-title">{{ title }}</v-card-title>
    <v-card-text class="qw-body">{{ body }}</v-card-text>
    <v-card-actions class="qw-actions">
      <v-chip color="success" variant="flat" size="small">
        Saves up to {{ savings }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  savings: { type: String, required: true }
})
</script>

<style scoped>
.quick-win {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1.5rem 1rem 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.quick-win:hover {
  transform: translateY(-4px);
}
.qw-icon {
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.qw-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: 1.15rem;
  white-space: normal;
  line-height: 1.3;
  padding-block: 0.5rem;
}
.qw-body {
  flex: 1;
  font-size: 0.9rem;
  color: #95A5A6;
  line-height: 1.5;
}
.qw-actions {
  justify-content: center;
  padding-bottom: 1rem;
}
</style>
