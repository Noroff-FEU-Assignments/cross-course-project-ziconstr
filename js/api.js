// js/api.js

const API_URL = "https://nadstarr.com/wp-json/wc/store/products";

export async function fetchAllProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return await response.json();
}
