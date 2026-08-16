
<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <v-card-title class="text-h5 font-weight-bold mb-2">
            Delivery Address (Kenya)
          </v-card-title>

          <v-text-field v-model="form.name" label="Full Name" />
          <v-text-field v-model="form.phone" label="Phone Number" />
          <v-select v-model="form.county" :items="counties" label="County" />
          <v-text-field v-model="form.town" label="Town / Estate" placeholder="e.g. Kilimani / Westlands" />
          <v-text-field v-model="form.street" label="Building / Street" placeholder="e.g. Apt 4B, Rose Avenue" />

          <v-divider class="my-6" />

          <v-card-title class="text-h6 font-weight-bold mb-2">
            Book Delivery
          </v-card-title>

          <v-select v-model="form.payment" :items="['Cash on delivery', 'Card', 'Mobile money']" label="Payment method" />
          <v-textarea v-model="form.notes" label="Notes" />

          <v-btn color="success" block class="mt-4" @click="submit">
            Book Delivery
          </v-btn>

          <!-- Success Dialog -->
          <v-dialog v-model="showSuccess" max-width="420" persistent>
            <v-card rounded="lg" class="pa-6 text-center">
              <v-icon color="success" size="64">mdi-check-circle-outline</v-icon>
              <h3 class="text-h6 font-weight-bold mt-4">Order Placed Successfully!</h3>
              <p class="text-body-2 mt-2">
                Payment verified via M-Pesa. Store managers have been notified and are preparing your package.
              </p>
              <v-btn color="teal-darken-3" class="mt-4" @click="goToMyOrders">
                My Orders
              </v-btn>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTamikaStore } from '@/stores/tamikaStore'


const store = useTamikaStore()
const router = useRouter()
const showSuccess = ref(false)

const form = reactive({
  name: '',
  phone: '',
  county: '',
  town: '',
  street: '',
  payment: 'Cash on delivery',
  notes: '',
})

const counties = ['Nairobi', 'Kiambu', 'Machakos', 'Mombasa']

function submit() {
  store.addOrder({
    address: form.street,
    county: form.county,
    payment: form.payment,
    notes: form.notes,
    slot: 'Morning', // or whatever you want
    total: store.subtotal,
    items: [...store.cart], // include cart items so they show in orders
  })

  // clear cart after placing order
  store.cart = []

  showSuccess.value = true
}


function goToMyOrders() {
  showSuccess.value = false
  router.push('/my-orders')
}
</script>
