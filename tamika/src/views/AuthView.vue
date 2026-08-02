<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
const router = useRouter()
const form = reactive({
  name: '',
  password: '',
  role: 'Shopper',
  mode: 'login',
})

function submit() {
  if (form.mode === 'register') {
    const ok = store.register(form.name, form.password, form.role)
    if (ok) router.push('/cart')
  } else {
    const ok = store.login(form.name, form.password, form.role)
    if (ok) router.push('/cart')
  }
}
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-h4 font-weight-bold mb-4">Welcome to Tamika</div>
          <p class="text-body-1 mb-4">Create an account first, then sign in to shop, compare stores, and book delivery.</p>

          <v-btn-toggle v-model="form.mode" color="primary" mandatory class="mb-4">
            <v-btn value="login">Login</v-btn>
            <v-btn value="register">Sign up</v-btn>
          </v-btn-toggle>

          <v-text-field v-model="form.name" label="Name or email" prepend-icon="mdi-account" />
          <v-text-field v-model="form.password" label="Password" type="password" prepend-icon="mdi-lock" />
          <v-select v-model="form.role" :items="['Shopper', 'Driver', 'Store Manager']" label="Role" prepend-icon="mdi-account-switch" />

          <v-btn color="primary" block @click="submit">
            {{ form.mode === 'login' ? 'Login' : 'Create account' }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
