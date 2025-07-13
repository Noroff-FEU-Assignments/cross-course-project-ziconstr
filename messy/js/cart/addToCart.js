
function saveCart(key, value) {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
}

function loadCart(key) {
  const jsonValue = localStorage.getItem(key);
  return JSON.parse(jsonValue);
}

function onAddToCart(event) {
  const button = event.target;
  const movieId = button.dataset.id;
  const moviePrice = button.dataset.price;
  const movieTitle = button.dataset.title;
  const movieSale = button.dataset.onsale;

  let cart = loadCart("cart") || [];
  const existingMovie = cart.find((item) => item.id === movieId);

  if (!existingMovie) {
    const movieToAdd = {
      id: movieId,
      price: moviePrice,
      title: movieTitle,
      on_sale: movieSale,
    };
    cart.push(movieToAdd);
  }

  saveCart("cart", cart);
}

document.querySelectorAll(".add-to-cart-button").forEach((button) => {
  button.addEventListener("click", onAddToCart);
});
