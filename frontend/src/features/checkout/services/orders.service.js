import { api } from '@/lib/api'

export async function createOrder(items) {
  const payload = {
    items: items.map((item) => ({
      product_id: item.productId,
      variant_id: item.variantId,
      quantity: item.quantity,
    })),
  }

  const { data } = await api.post('/orders/', payload)

  return data
}