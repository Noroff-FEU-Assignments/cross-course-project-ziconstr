const API_URL = "https://nadstarr.com/wp-json/wc/store/products";

async function displayMovies() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Network response failed");

    const data = await res.json();
    const container = document.getElementById("product-list");

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = "<p>No movies found.</p>";
      return;
    }

    data.forEach(movie => {
      const image = movie?.images?.[0]?.src || "images/fallback.jpg";
      const alt = movie?.images?.[0]?.alt || "Movie poster";
      const name = movie.name || "Untitled";
      const regular = movie.prices?.regular_price || "";
      const sale = movie.prices?.sale_price;

      const productCard = document.createElement("div");
      productCard.classList.add("movie-card");
      productCard.innerHTML = `
        <a href="product_info.html?id=${movie.id}&title=${encodeURIComponent(name)}">
          <img src="${image}" alt="${alt}" />
          <div class="info">
            <h3>${name}</h3>
            <p>${sale ? `<s>${regular} kr</s> <strong>${sale} kr</strong>` : `${regular} kr`}</p>
          </div>
        </a>
      `;
      container.appendChild(productCard);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("product-list").innerHTML = "<p>Could not load movies.</p>";
  }
}

displayMovies();
