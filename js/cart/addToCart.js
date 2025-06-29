function saveCart(key, value) {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
}

function loadCart(key) {
  const jsonValue = localStorage.getItem(key);
  return JSON.parse(jsonValue) || [];
}

function onAddToCart(event) {
  const button = event.target;

  const movieId = button.dataset.id;
  const moviePrice = button.dataset.price;
  const movieTitle = button.dataset.title;
  const movieSale = button.dataset.onsale;
  const movieImage = button.dataset.image;
  const movieDiscount = button.dataset.discount;

  const item = {
    id: movieId,
    title: movieTitle,
    price: moviePrice,
    discount: movieDiscount,
    onSale: movieSale,
    image: movieImage,
    qty: 1,
  };

  const cart = loadCart("cart");

  const itemInCart = cart.find((item) => item.id === movieId);

  if (itemInCart) {
    itemInCart.qty++;
  } else {
    cart.push(item);
  }

  saveCart("cart", cart);

  const popUp = document.querySelector(".popup");
  if (popUp) {
    popUp.style.display = "block";
    popUp.addEventListener("click", () => {
      popUp.style.display = "none";
    });
  }
}

function addToCart() {
  const addButton = document.querySelector("button[data-id]");

  if (!addButton) {
    console.warn("No Add to Cart button found");
    return;
  }

  addButton.addEventListener("click", onAddToCart);
}

addToCart();
