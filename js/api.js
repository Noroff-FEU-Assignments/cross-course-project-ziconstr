import { loader } from "./loader.js";


const ownAPI = "https://www.nadstarr.com/wp-json/wc/store/products";

export async function fetchmovies() {
  loader();
  const response = await fetch(ownAPI);

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  throw new Error("Try again later!");
}


const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

export const title = params.get("title");

const specificmovieUrl = ownAPI + "/" + id;

export async function fetchmovie() {
  loader();
  const response = await fetch(specificmovieUrl);

  const movieDetails = await response.json();

  return movieDetails;
}
