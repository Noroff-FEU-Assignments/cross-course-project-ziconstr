import { loader } from "./loader.js";

const ownAPI = "https://www.nadstarr.com/wp-json/wc/store/products";

/**
 * Fetch all products
 */
export async function fetchmovies() {
  try {
    loader();
    const response = await fetch(ownAPI);
    const result = await response.json();

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return result;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

/**
 * Fetch a single product using ?id= from the URL
 */
export async function fetchmovie() {
  try {
    loader();
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    if (!id) {
      throw new Error("No product ID found in URL");
    }

    const specificMovieUrl = `${ownAPI}/${id}`;
    const response = await fetch(specificMovieUrl);
    const movieDetails = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return movieDetails;
  } catch (error) {
    console.error("Error fetching single product:", error);
    throw error;
  }
}
