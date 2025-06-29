const API_URL = "https://nadstarr.com/wp-json/wc/store/products";

async function displaymovies() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const movies = await response.json();
    console.log("Fetched products:", movies);

    const productWrapper = document.querySelector(".product_wrapper");
    if (!productWrapper) {
      console.error("Missing .product_wrapper in HTML");
      return;
    }

    if (!Array.isArray(movies) || movies.length === 0) {
      productWrapper.innerHTML = `<p>No products found.</p>`;
      return;
    }

    productWrapper.innerHTML = ""; // Clear existing

    movies.forEach((movie) => {
      const imageSrc = movie?.images?.[0]?.src || "images/fallback.jpg";
      const imageAlt = movie?.images?.[0]?.alt || "Movie";

      const regularPrice = movie?.prices?.regular_price ?? "N/A";
      const salePrice = movie?.prices?.sale_price;

      const movieHTML = `
        <div class="movie">
          <a href="product_info.html?id=${movie.id}&title=${movie.name}" class="movieImage">
            <img src="${imageSrc}" alt="${imageAlt}">
          </a>
          <p class="movieText">${movie.name}</p>
          <p class="movieText">
            ${salePrice
              ? `<span class="movieSale">${regularPrice} kr</span> <span class="discount">${salePrice} kr</span>`
              : `${regularPrice} kr`}
          </p>
          <a href="product_info.html?id=${movie.id}&title=${movie.name}" class="cta-button">Add to cart</a>
        </div>
      `;

      productWrapper.innerHTML += movieHTML;
    });
  } catch (error) {
    console.error("Error fetching or displaying products:", error);
    const productWrapper = document.querySelector(".product_wrapper");
    if (productWrapper) {
      productWrapper.innerHTML = `
        <div class="error">
          <p>Sorry, something went wrong while loading the products.</p>
          <p>${error.message}</p>
        </div>
      `;
    }
  }
}

displaymovies();
