```javascript
let cart = [];
let currentProduct = null;
let customQuantity = 1;


/* PRODUCT MODAL */

function viewProduct(name, emoji, image, description, colorId, sizeId) {
  const color = document.getElementById(colorId).value;
  const size = document.getElementById(sizeId).value;

  currentProduct = {
    name,
    emoji,
    image,
    description,
    color,
    size
  };

  document.getElementById("modalName").textContent = name;
  document.getElementById("modalDescription").textContent = description;
  document.getElementById("modalColor").textContent = color;
  document.getElementById("modalSize").textContent = size;

  const photo = document.getElementById("modalPhoto");
  const emoji = document.getElementById("modalEmoji");

  photo.style.display = "none";
  emoji.style.display = "block";
  emoji.textContent = currentProduct.emoji;

  if (image) {
    photo.src = image;

    photo.onload = function () {
      photo.style.display = "block";
      emoji.style.display = "none";
    };

    photo.onerror = function () {
      photo.style.display = "none";
      emoji.style.display = "block";
    };
  }

  document.getElementById("productModal").classList.add("show");
}


function closeProduct() {
  document.getElementById("productModal").classList.remove("show");
}


function closeModal(event) {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("show");
  }
}


/* ADD PRODUCT */

function addModalProduct() {
  if (!currentProduct) return;

  cart.push({
    name: currentProduct.name,
    color: currentProduct.color,
    size: currentProduct.size
  });

  updateCart();
  closeProduct();
  openCart();
}


/* CUSTOM FILE */

function previewCAD(event) {
  const file = event.target.files[0];
  const name = document.getElementById("fileName");
  const title = document.getElementById("uploadTitle");
  const sub = document.getElementById("uploadSub");
  const zone = document.getElementById("dropZone");

  if (!file) {
    name.textContent = "";
    title.textContent = "Choose STL / CAD File";
    sub.textContent = "Click to browse your files";
    zone.classList.remove("ready");
    return;
  }

  name.textContent = "✓ Selected: " + file.name;
  title.textContent = "File Ready";
  sub.textContent = file.name;
  zone.classList.add("ready");
}


/* CUSTOM QUANTITY */

function changeQuantity(amount) {
  customQuantity += amount;

  if (customQuantity < 1) {
    customQuantity = 1;
  }

  if (customQuantity > 99) {
    customQuantity = 99;
  }

  document.getElementById("customQuantity").textContent = customQuantity;
}


/* ADD CUSTOM */

function addCustomToCart() {
  const file = document.getElementById("customFile").files[0];
  const description =
    document.getElementById("customDescription").value.trim();

  const color =
    document.getElementById("customColor").value;

  const size =
    document.getElementById("customSize").value;

  if (!file && !description) {
    alert("Please upload an STL/CAD file or describe what you want.");
    return;
  }

  for (let i = 0; i < customQuantity; i++) {
    cart.push({
      name: "Custom Print",
      color: color,
      size: size,
      fileName: file ? file.name : "No file",
      description: description || "Custom print request"
    });
  }

  document.getElementById("customFile").value = "";
  document.getElementById("customDescription").value = "";
  document.getElementById("fileName").textContent = "";

  document.getElementById("uploadTitle").textContent =
    "Choose STL / CAD File";

  document.getElementById("uploadSub").textContent =
    "Click to browse your files";

  document.getElementById("dropZone").classList.remove("ready");

  customQuantity = 1;
  document.getElementById("customQuantity").textContent = "1";

  updateCart();
  openCart();
}


/* CART */

function updateCart() {
  const box = document.getElementById("cartItems");
  const count = document.getElementById("cartCount");

  count.textContent = cart.length;

  if (!cart.length) {
    box.innerHTML =
      '<div class="empty-cart">Your cart is empty.</div>';
    return;
  }

  box.innerHTML = "";

  cart.forEach((item, index) => {
    const el = document.createElement("div");

    el.className = "cart-item";

    el.innerHTML = `
      <div>
        <strong>${escapeHTML(item.name)}</strong>

        <small>
          Color: ${escapeHTML(item.color || "Not selected")}
          <br>
          Size: ${escapeHTML(item.size || "Not selected")}

          ${
            item.fileName
              ? "<br>File: " + escapeHTML(item.fileName)
              : ""
          }

          ${
            item.description
              ? "<br>" + escapeHTML(item.description)
              : ""
          }
        </small>
      </div>

      <span>C4Printz</span>

      <button onclick="removeItem(${index})">×</button>
    `;

    box.appendChild(el);
  });
}


function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}


function openCart() {
  updateCart();
  document.getElementById("cartModal").classList.add("show");
}


function closeCart(event) {
  if (!event || event.target.id === "cartModal") {
    document.getElementById("cartModal").classList.remove("show");
  }
}


/* CHECKOUT */

function requestOrder() {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  alert(
    "Thanks for your order request! 🎉\n\n" +
    "C4Printz is still working on the online checkout system.\n\n" +
    "No payment has been taken. We'll review the request before checkout is available."
  );
}


/* SECURITY */

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


/* START */

updateCart();
```
