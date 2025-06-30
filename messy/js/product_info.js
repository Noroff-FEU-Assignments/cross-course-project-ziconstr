const API_BASE = "https://nadstarr.com/wp-json/wc/store/products/";
const detailContainer = document.querySelector(".movie-details");

// Get ID from query string
const params = new URLSearchParams(document.location.search);
const productId = params.get("id");

// Handle missing ID
if (!productId) {
  detailContainer.innerHTML = `<p class="error">No product ID found in URL.</p>`;
} else {
  fetchProduct(productId);
}

// Fetch single product by ID
async function fetchProduct(id) {
  try {
    const response = await fetch(`${API_BASE}${id}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const product = await response.json();
    renderProduct(product);
  } catch (error) {
    console.error("Product fetch error:", error);
    detailContainer.innerHTML = `
      <div class="error">
        <p>Could not load product.</p>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// Render product HTML
function renderProduct(product) {
  const image = product.images?.[0]?.src || "images/fallback.jpg";
  const alt = product.images?.[0]?.alt || product.name;
  const price = product.prices?.regular_price || "N/A";
  const sale = product.prices?.sale_price;
  const description = product.description || "";

  detailContainer.innerHTML = `
    <div class="film-show" style="background-image: url('${image}')"></div>
    <div class="film-name">
      <h1>${product.name}</h1>
      <button class="buy">
        <a href="checkout-page.html">BUY</a>
      </button>
      <div class="trailer">
        <h3>Available now</h3>
        <p>${description}</p>
        <p class="price">
          ${sale 
            ? `<span class="movieSale">${price} kr</span> <span class="discount">${sale} kr</span>` 
            : `${price} kr`}
        </p>
      </div>
    </div>
  `;
}
