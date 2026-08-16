export function compareStoreTotals(items, stores) {
  return stores.map((store) => {
    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
    const total = subtotal + (store.deliveryFee || 0) - (store.discount || 0)

    return {
      name: store.name,
      total: Number(total.toFixed(2)),
    }
  })
}


export function findBestStore(storeTotals) {
  return [...storeTotals].sort((a, b) => a.total - b.total)[0]
}
