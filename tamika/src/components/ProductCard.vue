<template>
  <v-card class="pa-2" outlined>
    <v-img :src="product.image" height="180"></v-img>

    <v-chip color="red" size="small" class="mt-2">Today's Deal</v-chip>
    <v-card-subtitle class="text-red text-caption">
      {{ product.discount }}% off
    </v-card-subtitle>

    <v-card-title class="text-wrap text-h6">{{ product.name }}</v-card-title>

    <v-card-text>
      <!-- Shopper view -->
      <div v-if="store.selectedRole !== 'Store Manager'">
        Ksh {{ product.minPrice }} – {{ product.maxPrice }}
      </div>

      <!-- Manager view -->
      <div v-else>
        Ksh {{ product.price }}
      </div>
    </v-card-text>
<v-btn
    color="grey-lighten-3"
    class="text-orange-darken-3"
    prepend-icon="mdi-scale-balance"
    @click="compareProduct(product)"
  >
    Compare
  </v-btn>

    <v-btn color="primary" block class="mt-2" @click="$emit('add', product)">
      ADD TO CART
    </v-btn>
  </v-card>
</template>

<script setup>
import { useTamikaStore } from '@/stores/tamikaStore'
import { useRouter } from 'vue-router'

const store = useTamikaStore()
const router = useRouter()

function addToCart(product) {
  store.addToCart(product)
}

function compareProduct(product) {
  store.selectedProduct = product
  router.push({ name: 'compare' })
}

defineProps({
  product: Object
})


</script>
