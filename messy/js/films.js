// js/films.js
const API_URL = "https://nadstarr.com/wp-json/wc/store/products";

async function displayMovies() {
  try {
    const response = await fetch(API_URL);
    const movies = await response.json();

    const container = document.querySelector(".product_wrapper");
    if (!container) {
      console.error("Missing .product_wrapper in HTML.");
      return;
    }

    if (!Array.isArray(movies) || movies.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    container.innerHTML = "";

    movies.forEach((movie) => {
      const imageSrc = movie?.images?.[0]?.src || "images/fallback.jpg";
      const name = movie.name;
      const regularPrice = movie.prices.regular_price ?? "N/A";
      const salePrice = movie.prices.sale_price;

      container.innerHTML += `
        <div class="movie">
          <a href="product_info.html?id=${movie.id}" class="movieImage">
            <img src="${imageSrc}" alt="${name}" />
          </a>
          <p class="movieText">${name}</p>
          <p class="movieText">
            ${
              salePrice
                ? `<span class="movieSale">${regularPrice} kr</span> <span class="discount">${salePrice} kr</span>`
                : `${regularPrice} kr`
            }
          </p>
          <a href="product_info.html?id=${movie.id}" class="cta-button">Add to cart</a>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error loading movies:", error);
    document.querySelector(".product_wrapper").innerHTML = `<p>Failed to load products.</p>`;
  }
}

displayMovies();
