let currencySymbol = "$";
const MOVES = []; // not used, keeping file clean

// Draws product list
function drawProducts() {
  const productList = document.querySelector(".products");
  let productItems = "";

  products.forEach((element) => {
    productItems += `
      <div data-productid="${element.productId}">
        <img src="${element.image}" alt="${element.name}">
        <h3>${element.name}</h3>
        <p>price: ${currencySymbol}${element.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
  });

  productList.innerHTML = productItems;
}

// Draws cart
function drawCart() {
  const cartList = document.querySelector(".cart");
  let cartItems = "";

  cart.forEach((element) => {
    const itemTotal = element.price * element.quantity;

    cartItems += `
      <div data-productid="${element.productId}">
        <h3>${element.name}</h3>
        <p>price: ${currencySymbol}${element.price}</p>
        <p>quantity: ${element.quantity}</p>
        <p>total: ${currencySymbol}${itemTotal}</p>
        <button class="qup">+</button>
        <button class="qdown">-</button>
        <button class="remove">remove</button>
      </div>
    `;
  });

  cart.length ? (cartList.innerHTML = cartItems) : (cartList.innerHTML = "Cart Empty");
}

// Draws checkout
function drawCheckout() {
  const checkout = document.querySelector(".cart-total");
  checkout.innerHTML = "";

  const cartSum = cartTotal();

  const div = document.createElement("div");
  div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum}</p>`;
  checkout.append(div);
}

// Initialize
drawProducts();
drawCart();
drawCheckout();

// Add products event
document.querySelector(".products").addEventListener("click", (e) => {
  // Only respond if Add to Cart button clicked
  if (!e.target.classList.contains("add-to-cart")) return;

  const productId = Number(e.target.closest("div[data-productid]").dataset.productid);
  addProductToCart(productId);

  drawCart();
  drawCheckout();
});

// Cart buttons event delegation
document.querySelector(".cart").addEventListener("click", (e) => {
  const container = e.target.closest("div[data-productid]");
  if (!container) return;

  const productId = Number(container.dataset.productid);

  if (e.target.classList.contains("remove")) {
    removeProductFromCart(productId);
  } else if (e.target.classList.contains("qup")) {
    increaseQuantity(productId);
  } else if (e.target.classList.contains("qdown")) {
    decreaseQuantity(productId);
  } else {
    return;
  }

  drawCart();
  drawCheckout();
});

// Payment submit
document.querySelector(".pay").addEventListener("click", (e) => {
  e.preventDefault();

  let amount = document.querySelector(".received").value;
  amount = Number(amount);

  if (Number.isNaN(amount) || amount < 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const cashReturn = pay(amount);

  const paymentSummary = document.querySelector(".pay-summary");
  const div = document.createElement("div");

  if (cashReturn >= 0) {
    div.innerHTML = `
      <p>Cash Received: ${currencySymbol}${amount}</p>
      <p>Cash Returned: ${currencySymbol}${cashReturn}</p>
      <p>Thank you!</p>
      <hr/>
    `;
    document.querySelector(".received").value = "";
    drawCart();
    drawCheckout();
  } else {
    document.querySelector(".received").value = "";
    div.innerHTML = `
      <p>Cash Received: ${currencySymbol}${amount}</p>
      <p>Remaining Balance: ${currencySymbol}${Math.abs(cashReturn)}</p>
      <p>Please pay additional amount.</p>
      <hr/>
    `;
  }

  paymentSummary.append(div);
});
//     drawCheckout();
// });
/* End currency converter */
/* End standout suggestions */
