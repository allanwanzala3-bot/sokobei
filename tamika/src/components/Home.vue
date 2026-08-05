

<template>
  <v-container fluid class="py-6">
    <v-card color="deep-purple-lighten-5" rounded="xl" class="pa-6 mb-6">
      <div class="text-h4 font-weight-bold">Shop smarter with Tamika</div>
      <p class="text-body-1 mt-2">Compare prices across stores, discover offers, and book fast delivery in one place.</p>
      <v-chip color="primary" class="mt-4">Best store: {{ recommendedStore?.name || 'Loading...' }}</v-chip>
    </v-card>

    <v-row dense>
      <v-col v-for="item in catalog" :key="item.id" cols="12" sm="6" md="3">
        <StoreCard :item="item" @add="addProduct" />
      </v-col>
    </v-row>

    <v-row class="mt-4" dense>
      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="3" class="pa-4">
          <div class="text-h6 font-weight-bold mb-2">Cart preview</div>
          <v-list>
            <v-list-item v-for="item in store.cart" :key="item.id">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.category }}</v-list-item-subtitle>
              <template #append>
                <span>{{ item.price }} USD</span>
              </template>
            </v-list-item>
          </v-list>
          <div class="text-right text-h6 mt-2">Subtotal: Ksh {{ store.subtotal }}</div>
          <v-btn color="primary" class="mt-3" to="/cart">Go to cart</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <StoreComparisonCard :stores="store.storeTotals" />
      </v-col>
    </v-row>

    <v-row class="mt-2" dense>
      <v-col v-for="offer in store.offers" :key="offer.id" cols="12" md="4">
        <OfferCard :offer="offer" />
      </v-col>
    </v-row>

    <v-card rounded="xl" elevation="2" class="pa-6 mt-6" color="grey-lighten-5">
      <div class="text-h5 font-weight-bold mb-2">About Tamika</div>
      <p class="text-body-1">
        Tamika helps shoppers compare prices at different stores, discover special offers, and arrange delivery without switching between apps.
      </p>
      <p class="text-body-1 mt-2">
        The app supports multiple user roles such as shoppers, drivers, and store managers so the experience can scale from a single shopper to a full marketplace.
      </p>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useTamikaStore } from '@/stores/tamikaStore'
import Store from '@/components/Store.vue'
import OfferCard from '@/components/OfferCard.vue'
import StoreComparison from '@/components/StoreComparison.vue'

const store = useTamikaStore()
const recommendedStore = computed(() => store.bestStore)
const catalog = [
  { id: 1, name: 'Milk', price: 3.5, category: 'Groceries' },
  { id: 2, name: 'Bread', price: 2.2, category: 'Bakery' },
  { id: 3, name: 'Rice', price: 5.0, category: 'Pantry' },
  { id: 4, name: 'Soap', price: 2.8, category: 'Household' },
]

function addProduct(item) {
  store.addToCart(item)
}
</script>