<template>
  <v-container fluid class="py-6">
    <!-- Hero Section -->
    <v-card color="deep-purple-lighten-5" rounded="xl" class="pa-6 mb-6">
      <div class="text-h4 font-weight-bold">Shop smarter with Tamika</div>
      <p class="text-body-1 mt-2">
        Compare prices across stores, discover offers, and book fast delivery in one place.
      </p>
      <v-chip color="primary" class="mt-4">
        Best store: {{ recommendedStore?.name || 'Loading...' }}
      </v-chip>
    </v-card>

    <!-- Product Grid (Naivas-style) -->
    <div class="text-h5 font-weight-bold mb-4">Today's Deals</div>
    <v-row dense>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="3" lg="2">
        <ProductCard :product="product" @add="addProduct" />

      </v-col>
    </v-row>

    <!-- Offers -->
    <v-row class="mt-2" dense>
      <v-col v-for="offer in store.offers" :key="offer.id" cols="12" md="4">
        <OfferCard :offer="offer" />
      </v-col>
    </v-row>

    <!-- About Section -->
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
import ProductCard from '@/components/ProductCard.vue'
import OfferCard from '@/components/OfferCard.vue'
import StoreComparisonCard from '@/components/StoreComparison.vue'


const store = useTamikaStore()
const recommendedStore = computed(() => store.bestStore)

function addProduct(item) {
  store.addToCart(item)
}

const products = [
  { id: 1, name: 'Sunrice Basmati Rice 5Kg',   minPrice: 1199, maxPrice: 2005,image: '/public/pic-1.png' },
  { id: 2, name: 'Dola Cooking Oil 5Ltr',  minPrice: 1199, maxPrice: 2006,  image: '/public/pic-2.png' },
  { id: 3, name: 'Prestige Margarine 1Kg',   minPrice: 399, maxPrice: 410, image: '/public/pic-3.png' },
  { id: 4, name: 'Nescafe Classic Jar 100g',   minPrice: 930, maxPrice: 940,  image: '/public/pic-4.png' },
]
</script>
