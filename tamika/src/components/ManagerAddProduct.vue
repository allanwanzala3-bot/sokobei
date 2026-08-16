<template>
  <v-container class="py-8">
    <v-card rounded="xl" elevation="4" class="pa-6">
      <v-card-title class="text-h5 font-weight-bold mb-4">
        Add New Product
      </v-card-title>

      <!-- Product Details -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="product.name" label="Product Name *" placeholder="e.g. Samsung Galaxy A15 128GB" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="product.brand" label="Brand Name" placeholder="e.g. Samsung, Apple, Local Artisan" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-select v-model="product.category" :items="categories" label="Category *" required />
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="product.condition" :items="conditions" label="Condition" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="product.sku" label="SKU / Product Code" placeholder="Auto-generated if blank" />
        </v-col>
      </v-row>

      <!-- Price Section -->
      <v-sheet class="pa-4 my-4" color="green-lighten-5" rounded="lg">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model.number="product.price" label="Price in KSh *" prefix="KSh" required />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model.number="product.discountPrice" label="Discount Price (Optional)" prefix="KSh" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model.number="product.stock" label="Available Stock *" required />
          </v-col>
        </v-row>
      </v-sheet>

      <!-- Description -->
      <v-textarea v-model="product.description" label="Product Description *" rows="3" required />

      <!-- Image Upload -->
      <v-card class="pa-4 mt-4" outlined>
        <v-card-title>Product Images *</v-card-title>
        <v-file-input
          v-model="product.image"
          label="Upload Image"
          accept="image/*"
          prepend-icon="mdi-upload"
          placeholder="JPEG, PNG, WebP"
          required
        />
      </v-card>

      <!-- Actions -->
      <v-row class="mt-6" justify="end">
        <v-btn variant="outlined" color="grey-darken-1" class="mr-2">Cancel</v-btn>
        <v-btn color="success" @click="publishProduct">Publish Product to Marketplace</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue'

const product = reactive({
  name: '',
  brand: '',
  category: '',
  condition: 'New',
  sku: '',
  price: null,
  discountPrice: null,
  stock: null,
  description: '',
  image: null,
})

const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Groceries']
const conditions = ['New', 'Used']

function publishProduct() {
  console.log('Product published:', product)
}
</script>
