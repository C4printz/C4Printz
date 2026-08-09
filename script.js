let cart = [];

// ADD ITEM
function addToCart(item) {
  cart.push(item);
  document.getElementById("cart-count").innerText = cart.length;
}

// TOGGLE CART
function toggleCart() {
  let box = document.getElementById("cart-box");
  let list = document.getElementById("cart-items");

  list.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });

  box.style.display = box.style.display === "block" ? "none" : "block";
}

// CHECKOUT
function checkout() {
  alert("Order sent! You'll handle orders manually.");
}

// VIEW PRODUCT IMAGES
function viewProduct(images) {
  let viewer = document.getElementById("viewer");
  viewer.innerHTML = "";

  images.forEach(src => {
    let img = document.createElement("img");
    img.src = src;
    viewer.appendChild(img);
  });

  viewer.style.display = "flex";

  viewer.onclick = () => {
    viewer.style.display = "none";
  };
}

// CUSTOM UPLOAD
function addCustom() {
  let file = document.getElementById("upload").files[0];

  if (!file) {
    alert("Upload an image first!");
    return;
  }

  cart.push("Custom Design");
  document.getElementById("cart-count").innerText = cart.length;
}
