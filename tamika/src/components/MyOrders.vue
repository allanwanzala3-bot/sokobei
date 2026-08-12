<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-h5 font-weight-bold mb-4">My Orders</div>

          <v-alert
            v-if="store.visibleOrders.length === 0"
            type="info"
            variant="tonal"
            class="mb-4"
          >
            You have no orders yet. Book a delivery to get started!
          </v-alert>

          <v-list v-else>
            <v-list-item
              v-for="order in store.visibleOrders"
              :key="order.id"
              class="mb-4"
            >
              <v-list-item-title>
                {{ order.store }} — Ksh {{ order.total.toLocaleString() }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ order.address }} • {{ order.slot }} • {{ order.status }}
              </v-list-item-subtitle>

              <!-- ✅ List items inside the order -->
              <v-list density="compact" class="mt-2">
                <v-list-item
                  v-for="item in order.items"
                  :key="item.id"
                  class="pl-6"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>Ksh {{ item.price }}</v-list-item-subtitle>

                  <template #append>
                    <v-btn
                      v-if="order.status === 'Pending' && store.selectedRole !== 'Store Manager'"
                      color="error"
                      variant="tonal"
                      size="x-small"
                      @click="cancelItem(order.id, item.id)"
                    >
                      Cancel
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list>

              <!-- Manager actions -->
              <template #append>
                <v-btn
                  v-if="store.selectedRole === 'Store Manager' && order.status === 'Pending'"
                  color="success"
                  variant="tonal"
                  size="small"
                  @click="markDelivered(order.id)"
                >
                  Mark Delivered
                </v-btn>

                <v-btn
                  v-if="store.selectedRole === 'Store Manager' && order.status === 'Delivered'"
                  color="primary"
                  variant="tonal"
                  size="small"
                  @click="markCompleted(order.id)"
                >
                  Mark Completed
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useTamikaStore } from '@/stores/tamikaStore'
const store = useTamikaStore()

function cancelItem(orderId, itemId) {
  const order = store.orders.find(o => o.id === orderId)
  if (!order) return
  order.items = order.items.filter(i => i.id !== itemId)

  // Optional: if all items are cancelled, mark order as Cancelled
  if (order.items.length === 0) {
    order.status = 'Cancelled'
  }
}

function markDelivered(id) {
  const order = store.orders.find(o => o.id === id)
  if (order) order.status = 'Delivered'
}

function markCompleted(id) {
  const order = store.orders.find(o => o.id === id)
  if (order) order.status = 'Completed'
}
</script>
