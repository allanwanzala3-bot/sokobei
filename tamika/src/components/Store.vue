<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add'])
</script>

<template>
  <v-card rounded="lg" elevation="3" class="pa-4 h-100">
    <div class="text-subtitle-1 font-weight-bold">{{ item.name }}</div>
    <div class="text-caption text-medium-emphasis">{{ item.category }}</div>
    <div class="text-h6 mt-2">Ksh {{ item.price }}</div>
    <v-btn color="primary" class="mt-4" block @click="emit('add', item)">Add to cart</v-btn>
  </v-card>
</template>
