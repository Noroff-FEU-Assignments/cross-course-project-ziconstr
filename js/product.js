const productsContainer = document.getElementById("products-container");

const apiUrl = "https://nadstarr.com/wp-json/wc/store/products";

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    productsContainer.innerHTML = "<p>Error loading products</p>";
    console.error("Error fetching products:", error);
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productHTML = `
      <a class="product-card" href="product.html?id=${product.id}">
        <img src="${product.images[0]?.src}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.prices.price / 100} ${product.prices.currency_code}</p>
      </a>
    `;
    productsContainer.innerHTML += productHTML;
  });
}

fetchProducts();
