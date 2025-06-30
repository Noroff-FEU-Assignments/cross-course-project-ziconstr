import { fetchProductById } from './api.js';

const productContainer = document.getElementById("product-detail");
const query = new URLSearchParams(window.location.search);
const id = query.get("id");

fetchProductById(id)
  .then(product => {
    const regularPrice = parseFloat(product.prices.regular_price) / 100;
    const salePrice = parseFloat(product.prices.sale_price) / 100;
    const price = product.on_sale ? salePrice : regularPrice;

    productContainer.innerHTML = `
      <div class="product-wrapper">
        <div class="product-image">
          <img src="${product.images[0]?.src}" alt="${product.name}">
        </div>
        <div class="product-info">
          ${product.on_sale ? '<span class="badge">SALE!</span>' : ''}
          <h1>${product.name}</h1>
          <div class="product-price">
            ${product.on_sale
              ? `<del>$${regularPrice.toFixed(2)}</del> <ins>$${salePrice.toFixed(2)}</ins>`
              : `<ins>$${regularPrice.toFixed(2)}</ins>`
            }
          </div>
          <button class="cta-button" id="add-to-cart">Add to cart</button>
        </div>
      </div>
      <div class="product-description">
        <h2>Description</h2>
        <p>${product.description || 'No description available.'}</p>
      </div>
    `;

    // Add to cart logic
    document.getElementById('add-to-cart').addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (!cart.find(p => p.id === product.id)) {
        cart.push({ id: product.id });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
      } else {
        alert("Product already in cart.");
      }
    });
  })
  .catch(error => {
    console.error("Error loading product:", error);
    productContainer.innerHTML = "<p>Could not load product.</p>";
  });
