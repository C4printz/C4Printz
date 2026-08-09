let cart = [];
let currentProduct = null;
let selectedSize = "Small";
let quantity = 1;


/* =========================
   PRODUCT MODAL
========================= */

function viewProduct(name, emoji, image, description) {

  currentProduct = {
    name: name,
    emoji: emoji,
    image: image,
    description: description
  };

  selectedSize = "Small";
  quantity = 1;

  document.getElementById("modalName").textContent = name;
  document.getElementById("modalDescription").textContent = description;
  document.getElementById("modalEmoji").textContent = emoji;
  document.getElementById("modalColor").value = "Black";
  document.getElementById("quantityValue").textContent = "1";

  document.querySelectorAll(".size-button").forEach(button => {
    button.classList.remove("active");
  });

  document.querySelector(".size-button").classList.add("active");

  const photo = document.getElementById("modalPhoto");
  const emoji = document.getElementById("modalEmoji");

  if (image) {

    photo.src = image;
    photo.style.display = "block";
    emoji.style.display = "none";

    photo.onerror = function () {
      photo.style.display = "none";
      emoji.style.display = "block";
    };

  } else {

    photo.style.display = "none";
    emoji.style.display = "block";

  }

  document.getElementById("productModal").classList.add("show");
}


/* =========================
   CLOSE PRODUCT
========================= */

function closeProduct() {
  document
    .getElementById("productModal")
    .classList.remove("show");
}


function closeModal(event) {

  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("show");
  }

}


/* =========================
   SIZE
========================= */

function selectSize(button, size) {

  selectedSize = size;

  document.querySelectorAll(".size-button").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");
}


/* =========================
   QUANTITY
========================= */

function changeQuantity(amount) {

  quantity += amount;

  if (quantity < 1) {
    quantity = 1;
  }

  if (quantity > 20) {
    quantity = 20;
  }

  document.getElementById("quantityValue").textContent =
    quantity;
}


/* =========================
   ADD PRODUCT
========================= */

function addModalProduct() {

  if (!currentProduct) return;

  const color =
    document.getElementById("modalColor").value;

  for (let i = 0; i < quantity; i++) {

    cart.push({

      name: currentProduct.name,

      color: color,

      size: selectedSize

    });

  }

  updateCart();

  closeProduct();

  openCart();
}


/* =========================
   CUSTOM FILE
========================= */

function previewCAD(event) {

  const file = event.target.files[0];

  const fileName =
    document.getElementById("fileName");

  if (file) {

    fileName.textContent =
      "Selected: " + file.name;

  } else {

    fileName.textContent = "";

  }

}


/* =========================
   CUSTOM REQUEST
========================= */

function addCustomToCart() {

  const file =
    document.getElementById("customFile").files[0];

  const description =
    document
      .getElementById("customDescription")
      .value
      .trim();

  const color =
    document.getElementById("customColor").value;


  if (!file && !description) {

    alert(
      "Please upload an STL/CAD file or describe what you want."
    );

    return;

  }


  cart.push({

    name: "Custom Print",

    color: color,

    size: "Custom",

    fileName: file
      ? file.name
      : "No file",

    description:
      description || "Custom print request"

  });


  document.getElementById("customFile").value = "";

  document.getElementById("customDescription").value = "";

  document.getElementById("fileName").textContent = "";

  updateCart();

  openCart();
}


/* =========================
   CART
========================= */

function updateCart() {

  const box =
    document.getElementById("cartItems");

  const count =
    document.getElementById("cartCount");


  count.textContent = cart.length;


  if (cart.length === 0) {

    box.innerHTML =
      '<div class="empty-cart">Your cart is empty.</div>';

    return;

  }


  box.innerHTML = "";


  cart.forEach((item, index) => {

    const el =
      document.createElement("div");

    el.className = "cart-item";


    el.innerHTML = `

      <div class="cart-item-info">

        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <small>
          Color: ${escapeHTML(item.color || "Not selected")}
          <br>
          Size: ${escapeHTML(item.size || "Custom")}

          ${
            item.fileName
              ? `<br>File: ${escapeHTML(item.fileName)}`
              : ""
          }

          ${
            item.description
              ? `<br>${escapeHTML(item.description)}`
              : ""
          }

        </small>

      </div>


      <span class="cart-brand">
        C4Printz
      </span>


      <button
        onclick="removeItem(${index})"
      >
        ×
      </button>

    `;


    box.appendChild(el);

  });

}


/* =========================
   REMOVE
========================= */

function removeItem(index) {

  cart.splice(index, 1);

  updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart() {

  updateCart();

  document
    .getElementById("cartModal")
    .classList.add("show");

}


/* =========================
   CLOSE CART
========================= */

function closeCart(event) {

  if (
    !event ||
    event.target.id === "cartModal"
  ) {

    document
      .getElementById("cartModal")
      .classList.remove("show");

  }

}


/* =========================
   CHECKOUT
========================= */

function requestOrder() {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;

  }


  alert(
    "Thanks for your order request! 🎉\n\n" +

    "C4Printz is still working on the " +
    "online checkout system.\n\n" +

    "Your request has been saved on this page, " +
    "but no payment has been taken yet."
  );

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


/* =========================
   START
========================= */

updateCart();
