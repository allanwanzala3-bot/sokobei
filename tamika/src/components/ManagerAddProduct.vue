<template>
  <v-container class="py-8">
    <v-card rounded="xl" elevation="4" class="pa-6">
      <div class="text-h5 font-weight-bold mb-4">Add New Product</div>

      <v-form @submit.prevent="submitProduct">
        <v-text-field v-model="name" label="Product Name" required />
        <v-text-field v-model.number="minPrice" label="Min Price" type="number" required />
        <v-text-field v-model.number="maxPrice" label="Max Price" type="number" required />
        <v-textarea v-model="description" label="Description" rows="2" />

        <!-- Image upload -->
        <v-file-input
          v-model="image"
          label="Product Image"
          accept="image/*"
          prepend-icon="mdi-image"
        />

        <v-btn type="submit" color="primary" class="mt-4">Post Product</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useTamikaStore } from '@/stores/tamikaStore'

const store = useTamikaStore()
const name = ref('')
const minPrice = ref(0)
const maxPrice = ref(0)
const description = ref('')
const image = ref(null)

function submitProduct() {
  store.addProduct({
    name: name.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    description: description.value,
    image: image.value ? URL.createObjectURL(image.value) : null, // temporary preview
  })

  // reset form
  name.value = ''
  minPrice.value = 0
  maxPrice.value = 0
  description.value = ''
  image.value = null
}
</script>
