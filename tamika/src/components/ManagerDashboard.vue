<template>
  <v-container class="py-8">
    <v-card rounded="xl" elevation="4" class="pa-6">
      <div class="text-h5 font-weight-bold mb-4">Store Manager Dashboard</div>

      <!-- Orders for this store -->
      <div class="text-h6 mb-2">Orders for {{ store.selectedStore }}</div>
      <v-list v-if="store.managerOrders.length">
        <v-list-item
          v-for="order in store.managerOrders"
          :key="order.id"
          class="mb-2"
        >
          <v-list-item-title>
            {{ order.customer }} — Ksh {{ order.total.toLocaleString() }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ order.address }} • {{ order.slot }} • {{ order.status }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-alert v-else type="info" variant="tonal">No orders yet.</v-alert>

      <!-- Products for this store -->
      <div class="text-h6 mt-6 mb-2">Products in {{ store.selectedStore }}</div>
      <v-list v-if="store.managerProducts.length">
        <v-list-item
          v-for="product in store.managerProducts"
          :key="product.id"
        >
          <v-list-item-title>{{ product.name }}</v-list-item-title>
          <v-list-item-subtitle>
            Ksh {{ product.minPrice }} – {{ product.maxPrice }}
          </v-list-item-subtitle>

          <template #append>

            <v-btn to="/manager/add-product" color="primary" class="mt-4">
  Add New Product
</v-btn>

            <v-btn
              color="primary"
              variant="tonal"
              size="small"
              @click="editProduct(product)"
            >
              Update
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-alert v-else type="info" variant="tonal">No products found.</v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { useTamikaStore } from '@/stores/tamikaStore'
const store = useTamikaStore()

function editProduct(product) {
  // open a dialog or route to an edit form
  console.log('Editing product:', product)
}
</script>
