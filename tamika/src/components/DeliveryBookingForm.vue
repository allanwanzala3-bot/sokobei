<script setup>
import { reactive } from 'vue'
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
const form = reactive({
  address: '',
  slot: 'Morning',
  notes: '',
})

function submit() {
  store.submitDelivery(form)
}
</script>

<template>
  <v-card rounded="lg" elevation="4" class="pa-4">
    <v-card-title class="text-h6">Book delivery</v-card-title>
    <v-card-subtitle>Reserve a slot and we’ll bring your groceries home</v-card-subtitle>
    <v-card-text>
      <v-text-field v-model="form.address" label="Delivery address" prepend-icon="mdi-home" />
      <v-select v-model="form.slot" :items="['Morning', 'Afternoon', 'Evening']" label="Preferred slot" prepend-icon="mdi-clock-outline" />
      <v-textarea v-model="form.notes" label="Delivery notes" prepend-icon="mdi-note-text" />
      <v-btn color="success" block @click="submit">Confirm booking</v-btn>
      <div v-if="store.deliveryRequest.address" class="mt-3 text-caption text-medium-emphasis">
        Booking for {{ store.deliveryRequest.address }} in the {{ store.deliveryRequest.slot }} slot.
      </div>
    </v-card-text>
  </v-card>
</template>
