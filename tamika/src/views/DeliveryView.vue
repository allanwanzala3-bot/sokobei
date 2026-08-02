<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
const router = useRouter()
const showSuccess = ref(false)
const isProcessing = ref(false)
const form = reactive({
  address: '',
  slot: 'Morning',
  payment: 'Cash on delivery',
  notes: '',
})

function submit() {
  if (!form.payment) return

  isProcessing.value = true
  store.submitDelivery(form)

  window.setTimeout(() => {
    isProcessing.value = false
    showSuccess.value = true

    if (store.selectedRole === 'Store Manager') {
      store.orders.push({
        id: Date.now(),
        store: store.selectedStore,
        total: Number(store.subtotal) + (store.stores.find((s) => s.name === store.selectedStore)?.deliveryFee || 0) + store.serviceFee,
        address: form.address,
        payment: form.payment,
        slot: form.slot,
        notes: form.notes,
        customer: store.user?.name || 'Guest',
        role: store.selectedRole,
        status: 'Pending',
      })
    }
  }, 1200)
}

function closeSuccess() {
  showSuccess.value = false

  if (store.selectedRole === 'Store Manager') {
    router.push('/orders')
    return
  }

  router.push('/cart')
}
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="4" class="pa-6" :class="isProcessing ? 'opacity-80' : ''">
          <v-overlay :model-value="isProcessing" class="align-center justify-center" persistent>
            <v-progress-circular indeterminate color="primary" size="64" />
          </v-overlay>
          <div class="text-h5 font-weight-bold mb-4">Book delivery</div>
          <v-dialog v-model="showSuccess" max-width="420" persistent>
            <v-card rounded="lg">
              <v-card-title class="text-h6">Booking confirmed</v-card-title>
              <v-card-text>
                Booked successfully. Your delivery request has been received.
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="closeSuccess">Continue</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-text-field v-model="form.address" label="Delivery address" prepend-icon="mdi-home" />
          <v-select v-model="form.slot" :items="['Morning', 'Afternoon', 'Evening']" label="Preferred time" prepend-icon="mdi-clock-outline" />
          <v-select
            v-model="form.payment"
            :items="['Cash on delivery', 'Card', 'Mobile money']"
            label="Payment method"
            prepend-icon="mdi-credit-card"
            clearable
          />
          <v-textarea v-model="form.notes" label="Notes" prepend-icon="mdi-note-text" />
          <v-btn color="success" block class="mt-4" @click="submit">Pay and confirm</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
