import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { compareStoreTotals, findBestStore } from '@/stores/pricing'

export const useTamikaStore = defineStore('tamika', () => {
  // 🔑 Auth state
  const user = ref(null)
  const selectedRole = ref('Shopper')
  const selectedStore = ref('Green Cart')

  // 🔑 Core data
  const cart = ref([])
  const orders = ref([])
  const users = ref([])

  const offers = ref([
    { id: 1, title: 'Weekend Pantry Deal', description: 'Buy 2 get 15% off cereals', badge: 'Hot' },
    { id: 2, title: 'Free Delivery Thursday', description: 'Orders above 20K get free delivery', badge: 'New' },
  ])

  const stores = ref([
    { name: 'Green Cart', discount: 100, deliveryFee: 250 },
    { name: 'Quick Mart', discount: 0, deliveryFee: 180 },
    { name: 'City Market', discount: 150, deliveryFee: 200 },
  ])

  // 🔑 Products: each store posts fixed price
  const products = ref([
    { id: 1, name: 'Sunrice Basmati Rice 5Kg', price: 1199, store: 'Green Cart' },
    { id: 2, name: 'Dola Cooking Oil 5Ltr', price: 1300, store: 'Quick Mart' },
    { id: 3, name: 'Prestige Margarine 1Kg', price: 1400, store: 'City Market' },
  ])

  // Shopper view → aggregated ranges
  const shopperProducts = computed(() => {
    const grouped = {}
    products.value.forEach(p => {
      if (!grouped[p.name]) grouped[p.name] = []
      grouped[p.name].push(p.price)
    })

    return Object.entries(grouped).map(([name, prices]) => ({
      name,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    }))
  })

  // Manager view → only their store’s products
  const managerProducts = computed(() => {
    if (selectedRole.value !== 'Store Manager') return []
    return products.value.filter(p => p.store === selectedStore.value)
  })

  // 🔑 Delivery
  const deliveryRequest = ref({
    address: '',
    notes: '',
    slot: 'Morning',
  })

  // 🔑 Cart totals
  const subtotal = computed(() =>
    Number(cart.value.reduce((sum, item) => sum + item.price, 0).toFixed(2))
  )

  const serviceFee = computed(() => 10)

  const storeTotals = computed(() =>
    compareStoreTotals(cart.value, stores.value)
  )

  const bestStore = computed(() => findBestStore(storeTotals.value))

  const isAuthenticated = computed(() => Boolean(user.value))

  // 🔑 Auth functions
  function login(name, password, store) {
    if (!name || !password) return false
    const existing = users.value.find(
      (item) => item.name === name && item.password === password && item.store === store
    )
    if (!existing) return false

    user.value = { name, role: existing.role, store: existing.store }
    selectedRole.value = existing.role
    selectedStore.value = existing.store
    return true
  }

  function register(name, password, role, store) {
    if (!name || !password) return false
    const existing = users.value.find((item) => item.name === name)
    if (existing) return false

    users.value.push({ name, role, password, store })
    user.value = { name, role, store }
    selectedRole.value = role
    selectedStore.value = store
    return true
  }

  function logout() {
    user.value = null
    selectedRole.value = 'Shopper'
    selectedStore.value = 'Green Cart'
  }

  // 🔑 Product management
  function addProduct(product) {
    products.value.push({
      ...product,
      id: Date.now(),
      store: selectedStore.value,
    })
  }

  // 🔑 Orders
  const managerOrders = computed(() => {
    if (selectedRole.value !== 'Store Manager') return []
    return orders.value.filter(o => o.store === selectedStore.value)
  })

  const visibleOrders = computed(() => {
    if (selectedRole.value === 'Store Manager') {
      return orders.value.filter(o => o.store === selectedStore.value)
    }
    return orders.value.filter(o => o.customer === (user.value?.name || 'Guest'))
  })

  // 🔑 Cart functions
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
    selectedStore,
    cart,
    orders,
    users,
    offers,
    stores,
    products,
    shopperProducts,
    managerProducts,
    deliveryRequest,
    subtotal,
    serviceFee,
    storeTotals,
    bestStore,
    isAuthenticated,
    visibleOrders,
    managerOrders,
    login,
    register,
    logout,
    addProduct,
    addToCart,
    removeFromCart,
    submitDelivery,
  }
})
