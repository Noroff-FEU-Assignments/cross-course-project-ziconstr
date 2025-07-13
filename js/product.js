import { fetchAllProducts } from './api.js';

async function displayProducts() {
  const container = document.getElementById('products-container');
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
          ${isOnSale ? `<del>$${regularPrice.toFixed(2)}</del>` : ''}
          <ins>$${(isOnSale ? salePrice : regularPrice).toFixed(2)}</ins>
        </div>
        <button class="cta-button" data-id="${product.id}">Add to cart</button>
      `;

      container.appendChild(card);
    });

    // Add to cart listeners
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.dataset.id);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cart.find(item => item.id === id)) {
          cart.push({ id });
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Product added to cart!");
        } else {
          alert("Product already in cart.");
        }
      });
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Failed to load products.</p>';
  }
}

displayProducts();
