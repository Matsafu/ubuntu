let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };


function addToCart(name, price) {
  const existingItem = cart.items.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ name, price, quantity: 1 });
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();

  alert(`${name} added to your cart!`);
}


function updateCartDisplay() {
  const cartList = document.getElementById('cart-list');
  if (!cartList) return; 
  cartList.innerHTML = "";

  cart.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} (x${item.quantity}) — R${item.price * item.quantity}`;
    cartList.appendChild(li);
  });

  document.getElementById('cart-items').textContent = `Items: ${cart.items.length}`;
  document.getElementById('cart-total').textContent = `Total: R${cart.total}`;
}


function goToCheckout() {
  if (cart.items.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}

function loadCheckout() {
  const checkoutList = document.getElementById('checkout-list');
  if (!checkoutList) return;

  checkoutList.innerHTML = "";
  cart.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} (x${item.quantity}) — R${item.price * item.quantity}`;
    checkoutList.appendChild(li);
  });

  document.getElementById('checkout-total').textContent = `Total: R${cart.total}`;
}


function confirmOrder() {
  alert("Thank you for your purchase! Your order has been placed.");
  cart = { items: [], total: 0 };
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = "index.html";
}


document.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay();
  loadCheckout();
});

