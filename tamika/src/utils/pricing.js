export function compareStoreTotals(items, stores) {
  return stores.map((store) => {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0)
    const total = subtotal + store.deliveryFee - store.discount

    return {
      name: store.name,
      total: Number(total.toFixed(2)),
    }
  })
}

export function findBestStore(storeTotals) {
  return [...storeTotals].sort((a, b) => a.total - b.total)[0]
}
