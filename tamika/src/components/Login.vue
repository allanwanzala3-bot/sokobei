<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-h4 font-weight-bold mb-4">Welcome Back</div>
          <p class="text-body-1 mb-4">
            Sign in to continue shopping, compare stores, and book delivery.
          </p>

          <v-text-field
            v-model="form.email"
            label="Email"
            prepend-icon="mdi-email"
            type="email"
            :rules="[
              v => !!v || 'Email is required',
              v => /.+@.+\..+/.test(v) || 'Enter a valid email'
            ]"
          />

          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            prepend-icon="mdi-lock"
            :rules="[v => v.length >= 6 || 'Min 6 characters']"
          />

          <v-btn :loading="isLoading" color="primary" block @click="submit">
            Login
          </v-btn>

          <v-alert v-if="error" type="error" class="mt-3">
            {{ error }}
          </v-alert>

          <v-select
  v-if="form.role === 'Store Manager'"
  v-model="form.store"
  :items="['Green Cart', 'Quick Mart', 'City Market']"
  label="Select Store"
  prepend-icon="mdi-store"
  required
/>


          <!-- Register link -->
          <p class="text-center text-body-2 mt-4">
            No account?
            <router-link to="/register" class="text-primary font-weight-bold text-decoration-none">
              Create one
            </router-link>
          </p>
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

const form = reactive({
  email: '',
  password: '',
})

const error = ref('')
const isLoading = ref(false)

function submit() {
  isLoading.value = true
  const ok = store.login(form.email, form.password)
  isLoading.value = false

  if (ok) {
    router.push('/cart')
  } else {
    error.value = 'Login failed. Please check your credentials.'
  }
}
</script>