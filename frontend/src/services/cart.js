const CART_KEY = 'storekit-cart'

export function getCart() {
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(product, selectedSize) {
  const cart = getCart()

  const existingItem = cart.find(
    (item) => item.id === product.id && item.tamanho === selectedSize
  )

  if (existingItem) {
    existingItem.quantidade += 1
  } else {
    cart.push({
      id: product.id,
      nome: product.nome,
      preco: product.preco,
      imagem_url: product.imagem_url,
      tamanho: selectedSize,
      quantidade: 1,
    })
  }

  saveCart(cart)
}