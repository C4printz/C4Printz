let cart = [];

let currentProduct = "";


const products = {

    dragon: {
        title: "Mini Dragon",
        tag: "POPULAR",
        description:
            "A fun articulated dragon that's perfect for your desk or shelf.",
        image: "🐉"
    },

    phone: {
        title: "Phone Stand",
        tag: "USEFUL",
        description:
            "A clean and sturdy 3D printed stand for your phone.",
        image: "📱"
    },

    costume: {
        title: "Costume Pieces",
        tag: "CUSTOM",
        description:
            "3D printed costume parts and accessories.",
        image: "👕"
    },

    octopus: {
        title: "Flexi Octopus",
        tag: "FLEXI",
        description:
            "A flexible articulated octopus that's fun to play with.",
        image: "🐙"
    },

    dinosaur: {
        title: "Articulated Dinosaur",
        tag: "NEW",
        description:
            "A fun articulated dinosaur for collectors.",
        image: "🦖"
    },

    frog: {
        title: "Flexi Frog",
        tag: "FLEXI",
        description:
            "A small articulated frog that's fun to play with.",
        image: "🐸"
    },

    controller: {
        title: "Controller Stand",
        tag: "GAMING",
        description:
            "Keep your gaming controller organized and off your desk.",
        image: "🎮"
    },

    planter: {
        title: "Mini Planter",
        tag: "HOME",
        description:
            "A small decorative planter for your desk.",
        image: "🪴"
    },

    fidget: {
        title: "Fidget Toy",
        tag: "FUN",
        description:
            "A satisfying little 3D printed fidget.",
        image: "🧩"
    },

    keychain: {
        title: "Custom Keychain",
        tag: "SMALL",
        description:
            "Small personalized 3D printed keychains.",
        image: "🔑"
    }

};


/* PRODUCT WINDOW */

function openProduct(product) {

    currentProduct = product;

    const data = products[product];

    document.getElementById("modalTitle").innerText =
        data.title;

    document.getElementById("modalTag").innerText =
        data.tag;

    document.getElementById("modalDescription").innerText =
        data.description;

    document.getElementById("modalImage").innerText =
        data.image;

    document.getElementById("modalSize").value = "5";

    document.getElementById("modalPrice").innerText =
        "$5";

    document.getElementById("productModal")
        .classList.add("show");

}


function closeProduct() {

    document.getElementById("productModal")
        .classList.remove("show");

}


/* PRICE */

function updatePrice() {

    const price =
        document.getElementById("modalSize").value;

    document.getElementById("modalPrice").innerText =
        "$" + price;

}


/* ADD PRODUCT */

function addProductToCart() {

    const size =
        document.getElementById("modalSize");

    const color =
        document.getElementById("modalColor");


    cart.push({

        name:
            products[currentProduct].title,

        size:
            size.options[size.selectedIndex].text,

        color:
            color.value,

        price:
            Number(size.value),

        type:
            "product"

    });


    updateCart();

    closeProduct();

    openCart();

}


/* CUSTOM FILE */

function showFile() {

    const file =
        document.getElementById("customFile").files[0];


    if (!file) {

        return;

    }


    document.getElementById("fileName").innerText =
        "📎 " + file.name;


    if (file.type.startsWith("image/")) {

        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                const preview =
                    document.getElementById("filePreview");

                preview.src =
                    event.target.result;

                preview.style.display =
                    "block";

            };


        reader.readAsDataURL(file);

    }

}


/* CUSTOM PRINT */

function addCustomToCart() {

    const file =
        document.getElementById("customFile").files[0];


    const size =
        document.getElementById("customSize");


    const notes =
        document.getElementById("customNotes").value;


    if (!file) {

        alert(
            "Please choose your 3D print file first!"
        );

        return;

    }


    cart.push({

        name:
            "Custom 3D Print",

        size:
            size.options[size.selectedIndex].text,

        color:
            "Custom",

        price:
            Number(size.value),

        fileName:
            file.name,

        notes:
            notes,

        type:
            "custom"

    });


    updateCart();

    openCart();

}


/* CART */

function openCart() {

    document.getElementById("cartModal")
        .classList.add("show");

}


function closeCart() {

    document.getElementById("cartModal")
        .classList.remove("show");

}


function updateCart() {

    const container =
        document.getElementById("cartItems");


    document.getElementById("cartCount").innerText =
        cart.length;


    if (cart.length === 0) {

        container.innerHTML =
            "<p class='empty-cart'>Your cart is empty.</p>";

        document.getElementById("cartTotal").innerText =
            "$0";

        return;

    }


    container.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        total += item.price;


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        if (item.type === "custom") {

            div.innerHTML = `

                <div class="cart-item-info">

                    <strong>
                        🖨️ Custom 3D Print
                    </strong>

                    <small>
                        ${item.size}
                    </small>

                    <small>
                        📎 ${escapeHTML(item.fileName)}
                    </small>

                    ${
                        item.notes
                        ?
                        `<small>📝 ${escapeHTML(item.notes)}</small>`
                        :
                        ""
                    }

                </div>

                <strong>
                    $${item.price}
                </strong>

                <button
                    onclick="removeItem(${index})"
                >
                    ✕
                </button>

            `;

        } else {

            div.innerHTML = `

                <div class="cart-item-info">

                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                    <small>
                        ${escapeHTML(item.size)}
                    </small>

                    <small>
                        🎨 ${escapeHTML(item.color)}
                    </small>

                </div>

                <strong>
                    $${item.price}
                </strong>

                <button
                    onclick="removeItem(${index})"
                >
                    ✕
                </button>

            `;

        }


        container.appendChild(div);

    });


    document.getElementById("cartTotal").innerText =
        "$" + total;

}


/* REMOVE */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* BASIC TEXT SAFETY */

function escapeHTML(text) {

    return String(text)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* CHECKOUT PLACEHOLDER */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Your order is ready! Real payment and order submission will be connected next."
    );

}


/* CLOSE MODAL WHEN CLICKING OUTSIDE */

window.addEventListener(
    "click",
    function(event) {

        const productModal =
            document.getElementById("productModal");

        const cartModal =
            document.getElementById("cartModal");


        if (event.target === productModal) {

            closeProduct();

        }


        if (event.target === cartModal) {

            closeCart();

        }

    }
);


/* START CART */

updateCart();
