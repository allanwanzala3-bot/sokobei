<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
const router = useRouter()


const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'Shopper',
  storeName: '' // manager types this manually
})

const error = ref('')
const isLoading = ref(false)

function submitRegister() {
  isLoading.value = true
  const success = store.register(
    form.name,
    form.password,
    form.role,
    form.storeName
  )
  isLoading.value = false

  if (success) {
    router.push('/') // redirect after successful registration
  } else {
    error.value = 'Registration failed. Try again.'
  }
}
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-h4 font-weight-bold mb-4">Create Your Account</div>
          <p class="text-body-1 mb-4">
            Sign up to shop, compare stores, and book delivery.
          </p>

          <v-text-field v-model="form.name" label="Full Name" prepend-icon="mdi-account" />
          <v-text-field v-model="form.email" label="Email" prepend-icon="mdi-email" type="email" />
          <v-text-field v-model="form.password" label="Password" type="password" prepend-icon="mdi-lock" />

          
          <v-select
            v-model="form.role"
            :items="['Shopper', 'Store Manager']"
            label="Role"
            prepend-icon="mdi-account-switch"
          />

         
          <v-text-field
            v-if="form.role === 'Store Manager'"
            v-model="form.storeName"
            label="Store Name"
            prepend-icon="mdi-store"
            required
          />

          <v-btn :loading="isLoading" color="primary" block @click="submitRegister">
            Create account
          </v-btn>

          <v-alert v-if="error" type="error" class="mt-3">
            {{ error }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
