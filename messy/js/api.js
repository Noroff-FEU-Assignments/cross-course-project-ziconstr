// js/api.js

const API_BASE_URL = "https://nadstarr.com/wp-json/wc/store/products";

// Fetch all products
export async function fetchAllProducts() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch product list");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}

// Fetch a single product by ID
export async function fetchSingleProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching single product:", error);
    throw error;
  }
}
