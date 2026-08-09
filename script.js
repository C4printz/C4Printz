let cart = [];

let currentProduct = null;

let selectedSize = "Medium";


/* =========================
PRODUCT PRICES
========================= */

const sizePrices = {

    Small: 0.60,

    Medium: 1.00,

    Large: 1.50

};


/*
    These are multipliers.

    The prices below are the BASE medium prices.
    Small = 60% of medium
    Medium = 100%
    Large = 150%
*/


const productBasePrices = {

    "Flexi Dragon": 12,

    "Dinosaur": 10,

    "Flexi Octopus": 9,

    "Flexi Shark": 11,

    "Flexi Turtle": 8,

    "Custom Keychain": 6,

    "Fidget Toy": 7

};


/* =========================
PRODUCT MODAL
========================= */

function viewProduct(name, image, description) {

    const basePrice = productBasePrices[name] || 10;

    currentProduct = {
        name: name,
        image: image,
        description: description,
        basePrice: basePrice
    };

    selectedSize = "Medium";

    document.getElementById("modalName").textContent = name;

    document.getElementById("modalDescription").textContent =
        description;

    document.getElementById("modalImage").src = image;

    updateSizePrices();

    selectSize("Medium");

    document
        .getElementById("productModal")
        .classList
        .add("show");
}


/* =========================
SIZE PRICES
========================= */

function getSizePrice(size) {

    if (!currentProduct) return 0;

    return currentProduct.basePrice * sizePrices[size];
}


function updateSizePrices() {

    if (!currentProduct) return;

    const small =
        getSizePrice("Small");

    const medium =
        getSizePrice("Medium");

    const large =
        getSizePrice("Large");


    document.getElementById("smallPrice").textContent =
        "$" + small.toFixed(2);

    document.getElementById("mediumPrice").textContent =
        "$" + medium.toFixed(2);

    document.getElementById("largePrice").textContent =
        "$" + large.toFixed(2);
}


/* =========================
SELECT SIZE
========================= */

function selectSize(size) {

    selectedSize = size;

    document
        .querySelectorAll(".size-button")
        .forEach(button => {
            button.classList.remove("selected");
        });


    const button =
        document.getElementById(
            "size" + size
        );


    if (button) {
        button.classList.add("selected");
    }


    const price =
        getSizePrice(size);


    document.getElementById("modalPrice").textContent =
        "$" + price.toFixed(2);
}


/* =========================
CLOSE PRODUCT
========================= */

function closeProduct() {

    document
        .getElementById("productModal")
        .classList
        .remove("show");
}


function closeModal(event) {

    if (
        event.target.classList.contains("modal")
    ) {

        event.target.classList.remove("show");

    }
}


/* =========================
ADD PRODUCT
========================= */

function addModalProduct() {

    if (!currentProduct) return;


    const price =
        getSizePrice(selectedSize);


    cart.push({

        name: currentProduct.name,

        size: selectedSize,

        price: price,

        image: currentProduct.image

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
                    ${item.custom
                        ? escapeHTML(item.size || "Custom")
                        : "Size: " + escapeHTML(item.size || "Medium")}
                </small>

            </div>

            <span class="cart-item-price">
                ${item.price > 0
                    ? "$" + item.price.toFixed(2)
                    : "Quote"}
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
}


/* =========================
REMOVE ITEM
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
        .classList
        .add("show");
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
            .classList
            .remove("show");
    }
}


/* =========================
CUSTOM IMAGE PREVIEW
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


    reader.onload =
        function(e) {

            preview.src =
                e.target.result;

            preview.style.display =
                "block";
        };


    reader.readAsDataURL(file);
}


/* =========================
CUSTOM REQUEST
========================= */

function addCustomToCart() {

    const file =
        document
            .getElementById("customFile")
            .files[0];


    const description =
        document
            .getElementById("customDescription")
            .value
            .trim();


    const size =
        document
            .getElementById("customSize")
            .value;


    if (!file && !description) {

        alert(
            "Please upload an image or describe what you want."
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

        size:
            size,

        fileName:
            file
                ? file.name
                : "No image",

        description:
            description ||
            "Custom print"

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
        .style
        .display = "none";


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

        alert(
            "Your cart is empty."
        );

        return;
    }


    let message =
        "C4Printz Order Request\n\n";


    cart.forEach((item, index) => {

        message +=
            `${index + 1}. ${item.name}\n`;


        if (item.size) {

            message +=
                `Size: ${item.size}\n`;
        }


        if (item.description) {

            message +=
                `Details: ${item.description}\n`;
        }


        if (item.fileName) {

            message +=
                `Image: ${item.fileName}\n`;
        }


        if (item.price > 0) {

            message +=
                `Price: $${item.price.toFixed(2)}\n`;

        } else {

            message +=
                `Price: Custom Quote\n`;
        }


        message += "\n";

    });


    message +=
        "Please contact me about this order.";


    window.location.href =
        "mailto:c4rocks@icloud.com" +
        "?subject=" +
        encodeURIComponent(
            "C4Printz Order Request"
        ) +
        "&body=" +
        encodeURIComponent(message);
}


/* =========================
SECURITY
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;
}


/* =========================
ESC KEY
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeProduct();

            document
                .getElementById("cartModal")
                .classList
                .remove("show");
        }

    }
);


/* =========================
START
========================= */

updateCart();
