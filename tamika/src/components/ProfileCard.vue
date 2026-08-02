<script setup>
import { computed } from 'vue'
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
const initials = computed(() => store.user?.name?.charAt(0)?.toUpperCase() || 'U')
</script>

<template>
  <v-card rounded="xl" elevation="4" class="pa-6">
    <div class="d-flex align-center ga-3 mb-4">
      <v-avatar color="primary" size="48">
        <span class="text-h6 font-weight-bold">{{ initials }}</span>
      </v-avatar>
      <div>
        <div class="text-h6">{{ store.user?.name || 'Guest' }}</div>
        <div class="text-caption text-medium-emphasis">{{ store.selectedRole }}</div>
      </div>
    </div>

    <v-list density="compact">
      <v-list-item>
        <template #prepend>
          <v-icon icon="mdi-email" />
        </template>
        <v-list-item-title>{{ store.user?.name || 'No email' }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <template #prepend>
          <v-icon icon="mdi-account-tie" />
        </template>
        <v-list-item-title>{{ store.selectedRole }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
