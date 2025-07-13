function loadCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalContainer.textContent = '';
    return;
  }

  let total = 0;
  cartContainer.innerHTML = '';

  cart.forEach(product => {
    const price = parseFloat(product.price) / 100;
    total += price;

    const item = document.createElement('div');
    item.classList.add('cart-item');
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <p>$${price.toFixed(2)}</p>
      </div>
    `;
    cartContainer.appendChild(item);
  });

  totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById('checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      localStorage.removeItem('cart');
      window.location.href = 'thankyou.html';
    });
  }

  loadCart();
});
