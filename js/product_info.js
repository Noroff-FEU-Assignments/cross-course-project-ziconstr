import { fetchmovies, title } from "./api.js";
import { error } from "./error.js";

async function createMovieHtml() {
  try {
    const movieDetails = await fetchmovie();

    const movieWrapper = document.querySelector(".product_specific");
    const titleContainer = document.querySelector("#title");
    const getLoaderDiv = document.querySelector(".loader");
    getLoaderDiv.classList.remove("loader");

    let createSizeOptions = `<option value="0">Select size</option>`;

    for (let i = 0; i < movieDetails.sizes.length; i++) {
      titleContainer.textContent = movieWrapper.innerHTML = title;

      createSizeOptions +=
        `<option value=` +
        movieDetails.sizes[i] +
        `">` +
        movieDetails.sizes[i] +
        `</option>`;

      movieWrapper.innerHTML = `
                                <div class="movie">
                                     <a href="product_info.html?id=${movie.id}&title=${movie.name}" class="movieImage">
                                     <img src="${movie.images[0].src}" alt="${movie.images[0].alt}"></a>
                                     <p class="movieText">${movie.name} </p>
                                     <p class="movieText"><span class="movieSale">${movie.prices.regular_price} kr</span> <span class="discount">${movie.prices.sale_price} kr</span></p>
                                     <a href="product_info.html?id=${movie.id}&title=${movie.name}" class="cta-button">Add to cart</a>
                                   </div>`;

      if (!movieDetails.onSale) {
        const hideDiscount = document.querySelector(".hideDiscount");
        hideDiscount.style.display = "none";
      }

      if (movieDetails.onSale) {
        const getSaleSpan = document.querySelector(".sales");
        getSaleSpan.classList.add("movieSale");
      }
    }
  } catch (e) {
    console.error(e);
    error();
  }
}

createMovieHtml();