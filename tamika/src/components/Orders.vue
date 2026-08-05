<script setup>
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
</script>

<template>
  <v-container class="py-8">
    <v-card rounded="xl" elevation="4" class="pa-6">
      <div class="text-h5 font-weight-bold mb-4">Orders</div>

      <v-alert v-if="store.selectedRole !== 'Store Manager'" type="warning" variant="tonal">
        Only a Store Manager can view orders.
      </v-alert>

      <v-list v-else-if="store.orders.length">
        <v-list-item v-for="order in store.orders" :key="order.id" lines="three">
          <v-list-item-title>{{ order.store }}</v-list-item-title>
          <v-list-item-subtitle>
            Customer: {{ order.customer }} • Role: {{ order.role }}<br />
            Address: {{ order.address }}<br />
            Preferred time: {{ order.slot }} • Payment: {{ order.payment }}
          </v-list-item-subtitle>
          <template #append>
            <div class="text-right">
              <div>Ksh {{ order.total }}</div>
              <v-chip color="primary" size="small" class="mt-2">{{ order.status }}</v-chip>
            </div>
          </template>
        </v-list-item>
      </v-list>

      <v-alert v-else type="info" variant="tonal">No orders have been placed yet.</v-alert>
    </v-card>
  </v-container>
</template>
