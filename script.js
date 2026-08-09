```javascript
let cart = [];
let currentProduct = null;
let currentQuantity = 1;


/* ================= PRODUCT MODAL ================= */

function viewProduct(name, emoji, image, description){

    currentProduct = {
        name: name,
        emoji: emoji,
        image: image,
        description: description
    };

    currentQuantity = 1;

    document.getElementById("modalName").textContent = name;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalEmoji").textContent = emoji;
    document.getElementById("modalQuantity").textContent = "1";

    const photo = document.getElementById("modalPhoto");
    const emoji = document.getElementById("modalEmoji");

    photo.style.display = "none";
    emoji.style.display = "block";

    if(image){

        photo.onload = function(){
            photo.style.display = "block";
            emoji.style.display = "none";
        };

        photo.onerror = function(){
            photo.style.display = "none";
            emoji.style.display = "block";
        };

        photo.src = image;
    }

    document.getElementById("productModal").classList.add("show");
}


/* ================= CLOSE PRODUCT ================= */

function closeProduct(){

    document
        .getElementById("productModal")
        .classList.remove("show");
}


/* ================= CLOSE MODAL ================= */

function closeModal(event){

    if(event.target.classList.contains("modal")){

        event.target.classList.remove("show");

    }

}


/* ================= QUANTITY ================= */

function changeQuantity(amount){

    currentQuantity += amount;

    if(currentQuantity < 1){
        currentQuantity = 1;
    }

    if(currentQuantity > 99){
        currentQuantity = 99;
    }

    document.getElementById("modalQuantity").textContent =
        currentQuantity;
}


/* ================= ADD PRODUCT ================= */

function addModalProduct(){

    if(!currentProduct){
        return;
    }

    const size =
        document.getElementById("modalSize").value;

    const color =
        document.getElementById("modalColor").value;


    for(let i = 0; i < currentQuantity; i++){

        cart.push({

            name: currentProduct.name,

            size: size,

            color: color

        });

    }


    updateCart();

    closeProduct();

    openCart();
}


/* ================= CUSTOM FILE ================= */

function previewCAD(event){

    const file = event.target.files[0];

    const fileName =
        document.getElementById("fileName");

    if(file){

        fileName.textContent =
            "Selected: " + file.name;

    }else{

        fileName.textContent = "";

    }

}


/* ================= CUSTOM REQUEST ================= */

function addCustomToCart(){

    const file =
        document.getElementById("customFile").files[0];

    const description =
        document
            .getElementById("customDescription")
            .value
            .trim();

    const color =
        document.getElementById("customColor").value;


    if(!file && !description){

        alert(
            "Please upload an STL/CAD file or describe what you want."
        );

        return;
    }


    cart.push({

        name: "Custom Print",

        size: "Custom",

        color: color,

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


/* ================= CART ================= */

function updateCart(){

    const box =
        document.getElementById("cartItems");

    const count =
        document.getElementById("cartCount");


    count.textContent = cart.length;


    if(cart.length === 0){

        box.innerHTML =
            '<div class="empty-cart">Your cart is empty.</div>';

        return;
    }


    box.innerHTML = "";


    cart.forEach(function(item, index){

        const element =
            document.createElement("div");

        element.className = "cart-item";


        let details =
            "Color: " +
            escapeHTML(item.color || "Not selected");


        if(item.size){

            details +=
                "<br>Size: " +
                escapeHTML(item.size);

        }


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

            <span>
                C4PRINTZ
            </span>

            <button
                onclick="removeItem(${index})"
            >
                ×
            </button>

        `;


        box.appendChild(element);

    });

}


/* ================= REMOVE ================= */

function removeItem(index){

    cart.splice(index, 1);

    updateCart();
}


/* ================= OPEN CART ================= */

function openCart(){

    updateCart();

    document
        .getElementById("cartModal")
        .classList.add("show");
}


/* ================= CLOSE CART ================= */

function closeCart(event){

    if(
        !event ||
        event.target.id === "cartModal"
    ){

        document
            .getElementById("cartModal")
            .classList.remove("show");

    }

}


/* ================= CHECKOUT ================= */

function requestOrder(){

    if(cart.length === 0){

        alert("Your cart is empty.");

        return;
    }


    alert(
        "Thanks for your order request! 🎉\n\n" +

        "C4Printz is still working on the online " +
        "checkout system.\n\n" +

        "No payment has been taken."
    );

}


/* ================= SECURITY ================= */

function escapeHTML(text){

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ================= START ================= */

updateCart();
```
