<script setup>
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()

const props = defineProps({
  // 'product' = compare one product across stores (default)
  // 'cart'    = compare the whole cart's totals across stores
  mode: {
    type: String,
    default: 'product',
  },
  stores: {
    type: Array,
    required: false,
    default: () => [],
  },
  bestStore: {
    type: Object,
    required: false,
    default: null,
  },
})

function getPrice(productName, storeName) {
  const match = store.products.find(p => p.name === productName && p.store === storeName)
  return match ? `KSh ${match.price.toLocaleString()}` : '—'
}
</script>

<template>
  <v-card rounded="lg" elevation="4" class="pa-4">
    <!-- CART MODE: compare totals for everything in the cart -->
    <template v-if="mode === 'cart'">
      <v-card-title class="text-h6">Compare Stores for Your Cart</v-card-title>

      <v-alert v-if="!props.stores.length" type="info" variant="tonal" class="mb-4">
        Your cart is empty.
      </v-alert>

      <v-list v-else>
        <v-list-item v-for="s in props.stores" :key="s.name">
          <v-list-item-title>
            {{ s.name }}
            <v-chip
              v-if="props.bestStore && s.name === props.bestStore.name"
              color="green"
              size="small"
              class="ml-2"
            >
              Best Value
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>
            Subtotal: Ksh {{ s.total.toLocaleString() }} <br />
            Delivery Fee: Ksh {{ s.deliveryFee }} <br />
            Discount: Ksh {{ s.discount }} <br />
            <strong>Total: Ksh {{ s.finalTotal.toLocaleString() }}</strong>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </template>

    <!-- PRODUCT MODE: compare a single selected product across stores -->
    <template v-else>
      <v-card-title class="text-h6">
        Compare Prices for {{ store.selectedProduct?.name || 'Selected Product' }}
      </v-card-title>

      <v-alert
        v-if="!store.selectedProduct"
        type="info"
        variant="tonal"
        class="mb-4"
      >
        No product selected for comparison. Go back and choose one.
      </v-alert>

      <v-list v-else>
        <v-list-item v-for="s in store.stores" :key="s.name">
          <v-list-item-title>
            {{ s.name }}
            <v-chip
              v-if="store.bestStoreForProduct && s.name === store.bestStoreForProduct.name"
              color="green"
              size="small"
              class="ml-2"
            >
              Best Value
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>
            Price: {{ getPrice(store.selectedProduct.name, s.name) }} <br />
            Delivery Fee: Ksh {{ s.deliveryFee }} <br />
            Discount: Ksh {{ s.discount }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </template>
  </v-card>
</template>