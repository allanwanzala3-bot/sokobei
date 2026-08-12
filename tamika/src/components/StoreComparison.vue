<script setup>
const props = defineProps({
  stores: {
    type: Array,
    required: true,
  },
  bestStore: {
    type: Object,
    required: false,
  },
})
</script>

<template>
  <v-card rounded="lg" elevation="4" class="pa-2">
    <v-card-title class="text-h6">Store comparison</v-card-title>

    <v-list lines="two">
      <v-list-item v-for="store in stores" :key="store.name">
        <v-list-item-title>
          {{ store.name }}
          <v-chip
            v-if="bestStore && store.name === bestStore.name"
            color="green"
            size="small"
            class="ml-2"
          >
            Best Value
          </v-chip>
        </v-list-item-title>

        <v-list-item-subtitle>
          Total: Ksh {{ Number(store.total).toLocaleString() }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
