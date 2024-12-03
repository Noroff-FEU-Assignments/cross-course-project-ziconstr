import { fetchmovies } from "./api.js";
import { error } from "./error.js";

async function displaymovies() {
  try {
    const movies = await fetchmovies();
    const productWrapper = document.querySelector(".product_wrapper");
    const getLoaderDiv = document.querySelector(".loader");
    getLoaderDiv.classList.remove("loader");

    movies.forEach((movie) => {
      if (movie.on_sale) {
        productWrapper.innerHTML += `
                                   <div class="movie">
                                     <a href="product_info.html?id=${movie.id}&title=${movie.name}" class="movieImage">
                                     <img src="${movie.images[0].src}" alt="${movie.images[0].alt}"></a>
                                     <p class="movieText">${movie.name} </p>
                                     <p class="movieText"><span class="movieSale">${movie.prices.regular_price} kr</span> <span class="discount">${movie.prices.sale_price} kr</span></p>
                                     <a href="product_info.html?id=${movie.id}&title=${movie.name}" class="cta-button">Add to cart</a>
                                   </div>`;
      } else {
        productWrapper.innerHTML += `
                                   <div class="movie">
                                     <a href="product_info.html?id=${movie.id}&title=${movie.name}" class="movieImage">
                                     <img src="${movie.images[0].src}" alt="${movie.images[0].alt}"></a>
                                     <p class="movieText">${movie.name}</p>
                                     <p class="movieText">${movie.prices.regular_price} kr</p>
                                     <a href="product_info.html?id=${movie.id}&title=${movie.name}" class="cta-button">Add to cart</a>
                                   </div>`;
      }
    });
  } catch (e) {
    console.error(e);
    error();
  }
}

displaymovies();
