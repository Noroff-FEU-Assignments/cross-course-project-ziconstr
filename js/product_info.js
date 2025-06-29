import { fetchmovie, title } from "./api.js";
import { error } from "./error.js";

async function createMovieHtml() {
  try {
    const movieDetails = await fetchmovie();

    const movieWrapper = document.querySelector(".product_specific");
    const titleContainer = document.querySelector("#title");
    const getLoaderDiv = document.querySelector(".loader");

    if (getLoaderDiv) getLoaderDiv.classList.remove("loader");

    if (!movieWrapper || !titleContainer) {
      console.error("Required container elements are missing.");
      return;
    }

    titleContainer.textContent = title;

 movieWrapper.innerHTML = `
  <div class="movie">
    <img src="${movieDetails.images[0]?.src}" alt="${movieDetails.name}" />
    <h1>${movieDetails.name}</h1>
    <p>${movieDetails.description}</p>
    <p><strong>Price:</strong> ${movieDetails.prices?.regular_price} kr</p>
    ${
      movieDetails.on_sale
        ? `<p class="discount"><strong>Sale:</strong> ${movieDetails.prices?.sale_price} kr</p>`
        : ""
    }

    <button class="cta-button" 
        data-id="${movieDetails.id}" 
        data-title="${movieDetails.name}" 
        data-price="${movieDetails.prices?.regular_price}" 
        data-discount="${movieDetails.prices?.sale_price}" 
        data-onsale="${movieDetails.on_sale}" 
        data-image="${movieDetails.images[0]?.src}">
      Add to cart
    </button>
  </div>
`;

  } catch (e) {
    console.error(e);
    error();
  }
}

createMovieHtml();
