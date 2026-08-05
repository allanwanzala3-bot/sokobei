<script setup>
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
</script>

<template>
  <v-container class="py-8">
    <v-card rounded="xl" elevation="4" class="pa-6">
      <div class="text-h5 font-weight-bold mb-4">Users</div>
      <v-list>
        <v-list-item v-for="user in store.users" :key="user.name">
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
