let cart=[];
let currentProduct=null;

function viewProduct(name,emoji,image,description,colorId){
  const color=document.getElementById(colorId).value;

  currentProduct={name,emoji,image,description,color};

  document.getElementById("modalName").textContent=name;
  document.getElementById("modalDescription").textContent=description;
  document.getElementById("modalColor").textContent=color;
  document.getElementById("modalEmoji").textContent=emoji;

  const photo=document.getElementById("modalPhoto");

  if(image){
    photo.src=image;
    photo.style.display="block";
    photo.onerror=()=>{
      photo.style.display="none";
      document.getElementById("modalEmoji").style.display="block";
    };
    document.getElementById("modalEmoji").style.display="none";
  }else{
    photo.style.display="none";
    document.getElementById("modalEmoji").style.display="block";
  }

  document.getElementById("productModal").classList.add("show");
}

function closeProduct(){
  document.getElementById("productModal").classList.remove("show");
}

function closeModal(e){
  if(e.target.classList.contains("modal")) e.target.classList.remove("show");
}

function addModalProduct(){
  if(!currentProduct)return;

  cart.push({
    name:currentProduct.name,
    color:currentProduct.color
  });

  updateCart();
  closeProduct();
  openCart();
}

function previewCAD(e){
  const file=e.target.files[0];
  document.getElementById("fileName").textContent=
    file ? "Selected: "+file.name : "";
}

function addCustomToCart(){
  const file=document.getElementById("customFile").files[0];
  const description=document.getElementById("customDescription").value.trim();
  const color=document.getElementById("customColor").value;

  if(!file && !description){
    alert("Please upload an STL/CAD file or describe what you want.");
    return;
  }

  cart.push({
    name:"Custom Print",
    color:color,
    fileName:file ? file.name : "No file",
    description:description || "Custom print request"
  });

  document.getElementById("customFile").value="";
  document.getElementById("customDescription").value="";
  document.getElementById("fileName").textContent="";

  updateCart();
  openCart();
}

function updateCart(){
  const box=document.getElementById("cartItems");
  const count=document.getElementById("cartCount");

  count.textContent=cart.length;

  if(!cart.length){
    box.innerHTML='<div class="empty-cart">Your cart is empty.</div>';
    return;
  }

  box.innerHTML="";

  cart.forEach((item,i)=>{
    const el=document.createElement("div");
    el.className="cart-item";

    el.innerHTML=`
      <div>
        <strong>${escapeHTML(item.name)}</strong>
        <small>
          Color: ${escapeHTML(item.color || "Not selected")}
          ${item.fileName ? "<br>File: "+escapeHTML(item.fileName):""}
          ${item.description ? "<br>"+escapeHTML(item.description):""}
        </small>
      </div>

      <span>C4Printz</span>

      <button onclick="removeItem(${i})">×</button>
    `;

    box.appendChild(el);
  });
}

function removeItem(i){
  cart.splice(i,1);
  updateCart();
}

function openCart(){
  updateCart();
  document.getElementById("cartModal").classList.add("show");
}

function closeCart(e){
  if(!e || e.target.id==="cartModal"){
    document.getElementById("cartModal").classList.remove("show");
  }
}

function requestOrder(){
  if(!cart.length){
    alert("Your cart is empty.");
    return;
  }

  alert(
    "Thanks for your order request! 🎉\n\n"+
    "C4Printz is still working on the online checkout system. "+
    "Your request has been saved on this page, but no payment has been taken."
  );
}

function escapeHTML(text){
  const div=document.createElement("div");
  div.textContent=text;
  return div.innerHTML;
}

updateCart();
