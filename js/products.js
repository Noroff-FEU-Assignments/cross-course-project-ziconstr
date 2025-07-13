// js/products.js
import { fetchAllProducts } from './api.js';

async function displayAllProducts() {
  const container = document.getElementById('all-products');
  container.innerHTML = '<p>Loading...</p>';

  try {
    const products = await fetchAllProducts();
    container.innerHTML = '';

    products.forEach(product => {
  const regularPrice = parseFloat(product.prices.regular_price) / 100;
  const salePrice = parseFloat(product.prices.sale_price) / 100;
  const isOnSale = product.on_sale;

  const card = document.createElement('div');
  card.classList.add('product-card');

  card.innerHTML = `
    <a href="product.html?id=${product.id}">
      <img src="${product.images[0]?.src}" alt="${product.name}">
    </a>
    <h3>${product.name}</h3>
    ${isOnSale ? '<span class="badge">SALE!</span>' : ''}
    <div class="price">
      <del>$${regularPrice.toFixed(2)}</del>
      <ins>$${(isOnSale ? salePrice : regularPrice).toFixed(2)}</ins>
    </div>
    <button class="cta-button" data-id="${product.id}">Add to cart</button>
  `;

  container.appendChild(card);
});


  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Could not load movies.</p>';
  }
}

displayAllProducts();
