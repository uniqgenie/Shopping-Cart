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

const cart = [];


const stockLimit =
  typeof window !== "undefined"
    ? {
        100: 5, 
        101: 3, 
        102: 8, 
      }
    : {};


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

  if (cartIndex !== -1) {
    if (cart[cartIndex].quantity < limit) {
      cart[cartIndex].quantity += 1;
    }
    return;
  }


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

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
};
