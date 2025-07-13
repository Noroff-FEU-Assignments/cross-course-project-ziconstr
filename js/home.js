import { fetchAllProducts } from './api.js';

async function displayHomePageSections() {
  const newReleasesContainer = document.getElementById("new-releases");
  const popularContainer = document.getElementById("most-popular");

  try {
    const products = await fetchAllProducts();

    newReleasesContainer.innerHTML = '';
    popularContainer.innerHTML = '';

    // Example logic: first 3 products = new, next 3 = popular
    const newReleases = products.slice(0, 3);
    const popular = products.slice(3, 6);

    newReleases.forEach(product => {
      newReleasesContainer.innerHTML += generateProductCard(product);
    });

    popular.forEach(product => {
      popularContainer.innerHTML += generateProductCard(product);
    });

  } catch (error) {
    console.error("Failed to fetch homepage products:", error);
    newReleasesContainer.innerHTML = '<p>Could not load new releases.</p>';
    popularContainer.innerHTML = '<p>Could not load popular movies.</p>';
  }
}

function generateProductCard(product) {
  const regularPrice = parseFloat(product.prices.regular_price) / 100;
  const salePrice = parseFloat(product.prices.sale_price) / 100;
  const isOnSale = product.on_sale;

  return `
    <div class="movie-card">
      <a href="product.html?id=${product.id}">
        <img src="${product.images[0]?.src}" alt="${product.images[0]?.alt || product.name}" />
      </a>
      <div class="info">
        <h3>${product.name}</h3>
        ${isOnSale ? '<span class="badge">SALE!</span>' : ''}
        <div class="price">
          ${isOnSale ? `<del>$${regularPrice.toFixed(2)}</del>` : ''}
          <ins>$${(isOnSale ? salePrice : regularPrice).toFixed(2)}</ins>
        </div>
        <button class="cta-button" data-id="${product.id}">Add to cart</button>
      </div>
    </div>
  `;
}

displayHomePageSections();
