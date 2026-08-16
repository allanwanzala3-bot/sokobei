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
                {{ order.store }} — Ksh {{ order.total?.toLocaleString() || 0 }}
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
                      v-if="order.status === 'Pending' || order.status === 'Preparing'"
                      color="error"
                      variant="tonal"
                      size="x-small"
                      @click="confirmCancelItem(order.id, item.id)"
                    >
                      Cancel
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list>

              <!-- Cancel entire order -->
              <v-btn
                v-if="order.status === 'Pending' || order.status === 'Preparing'"
                color="error"
                variant="tonal"
                size="small"
                class="mt-2"
                @click="confirmCancelOrder(order.id)"
              >
                Cancel Entire Order
              </v-btn>

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

        <!-- Confirmation Dialog -->
        <v-dialog v-model="showConfirm" max-width="400">
          <v-card class="pa-6 text-center">
            <v-icon color="error" size="48">mdi-alert-circle-outline</v-icon>
            <h3 class="text-h6 font-weight-bold mt-3">Cancel Order?</h3>
            <p class="text-body-2 mt-2">Are you sure you want to cancel this order?</p>
            <v-row justify="center" class="mt-4">
              <v-btn variant="outlined" color="grey-darken-1" @click="showConfirm = false">No</v-btn>
              <v-btn color="error" class="ml-2" @click="performCancel">Yes, Cancel</v-btn>
            </v-row>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useTamikaStore } from '@/stores/tamikaStore'
const store = useTamikaStore()

const showConfirm = ref(false)
let cancelTarget = { orderId: null, itemId: null }

function confirmCancelItem(orderId, itemId) {
  cancelTarget = { orderId, itemId }
  showConfirm.value = true
}

function confirmCancelOrder(orderId) {
  cancelTarget = { orderId, itemId: null }
  showConfirm.value = true
}

function performCancel() {
  const { orderId, itemId } = cancelTarget
  const order = store.orders.find(o => o.id === orderId)
  if (!order) return

  if (itemId) {
    order.items = order.items.filter(i => i.id !== itemId)
    if (order.items.length === 0) order.status = 'Cancelled'
  } else {
    order.status = 'Cancelled'
  }

  showConfirm.value = false
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
