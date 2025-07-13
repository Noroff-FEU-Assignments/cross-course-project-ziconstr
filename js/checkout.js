// js/checkout.js

import { clearCart } from "./storage.js";

document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();

  clearCart();
  window.location.href = "thankyou.html";
});
