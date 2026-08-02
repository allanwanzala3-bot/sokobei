import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { compareStoreTotals, findBestStore } from '@/utils/pricing'

export const useTamikaStore = defineStore('tamika', () => {
  const user = ref(null)
  const selectedRole = ref('Shopper')
  const selectedStore = ref('Green Cart')
  const cart = ref([])
  const orders = ref([])
  const users = ref([])
  const offers = ref([
    { id: 1, title: 'Weekend Pantry Deal', description: 'Buy 2 get 15% off cereals', badge: 'Hot' },
    { id: 2, title: 'Free Delivery Thursday', description: 'Orders above 20K get free delivery', badge: 'New' },
  ])
  const stores = ref([
    { name: 'Green Cart', deliveryFee: 250, discount: 100 },
    { name: 'Quick Mart', deliveryFee: 180, discount: 0 },
    { name: 'City Market', deliveryFee: 320, discount: 150 },
  ])
  const deliveryRequest = ref({
    address: '',
    notes: '',
    slot: 'Morning',
  })

  const subtotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price, 0).toFixed(2),
  )

  const serviceFee = computed(() => 120)

  const storeTotals = computed(() => compareStoreTotals(cart.value.map((item) => ({ name: item.name, price: item.price })), stores.value))

  const bestStore = computed(() => findBestStore(storeTotals.value))

  const isAuthenticated = computed(() => Boolean(user.value))

  function login(name, password, role) {
    if (!name || !password) return false
    const existing = users.value.find((item) => item.name === name)
    if (!existing) return false
    user.value = { name, role: existing.role }
    selectedRole.value = existing.role
    return true
  }

  function register(name, password, role) {
    if (!name || !password) return false
    const existing = users.value.find((item) => item.name === name)
    if (existing) return false
    users.value.push({ name, role, password })
    user.value = { name, role }
    selectedRole.value = role
    return true
  }

  function logout() {
    user.value = null
    selectedRole.value = 'Shopper'
  }

  function addToCart(item) {
    cart.value.push({ ...item, id: Date.now() })
  }

  function removeFromCart(itemId) {
    cart.value = cart.value.filter((item) => item.id !== itemId)
  }

  function submitDelivery(payload) {
    deliveryRequest.value = { ...deliveryRequest.value, ...payload }
    return deliveryRequest.value
  }

  return {
    user,
    selectedRole,
    cart,
    offers,
    stores,
    deliveryRequest,
    subtotal,
    serviceFee,
    storeTotals,
    bestStore,
    isAuthenticated,
    selectedStore,
    orders,
    users,
    login,
    register,
    logout,
    addToCart,
    removeFromCart,
    submitDelivery,
  }
})
