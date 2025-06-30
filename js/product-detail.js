
const productContainer = document.getElementById("product-detail");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

const apiUrl = `https://nadstarr.com/wp-json/wc/store/products/${productId}`;

async function fetchProduct() {
  try {
    const response = await fetch(apiUrl);
    const product = await response.json();
    renderProduct(product);
  } catch (error) {
    productContainer.innerHTML = "<p>Error loading product details</p>";
    console.error("Error fetching product:", error);
  }
}

function renderProduct(product) {
  productContainer.innerHTML = `
    <h1>${product.name}</h1>
    <img src="${product.images[0]?.src}" alt="${product.name}" />
    <p>${product.description}</p>
    <p><strong>Price:</strong> ${product.prices.price / 100} ${product.prices.currency_code}</p>
  `;
}

fetchProduct();
