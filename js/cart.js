import { fetchProductById } from './api.js';

async function loadCart() {
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

  for (let item of cart) {
    try {
      const product = await fetchProductById(item.id);
      const price = product.on_sale
        ? parseFloat(product.prices.sale_price)
        : parseFloat(product.prices.regular_price);

      total += price;

      const productCard = document.createElement('div');
      productCard.classList.add('cart-item');
      productCard.innerHTML = `
        <img src="${product.images[0]?.src}" alt="${product.name}">
        <div>
          <h3>${product.name}</h3>
          <p>$${(price / 100).toFixed(2)}</p>
        </div>
      `;
      cartContainer.appendChild(productCard);
    } catch (error) {
      console.error(`Error fetching product ID ${item.id}:`, error);
    }
  }

  totalContainer.textContent = `Total: $${(total / 100).toFixed(2)}`;
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
