let cart = [];

let currentProduct = null;


/* =========================
   PRODUCT MODAL
========================= */

function viewProduct(name, price, image, description) {

    currentProduct = {
        name,
        price,
        image,
        description
    };

    document.getElementById("modalName").textContent = name;

    document.getElementById("modalDescription").textContent =
        description;

    document.getElementById("modalPrice").textContent =
        "$" + price.toFixed(2);

    document.getElementById("modalImage").textContent =
        image;

    document
        .getElementById("productModal")
        .classList
        .add("show");
}


function closeProduct() {

    document
        .getElementById("productModal")
        .classList
        .remove("show");

}


function closeModal(event) {

    if (event.target.classList.contains("modal")) {
        event.target.classList.remove("show");
    }

}


/* =========================
   ADD PRODUCT
========================= */

function addModalProduct() {

    if (!currentProduct) return;

    cart.push({
        name: currentProduct.name,
        price: currentProduct.price
    });

    updateCart();

    closeProduct();

    openCart();
}


/* =========================
   CART
========================= */

function updateCart() {

    const container =
        document.getElementById("cartItems");

    const count =
        document.getElementById("cartCount");

    const total =
        document.getElementById("cartTotal");


    count.textContent = cart.length;


    if (cart.length === 0) {

        container.innerHTML =
            `<div class="empty-cart">
                Your cart is empty.
            </div>`;

        total.textContent = "$0.00";

        return;
    }


    container.innerHTML = "";


    let totalPrice = 0;


    cart.forEach((item, index) => {

        totalPrice += item.price;


        const element =
            document.createElement("div");

        element.className = "cart-item";


        element.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <small>
                    C4Printz
                </small>

            </div>

            <span class="cart-item-price">
                $${item.price.toFixed(2)}
            </span>

            <button
                onclick="removeItem(${index})"
            >
                ×
            </button>

        `;


        container.appendChild(element);

    });


    total.textContent =
        "$" + totalPrice.toFixed(2);
}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


function openCart() {

    updateCart();

    document
        .getElementById("cartModal")
        .classList
        .add("show");

}


function closeCart(event) {

    if (!event || event.target.id === "cartModal") {

        document
            .getElementById("cartModal")
            .classList
            .remove("show");

    }

}


/* =========================
   CUSTOM IMAGE
========================= */

function previewImage(event) {

    const file =
        event.target.files[0];

    const preview =
        document.getElementById("filePreview");

    const fileName =
        document.getElementById("fileName");


    if (!file) return;


    fileName.textContent =
        file.name;


    const reader =
        new FileReader();


    reader.onload = function(e) {

        preview.src = e.target.result;

        preview.style.display = "block";

    };


    reader.readAsDataURL(file);

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


    if (!file && !description) {

        alert(
            "Please upload an image or describe what you want."
        );

        return;
    }


    cart.push({

        name: "Custom Print Request",

        price: 0,

        custom: true,

        fileName: file
            ? file.name
            : "No image",

        description:
            description || "Custom print"

    });


    updateCart();

    document
        .getElementById("customDescription")
        .value = "";


    document
        .getElementById("customFile")
        .value = "";


    document
        .getElementById("filePreview")
        .style.display = "none";


    document
        .getElementById("fileName")
        .textContent = "";


    openCart();

}


/* =========================
   ORDER REQUEST
========================= */

function requestOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    let message =
        "C4Printz Order Request%0A%0A";


    cart.forEach((item, index) => {

        message +=
            `${index + 1}. ${item.name}%0A`;

        if (item.description) {

            message +=
                `Details: ${item.description}%0A`;

        }

        if (item.fileName) {

            message +=
                `Image: ${item.fileName}%0A`;

        }

        if (item.price > 0) {

            message +=
                `Price: $${item.price.toFixed(2)}%0A`;

        }

        message += "%0A";

    });


    message +=
        "Please contact me about this order.";


    /*
       Change this to your preferred
       contact method later.
    */

    window.location.href =
        "mailto:?subject=C4Printz%20Order%20Request&body="
        + message;

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
