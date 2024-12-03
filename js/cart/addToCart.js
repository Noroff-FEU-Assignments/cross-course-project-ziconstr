import { fetchmovies } from "../api.js";

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
  const movietId = button.dataset.id;
  const movietPrice = button.dataset.price;
  const movietTitle = button.dataset.title;
  const movietSale = button.dataset.onsale;
  const movietImage = button.dataset.image;
  const movietDiscount = button.dataset.discount;

  let item = {
    id: movietId,
    title: movietTitle,
    price: movietPrice,
    discount: movietDiscount,
    onSale: movietSale,
    image: movietImage,
    qty: 1,
  };

  let cart = loadCart("cart") || [];

  const itemInCart = cart.find((item) => item.id === movietId);

  if (itemInCart) {
    itemInCart.qty++;
  } else {
    cart.push(item);
  }

  saveCart("cart", cart);

  const popUp = document.querySelector(".popup");
  const closeBtn = document.querySelector(".close");

  popUp.style.display = "block";
  popUp.addEventListener("click", () => {
    popUp.style.display = "none";
  });
}

async function addToCart() {
  const moviet = await fetchmoviet();

  const getAddToCartBtn = document.querySelector(
    "button[data-id][data-price][data-discount][data-title][data-onsale][data-image]"
  );
  getAddToCartBtn.addEventListener("click", onAddToCart);
}

addToCart();
