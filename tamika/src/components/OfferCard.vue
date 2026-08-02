<script setup>
const props = defineProps({
  offer: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-card rounded="lg" elevation="2" class="h-100">
    <v-card-title class="d-flex align-center justify-space-between">
      <span>{{ offer.title }}</span>
      <v-chip color="amber" size="small">{{ offer.badge }}</v-chip>
    </v-card-title>
    <v-card-text>{{ offer.description }}</v-card-text>
  </v-card>
</template>
