let cart = [];
let currentProduct = null;
let modalQuantity = 1;
let customQuantity = 1;


/* =========================
   PRODUCT MODAL
========================= */

function viewProduct(name, emoji, image, description){

  currentProduct = {
    name,
    emoji,
    image,
    description
  };

  modalQuantity = 1;

  document.getElementById("modalName").textContent = name;
  document.getElementById("modalDescription").textContent = description;
  document.getElementById("modalEmoji").textContent = emoji;
  document.getElementById("modalQuantity").textContent = "1";

  document.getElementById("modalSize").value = "Medium";
  document.getElementById("modalColor").value = "Black";

  const photo = document.getElementById("modalPhoto");
  const emoji = document.getElementById("modalEmoji");

  emoji.style.display = "block";
  photo.style.display = "none";

  if(image){

    photo.src = image;

    photo.onload = function(){
      photo.style.display = "block";
      emoji.style.display = "none";
    };

    photo.onerror = function(){
      photo.style.display = "none";
      emoji.style.display = "block";
    };

  }

  document
    .getElementById("productModal")
    .classList.add("show");
}


function closeProduct(){

  document
    .getElementById("productModal")
    .classList.remove("show");

}


function closeModal(event){

  if(event.target.classList.contains("modal")){
    event.target.classList.remove("show");
  }

}


/* =========================
   PRODUCT QUANTITY
========================= */

function changeQuantity(amount){

  modalQuantity += amount;

  if(modalQuantity < 1){
    modalQuantity = 1;
  }

  if(modalQuantity > 99){
    modalQuantity = 99;
  }

  document.getElementById("modalQuantity").textContent =
    modalQuantity;
}


/* =========================
   ADD PRODUCT
========================= */

function addModalProduct(){

  if(!currentProduct){
    return;
  }

  const size =
    document.getElementById("modalSize").value;

  const color =
    document.getElementById("modalColor").value;


  for(let i = 0; i < modalQuantity; i++){

    cart.push({

      name: currentProduct.name,

      color: color,

      size: size

    });

  }


  updateCart();

  closeProduct();

  openCart();

}


/* =========================
   CUSTOM FILE
========================= */

function previewCAD(event){

  const file =
    event.target.files[0];

  document.getElementById("fileName").textContent =
    file
      ? "Selected: " + file.name
      : "";

}


/* =========================
   CUSTOM QUANTITY
========================= */

function changeCustomQuantity(amount){

  customQuantity += amount;

  if(customQuantity < 1){
    customQuantity = 1;
  }

  if(customQuantity > 99){
    customQuantity = 99;
  }

  document.getElementById("customQuantity").textContent =
    customQuantity;

}


/* =========================
   ADD CUSTOM
========================= */

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

  const size =
    document.getElementById("customSize").value;


  if(!file && !description){

    alert(
      "Please upload an STL/CAD file or describe what you want."
    );

    return;

  }


  for(let i = 0; i < customQuantity; i++){

    cart.push({

      name: "Custom Print",

      color: color,

      size: size,

      fileName:
        file
          ? file.name
          : "No file",

      description:
        description ||
        "Custom print request"

    });

  }


  document.getElementById("customFile").value = "";

  document.getElementById("customDescription").value = "";

  document.getElementById("fileName").textContent = "";

  document.getElementById("customQuantity").textContent = "1";

  customQuantity = 1;

  updateCart();

  openCart();

}


/* =========================
   CART
========================= */

function updateCart(){

  const box =
    document.getElementById("cartItems");

  const count =
    document.getElementById("cartCount");

  const total =
    document.getElementById("cartTotal");


  count.textContent = cart.length;


  if(!cart.length){

    box.innerHTML =
      '<div class="empty-cart">Your cart is empty.</div>';

    total.textContent = "0";

    return;

  }


  box.innerHTML = "";


  cart.forEach((item,index)=>{

    const element =
      document.createElement("div");

    element.className = "cart-item";


    element.innerHTML = `

      <div>

        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <small>

          ${item.size
            ? "Size: " +
              escapeHTML(item.size)
            : ""
          }

          ${item.color
            ? "<br>Color: " +
              escapeHTML(item.color)
            : ""
          }

          ${item.fileName
            ? "<br>File: " +
              escapeHTML(item.fileName)
            : ""
          }

          ${item.description
            ? "<br>" +
              escapeHTML(item.description)
            : ""
          }

        </small>

      </div>

      <button
        onclick="removeItem(${index})"
        aria-label="Remove item"
      >
        ×
      </button>

    `;


    box.appendChild(element);

  });


  total.textContent = cart.length;

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index){

  cart.splice(index,1);

  updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart(){

  updateCart();

  document
    .getElementById("cartModal")
    .classList.add("show");

}


/* =========================
   CLOSE CART
========================= */

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


/* =========================
   CHECKOUT
========================= */

function requestOrder(){

  if(!cart.length){

    alert("Your cart is empty.");

    return;

  }


  alert(
    "Thanks for your order request! 🎉\n\n" +

    "C4Printz is still working on the online " +
    "checkout system.\n\n" +

    "Your order has NOT been charged. " +
    "We'll contact you about the order."
  );

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text){

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


/* =========================
   START
========================= */

updateCart();
