<script setup>
import { useTamikaStore } from '@/stores/tamikaStore'
const store = useTamikaStore()

function markDelivered(id) {
  const order = store.orders.find(o => o.id === id)
  if (order) order.status = 'Delivered'
}

function markCompleted(id) {
  const order = store.orders.find(o => o.id === id)
  if (order) order.status = 'Completed'
}
</script>

<template>
  <v-container class="py-8">
    <v-card rounded="xl" elevation="4" class="pa-6">
      <div class="text-h5 font-weight-bold mb-4">Orders</div>

      <v-alert v-if="store.selectedRole !== 'Store Manager'" type="warning" variant="tonal">
        Only a Store Manager can view orders.
      </v-alert>

      <v-list v-else-if="store.orders.length">
        <v-list-item
          v-for="order in store.orders"
          :key="order.id"
          lines="three"
          class="mb-4"
        >
          <v-list-item-title>{{ order.store }}</v-list-item-title>
          <v-list-item-subtitle>
            Customer: {{ order.customer }} • Role: {{ order.role }}<br />
            Address: {{ order.address }}<br />
            Preferred time: {{ order.slot }} • Payment: {{ order.payment }}
          </v-list-item-subtitle>

          <!-- ✅ Show items inside the order -->
          <v-list density="compact" class="mt-2">
            <v-list-item
              v-for="item in order.items"
              :key="item.id"
              class="pl-6"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>
                Ksh {{ item.price }}
                <span v-if="item.cancelled" class="text-error">(Cancelled)</span>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <template #append>
            <div class="text-right">
              <div>Ksh {{ order.total.toLocaleString() }}</div>
              <v-chip
                :color="order.status === 'Pending' ? 'warning' :
                        order.status === 'Delivered' ? 'success' :
                        order.status === 'Completed' ? 'primary' :
                        order.status === 'Cancelled' ? 'error' : 'grey'"
                size="small"
                class="mt-2"
              >
                {{ order.status }}
              </v-chip>

              <!-- Manager actions -->
              <v-btn
                v-if="order.status === 'Pending'"
                color="success"
                variant="tonal"
                size="small"
                class="mt-2"
                @click="markDelivered(order.id)"
              >
                Mark Delivered
              </v-btn>

              <v-btn
                v-if="order.status === 'Delivered'"
                color="primary"
                variant="tonal"
                size="small"
                class="mt-2"
                @click="markCompleted(order.id)"
              >
                Mark Completed
              </v-btn>
            </div>
          </template>
        </v-list-item>
      </v-list>

      <v-alert v-else type="info" variant="tonal">
        No orders have been placed yet.
      </v-alert>
    </v-card>
  </v-container>
</template>
