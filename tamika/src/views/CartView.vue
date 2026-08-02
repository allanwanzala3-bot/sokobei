<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTamikaStore } from '@/stores/tamikaStore'
import StoreComparisonCard from '@/components/StoreComparisonCard.vue'

const store = useTamikaStore()
const router = useRouter()
const selectedStore = computed({
  get: () => store.selectedStore,
  set: (value) => {
    store.selectedStore = value
  },
})

function goToDelivery() {
  if (!store.isAuthenticated) {
    router.push('/auth')
    return
  }
  router.push('/delivery')
}
</script>

<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-h5 font-weight-bold mb-4">Your cart</div>
          <v-alert v-if="!store.isAuthenticated" type="info" variant="tonal" class="mb-4">
            Please sign in before continuing to delivery.
          </v-alert>
          <v-list>
            <v-list-item v-for="item in store.cart" :key="item.id">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.category }}</v-list-item-subtitle>
              <template #append>
                <div class="d-flex align-center ga-2">
                  <span>Ksh {{ item.price }}</span>
                  <v-btn icon="mdi-delete" variant="text" @click="store.removeFromCart(item.id)" />
                </div>
              </template>
            </v-list-item>
          </v-list>
          <div class="text-right text-h6 mt-4">Subtotal: Ksh {{ store.subtotal }}</div>
          <div class="text-right text-body-2 mt-1">Delivery fee: Ksh {{ store.stores.find((s) => s.name === store.selectedStore)?.deliveryFee || 0 }}</div>
          <div class="text-right text-body-2">Tamika service fee: Ksh {{ store.serviceFee }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-h6 font-weight-bold mb-3">Choose store</div>
          <v-select v-model="selectedStore" :items="store.stores.map((s) => s.name)" label="Store" prepend-icon="mdi-store" />
          <v-btn color="primary" block class="mt-4" @click="goToDelivery">Continue to delivery</v-btn>
        </v-card>

        <div class="mt-4">
          <StoreComparisonCard :stores="store.storeTotals" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
