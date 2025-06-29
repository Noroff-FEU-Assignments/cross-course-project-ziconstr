import { loader } from "./loader.js";


const ownAPI = "https://www.nadstarr.com/wp-json/wc/store/products";

export async function fetchmovie() {
  loader();
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  if (!id) {
    throw new Error("No ID found in query string");
  }

  const specificmovieUrl = ownAPI + "/" + id;

  const response = await fetch(specificmovieUrl);
  const movieDetails = await response.json();

  return movieDetails;
}
