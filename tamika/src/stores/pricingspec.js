import { describe, expect, it } from 'vitest'
import { compareStoreTotals, findBestStore } from '../pricing'

describe('pricing helpers', () => {
  it('returns the lowest total for each store', () => {
    const items = [
      { name: 'Milk', price: 3.5 },
      { name: 'Bread', price: 2.2 },
    ]

    const totals = compareStoreTotals(items, [
      { name: 'Store A', deliveryFee: 1.5, discount: 0.5 },
      { name: 'Store B', deliveryFee: 0.8, discount: 0 },
    ])

    expect(totals).toEqual([
      { name: 'Store A', total: 6.7 },
      { name: 'Store B', total: 6.2 },
    ])
  })

  it('identifies the best store based on the lowest total', () => {
    const bestStore = findBestStore([
      { name: 'Store A', total: 14.2 },
      { name: 'Store B', total: 11.8 },
      { name: 'Store C', total: 13.5 },
    ])

    expect(bestStore).toEqual({ name: 'Store B', total: 11.8 })
  })
})
