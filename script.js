let cart = [];
let currentProduct = null;

/* =========================
PRODUCT MODAL
========================= */

function viewProduct(
name,
price,
image,
description
) {

```
currentProduct = {
    name,
    price,
    image,
    description
};

document.getElementById("modalName").textContent =
    name;

document.getElementById("modalDescription").textContent =
    description;

document.getElementById("modalPrice").textContent =
    "$" + price.toFixed(2);

const modalImage =
    document.getElementById("modalImage");

const modalEmoji =
    document.getElementById("modalEmoji");

modalImage.onerror = function() {

    modalImage.style.display = "none";

    modalEmoji.style.display = "block";

};

modalImage.onload = function() {

    modalImage.style.display = "block";

    modalEmoji.style.display = "none";

};

modalImage.src = image;

document
    .getElementById("productModal")
    .classList
    .add("show");
```

}

function closeProduct() {

```
document
    .getElementById("productModal")
    .classList
    .remove("show");
```

}

function closeModal(event) {

```
if (
    event.target.classList.contains("modal")
) {

    event.target.classList.remove("show");

}
```

}

/* =========================
ADD PRODUCT
========================= */

function addModalProduct() {

```
if (!currentProduct) return;

const color =
    document.getElementById("productColor").value;

cart.push({

    name: currentProduct.name,

    price: currentProduct.price,

    color: color

});

updateCart();

closeProduct();

openCart();
```

}

/* =========================
CART
========================= */

function updateCart() {

```
const container =
    document.getElementById("cartItems");

const count =
    document.getElementById("cartCount");

const total =
    document.getElementById("cartTotal");


count.textContent =
    cart.length;


if (cart.length === 0) {

    container.innerHTML =
        `<div class="empty-cart">
            Your cart is empty.
        </div>`;

    total.textContent =
        "$0.00";

    return;
}


container.innerHTML = "";

let totalPrice = 0;


cart.forEach((item, index) => {

    totalPrice += item.price;


    const element =
        document.createElement("div");

    element.className =
        "cart-item";


    element.innerHTML = `

        <div class="cart-item-info">

            <strong>
                ${escapeHTML(item.name)}
            </strong>

            <small>
                Color: ${escapeHTML(item.color || "Black")}
            </small>

        </div>

        <span class="cart-item-price">
            $${item.price.toFixed(2)}
        </span>

        <button
            onclick="removeItem(${index})"
            aria-label="Remove item"
        >
            ×
        </button>

    `;


    container.appendChild(element);

});


total.textContent =
    "$" + totalPrice.toFixed(2);
```

}

function removeItem(index) {

```
cart.splice(index, 1);

updateCart();
```

}

function openCart() {

```
updateCart();

document
    .getElementById("cartModal")
    .classList
    .add("show");
```

}

function closeCart(event) {

```
if (
    !event ||
    event.target.id === "cartModal"
) {

    document
        .getElementById("cartModal")
        .classList
        .remove("show");
}
```

}

/* =========================
CUSTOM 3D FILE
========================= */

function preview3DFile(event) {

```
const file =
    event.target.files[0];

const fileName =
    document.getElementById("fileName");


if (!file) {

    fileName.textContent =
        "No file selected";

    return;
}


fileName.textContent =
    file.name;
```

}

/* =========================
CUSTOM REQUEST
========================= */

function addCustomToCart() {

```
const file =
    document
        .getElementById("customFile")
        .files[0];


const color =
    document
        .getElementById("customColor")
        .value;


const description =
    document
        .getElementById("customDescription")
        .value
        .trim();


if (!file) {

    alert(
        "Please upload a 3D file first."
    );

    return;
}


cart.push({

    name:
        "Custom Print Request",

    price:
        0,

    custom:
        true,

    fileName:
        file.name,

    color:
        color,

    description:
        description ||
        "Custom print request"

});


updateCart();


document
    .getElementById("customDescription")
    .value = "";


document
    .getElementById("customFile")
    .value = "";


document
    .getElementById("fileName")
    .textContent =
        "No file selected";


openCart();
```

}

/* =========================
CHECKOUT
========================= */

function requestOrder() {

```
if (cart.length === 0) {

    alert(
        "Your cart is empty."
    );

    return;
}


const cartBox =
    document.querySelector(".cart-box");


cartBox.innerHTML = `

    <button
        class="modal-close"
        onclick="closeCart()"
    >
        ×
    </button>

    <div class="checkout-notice">

        <div class="checkout-icon">
            🚧
        </div>

        <h3>
            Checkout Coming Soon
        </h3>

        <p>
            We're still working on checkout
            for C4Printz.
        </p>

        <p>
            Orders aren't being processed yet,
            but we're working on it!
        </p>

        <button
            class="custom-button"
            onclick="closeCart()"
        >
            Keep Browsing
        </button>

    </div>
`;
```

}

/* =========================
SECURITY
========================= */

function escapeHTML(text) {

```
const div =
    document.createElement("div");

div.textContent =
    text;

return div.innerHTML;
```

}

/* =========================
START
========================= */

updateCart();
