

<template>
  <v-app-bar color="primary" flat>
    <v-app-bar-title>Tamika</v-app-bar-title>
    <v-spacer />
    <v-btn to="/" variant="text">Home</v-btn>
    <v-btn to="/cart" variant="text">Cart</v-btn>
    <v-btn to="/delivery" variant="text">Delivery</v-btn>
    <v-btn to="/orders" variant="text">Orders</v-btn>
    <v-btn to="/users" variant="text">Users</v-btn>

    <v-menu v-if="store.isAuthenticated" v-model="menu" offset-y>
      <template #activator="{ props }">
        <v-btn v-bind="props" icon class="ml-2">
          <v-avatar color="secondary" size="32">
            <span class="text-caption font-weight-bold">{{ initials }}</span>
          </v-avatar>
        </v-btn>
      </template>

      <v-list density="compact">
        <v-list-item to="/profile" @click="menu = false">
          <template #prepend>
            <v-icon icon="mdi-account" />
          </template>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <template #prepend>
            <v-icon icon="mdi-logout" />
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn v-else to="/auth" variant="text" class="ml-2">Login</v-btn>
  </v-app-bar>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
const router = useRouter()
const menu = ref(false)
const initials = computed(() => store.user?.name?.charAt(0)?.toUpperCase() || 'U')

function logout() {
  store.logout()
  menu.value = false
  router.push('/auth')
}
</script>