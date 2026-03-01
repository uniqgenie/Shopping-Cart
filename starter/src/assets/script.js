// Product catalog
const products = [
  {
    name: "Carton of Cherries",
    price: 4,
    quantity: 0,
    productId: 100,
    image: "./images/cherry.jpg",
  },
  {
    name: "Carton of Strawberries",
    price: 5,
    quantity: 0,
    productId: 101,
    image: "./images/strawberry.jpg",
  },
  {
    name: "Bag of Oranges",
    price: 10,
    quantity: 0,
    productId: 102,
    image: "./images/orange.jpg",
  },
];

// Cart (stores references to product objects)
const cart = [];

// Stock limits
const stockLimit = {
  100: 5,
  101: 3,
  102: 8,
};

function getProductById(productId, list) {
  return list.find((p) => p.productId === productId);
}

function getIndexById(productId, list) {
  return list.findIndex((p) => p.productId === productId);
}

function getLimit(productId) {
  return stockLimit[productId] ?? Infinity;
}

function addProductToCart(productId) {
  const product = getProductById(productId, products);
  if (!product) return;

  const limit = getLimit(productId);
  const cartIndex = getIndexById(productId, cart);

  // If already in cart, increase if under limit
  if (cartIndex !== -1) {
    if (cart[cartIndex].quantity < limit) {
      cart[cartIndex].quantity += 1;
    }
    return;
  }

  // Add to cart if available
  if (limit > 0) {
    product.quantity = 1;
    cart.push(product);
  }
}

function increaseQuantity(productId) {
  const item = getProductById(productId, cart);
  if (!item) return;

  const limit = getLimit(productId);
  if (item.quantity < limit) {
    item.quantity += 1;
  }
}

function decreaseQuantity(productId) {
  const index = getIndexById(productId, cart);
  if (index === -1) return;

  const item = cart[index];

  if (item.quantity <= 1) {
    removeProductFromCart(productId);
  } else {
    item.quantity -= 1;
  }
}

function removeProductFromCart(productId) {
  const product = getProductById(productId, products);
  if (!product) return;

  const index = getIndexById(productId, cart);
  if (index === -1) return;

  cart.splice(index, 1);
  product.quantity = 0;
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

let totalPaid = 0;

function pay(amount) {
  totalPaid += amount;

  const total = cartTotal();
  const balance = totalPaid - total;

  // If fully paid and cart isn't empty, clear it
  if (balance >= 0 && total > 0) {
    emptyCart();
    totalPaid = 0;
  }

  return balance;
}

function emptyCart() {
  for (let i = cart.length - 1; i >= 0; i -= 1) {
    removeProductFromCart(cart[i].productId);
  }
}
