<template>
  <v-container class="py-8">
    <v-row>
      <!-- Cart section -->
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-h5 font-weight-bold mb-4">Your cart</div>

          <v-alert v-if="store.cart.length === 0" type="warning" variant="tonal">
            Your cart is empty. Start shopping to add items!
          </v-alert>

          <v-list>
            <v-list-item v-for="item in store.cart" :key="item.id">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.category }}</v-list-item-subtitle>
              <template #append>
                <div class="d-flex align-center ga-2">
                  <span>Ksh {{ item.price }}</span>
                  <v-btn
                    icon="mdi-delete"
                    variant="text"
                    @click="store.removeFromCart(item.id)"
                  />
                </div>
              </template>
            </v-list-item>
          </v-list>

        <div class="text-right text-h6 mt-4">
  Subtotal: Ksh {{ store.storeTotals.find(s => s.name === store.selectedStore)?.total.toLocaleString() }}
</div>

          <div class="text-right text-body-2 mt-1">
            Tamika service fee: Ksh 10
          </div>
          <div class="text-right text-body-2 mt-1">
            Transport cost will be communicated on delivery
          </div>
        </v-card>
      </v-col>

      <!-- Store selection + comparison -->
      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-h6 font-weight-bold mb-3">Choose store</div>
          <v-select
            v-model="store.selectedStore"
            :items="store.stores.map(s => s.name)"
            label="Store"
            prepend-icon="mdi-store"
          />
          <v-btn
            color="primary"
            block
            class="mt-4"
            :disabled="!store.selectedStore"
            @click="goToDelivery"
          >
            Continue to delivery
          </v-btn>
        </v-card>

        <div class="mt-4">
          <!-- Pass bestStore so the component can highlight -->
          <StoreComparisonCard
            :stores="store.storeTotals"
            :best-store="store.bestStore"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTamikaStore } from '@/stores/tamikaStore'
import StoreComparisonCard from '@/components/StoreComparison.vue'

const store = useTamikaStore()
const router = useRouter()

function goToDelivery() {

  router.push('/delivery')
}
</script>

