

<template>
  <v-card class="pa-4" rounded="lg" elevation="4">
    <v-card-title class="text-h6">Account access</v-card-title>
    <v-card-subtitle>Choose your role and continue shopping</v-card-subtitle>
    <v-card-text>
      <v-btn-toggle v-model="mode.value" color="primary" mandatory class="mb-4">
        <v-btn value="login">Login</v-btn>
        <v-btn value="register">Create account</v-btn>
      </v-btn-toggle>

      <v-text-field v-model="form.name" label="Full name or email" prepend-icon="mdi-account" />
      <v-text-field v-model="form.password" label="Password" type="password" prepend-icon="mdi-lock" />
      <v-select v-model="form.role" :items="['Shopper', 'Driver', 'Store Manager']" label="Role" prepend-icon="mdi-account-switch" />

      <v-btn color="primary" block class="mt-2" @click="handleSubmit">
        {{ mode.value === 'login' ? 'Login' : 'Create account' }}
      </v-btn>

      <div v-if="store.isAuthenticated" class="mt-4 text-caption text-medium-emphasis">
        Signed in as {{ store.user?.name }} • {{ store.selectedRole }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { reactive } from 'vue'
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
const form = reactive({ name: '', password: '', role: 'Shopper' })
const mode = reactive({ value: 'login' })

function handleSubmit() {
  if (mode.value === 'login') {
    store.login(form.name, form.password, form.role)
  } else {
    store.register(form.name, form.password, form.role)
  }
}
</script>
