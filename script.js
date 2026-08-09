```javascript
/* =========================================
   C4PRINTZ
   MAIN JAVASCRIPT
========================================= */

let cart = [];
let currentProduct = null;
let currentQuantity = 1;


/* =========================================
   ELEMENTS
========================================= */

const productModal = document.getElementById("productModal");
const cartModal = document.getElementById("cartModal");

const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const modalPhoto = document.getElementById("modalPhoto");
const modalEmoji = document.getElementById("modalEmoji");

const modalColor = document.getElementById("modalColor");
const modalSize = document.getElementById("modalSize");
const modalQuantity = document.getElementById("modalQuantity");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotalItems = document.getElementById("cartTotalItems");


/* =========================================
   PRODUCT BUTTONS
========================================= */

document.querySelectorAll(".view-product").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const emoji = button.dataset.emoji;
        const image = button.dataset.image;
        const description = button.dataset.description;

        openProduct(
            name,
            emoji,
            image,
            description
        );

    });

});


/* =========================================
   OPEN PRODUCT
========================================= */

function openProduct(
    name,
    emoji,
    image,
    description
){

    currentProduct = {
        name,
        emoji,
        image,
        description
    };

    currentQuantity = 1;

    modalName.textContent = name;
    modalDescription.textContent = description;
    modalEmoji.textContent = emoji;

    modalColor.value = "Black";
    modalSize.value = "Medium";
    modalQuantity.textContent = "1";

    /*
       Start with the emoji visible.
       The image replaces it only if it
       actually loads.
    */

    modalPhoto.style.display = "none";
    modalEmoji.style.display = "block";

    if(image){

        modalPhoto.onload = function(){

            modalPhoto.style.display = "block";
            modalEmoji.style.display = "none";

        };

        modalPhoto.onerror = function(){

            modalPhoto.style.display = "none";
            modalEmoji.style.display = "block";

        };

        modalPhoto.src = image;

    }

    productModal.classList.add("show");
    productModal.setAttribute("aria-hidden","false");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CLOSE PRODUCT
========================================= */

function closeProduct(){

    productModal.classList.remove("show");
    productModal.setAttribute("aria-hidden","true");

    document.body.style.overflow = "";
}


/* =========================================
   QUANTITY
========================================= */

document.getElementById("quantityMinus").addEventListener(
    "click",
    () => {

        if(currentQuantity > 1){
            currentQuantity--;
            modalQuantity.textContent = currentQuantity;
        }

    }
);


document.getElementById("quantityPlus").addEventListener(
    "click",
    () => {

        if(currentQuantity < 99){
            currentQuantity++;
            modalQuantity.textContent = currentQuantity;
        }

    }
);


/* =========================================
   ADD PRODUCT TO CART
========================================= */

document.getElementById("addModalButton").addEventListener(
    "click",
    () => {

        if(!currentProduct){
            return;
        }

        const color = modalColor.value;
        const size = modalSize.value;

        cart.push({

            name: currentProduct.name,

            color: color,

            size: size,

            quantity: currentQuantity

        });

        updateCart();

        closeProduct();

        openCart();

    }
);


/* =========================================
   CUSTOM FILE
========================================= */

const customFile = document.getElementById("customFile");
const fileName = document.getElementById("fileName");

customFile.addEventListener(
    "change",
    () => {

        const file = customFile.files[0];

        if(file){

            fileName.textContent =
                "Selected: " + file.name;

        }else{

            fileName.textContent = "";

        }

    }
);


/* =========================================
   ADD CUSTOM REQUEST
========================================= */

document.getElementById("addCustomButton").addEventListener(
    "click",
    () => {

        const file = customFile.files[0];

        const description =
            document
                .getElementById("customDescription")
                .value
                .trim();

        const color =
            document
                .getElementById("customColor")
                .value;


        if(!file && !description){

            alert(
                "Please upload an STL/CAD file or describe what you want."
            );

            return;

        }


        cart.push({

            name: "Custom Print",

            color: color,

            size: "Custom",

            quantity: 1,

            fileName:
                file
                    ? file.name
                    : "No file",

            description:
                description
                    ? description
                    : "Custom print request"

        });


        customFile.value = "";

        document
            .getElementById("customDescription")
            .value = "";

        fileName.textContent = "";


        updateCart();

        openCart();

    }
);


/* =========================================
   UPDATE CART
========================================= */

function updateCart(){

    cartCount.textContent = cart.reduce(
        (total,item) =>
            total + (item.quantity || 1),
        0
    );


    if(cart.length === 0){

        cartItems.innerHTML =
            '<div class="empty-cart">Your cart is empty.</div>';

        cartTotalItems.textContent = "0";

        return;

    }


    cartItems.innerHTML = "";


    let totalItems = 0;


    cart.forEach((item,index) => {

        const quantity =
            item.quantity || 1;

        totalItems += quantity;


        const element =
            document.createElement("div");

        element.className = "cart-item";


        let details =
            "Color: " +
            escapeHTML(
                item.color || "Not selected"
            );


        if(item.size){

            details +=
                "<br>Size: " +
                escapeHTML(item.size);

        }


        details +=
            "<br>Quantity: " +
            quantity;


        if(item.fileName){

            details +=
                "<br>File: " +
                escapeHTML(item.fileName);

        }


        if(item.description){

            details +=
                "<br>" +
                escapeHTML(item.description);

        }


        element.innerHTML = `

            <div>

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <small>
                    ${details}
                </small>

            </div>

            <span class="cart-brand">
                C4Printz
            </span>

            <button
                type="button"
                aria-label="Remove item"
            >
                ×
            </button>

        `;


        element
            .querySelector("button")
            .addEventListener(
                "click",
                () => removeItem(index)
            );


        cartItems.appendChild(element);

    });


    cartTotalItems.textContent =
        totalItems;

}


/* =========================================
   REMOVE ITEM
========================================= */

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}


/* =========================================
   OPEN CART
========================================= */

function openCart(){

    updateCart();

    cartModal.classList.add("show");

    cartModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart(){

    cartModal.classList.remove("show");

    cartModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =========================================
   NAV CART BUTTON
========================================= */

document
    .getElementById("openCartButton")
    .addEventListener(
        "click",
        openCart
    );


/* =========================================
   CLOSE BUTTONS
========================================= */

document
    .getElementById("closeProductButton")
    .addEventListener(
        "click",
        closeProduct
    );


document
    .getElementById("closeCartButton")
    .addEventListener(
        "click",
        closeCart
    );


/* =========================================
   CLICK OUTSIDE MODALS
========================================= */

productModal.addEventListener(
    "click",
    event => {

        if(event.target === productModal){

            closeProduct();

        }

    }
);


cartModal.addEventListener(
    "click",
    event => {

        if(event.target === cartModal){

            closeCart();

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if(event.key === "Escape"){

            closeProduct();
            closeCart();

        }

    }
);


/* =========================================
   CHECKOUT
========================================= */

document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        () => {

            if(cart.length === 0){

                alert(
                    "Your cart is empty."
                );

                return;

            }


            alert(
                "Thanks for your order request! 🎉\n\n" +
                "C4Printz is still working on the online checkout system. " +
                "No payment has been taken.\n\n" +
                "We'll have online checkout available soon!"
            );

        }
    );


/* =========================================
   SECURITY
========================================= */

function escapeHTML(text){

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   START
========================================= */

updateCart();
```
