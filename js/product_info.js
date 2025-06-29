
import { fetchmovies } from "./api.js";
import { error } from "./error.js";

async function createMovieHtml() {
  try {
    const movies = await fetchmovies();
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    const movieDetails = movies.find(movie => movie.id == id);

    if (!movieDetails) {
      throw new Error("Movie not found");
    }

    const movieWrapper = document.querySelector(".product_specific");
    const titleContainer = document.querySelector("#title");
    const getLoaderDiv = document.querySelector(".loader");
    if (getLoaderDiv) getLoaderDiv.classList.remove("loader");

    let createSizeOptions = `<option value="0">Select size</option>`;

    for (let i = 0; i < 4; i++) {
      createSizeOptions += `<option value="${i + 1}">Size ${i + 1}</option>`;
    }

    movieWrapper.innerHTML = `
      <div>
        <h2>${movieDetails.name}</h2>
        <img src="${movieDetails.images[0]?.src}" alt="${movieDetails.name}" />
        <p>${movieDetails.description}</p>
        <p>Price: $${movieDetails.prices.price}</p>
        <select>${createSizeOptions}</select>
      </div>
    `;
    titleContainer.innerText = movieDetails.name;

  } catch (err) {
    error(err.message);
  }
}

createMovieHtml();
