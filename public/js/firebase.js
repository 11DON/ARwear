
// FireBase Configuratio
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlK3JATq6ZP43dLhvaSYVzZEP8ko_fgfE",
  authDomain: "clothing-website-5d3f9.firebaseapp.com",
  projectId: "clothing-website-5d3f9",
  storageBucket: "clothing-website-5d3f9.appspot.com",
  messagingSenderId: "10596963555",
  appId: "1:10596963555:web:8a2ac41de54bfb758de1d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  // Remove Item From Cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // Quantity change
  var quantitInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantitInputs.length; i++) {
    var input = quantitInputs[i];
    input.addEventListener("change", quantitChanges);
  }

  // Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  loadCartItems();
}
// Remove Cart Item
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatePrice();
  saveCartItems();
}

// Quantit Changes
function quantitChanges(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatePrice();
  saveCartItems();
  

}


// Load products and inject into .shop-content
async function loadProducts(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const container = document.querySelector(".shop-content");
    container.innerHTML = ""; // Clear previous content if any
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "prodcut-box"; // typo preserved from original
  
      div.innerHTML = `
        <img src="${data.imgUrl}" class="product-img">
        <h2 class="products-title">${data.name}</h2>
        <span class="price">$${data.price}</span>
        <button type="button" class="btn-add add-cart">Add To Cart</button>
      `;
  
      container.appendChild(div);
      console.log(`${doc.id} =>`, data);
    });
    const addCartButtons = document.getElementsByClassName("add-cart");
    for(let i=0; i< addCartButtons.length; i++){
      const button= addCartButtons[i];
      button.addEventListener("click",function(event) {
        var button = event.target;
        var shopProducts = button.parentElement;
        var title =
          shopProducts.getElementsByClassName("products-title")[0].innerText;
        var price = shopProducts.getElementsByClassName("price")[0].innerText;
        var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
      
        const cartItem = { title, price, productImg };
       console.log("Added to cart: ", cartItem);
       addProductToCart(title,price,productImg);

      
      });
    }
  }

  function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].innerText == title) {
        alert("you have already added this item to the cart");
      return;
      }
    }
    var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                          <div class="detail-box">
                              <div class="cart-product-title">${title}</div>
                              <div class="cart-price">${price}</div>
                              <input type="number" name="" id="" value="1" class="cart-quantity">
                          </div>
                          <!-- Remove Item -->
                          <i class='bx bx-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);
    cartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantitChanges);
      saveCartItems();
      updatePrice();
  }

  
// Update Price
function updatePrice() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  // Save Total to localStorage
  localStorage.setItem("cartTotal", total);
}

// Keep Items in Cart When Page Refreshs
function saveCartItems() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var cartItems = [];

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

    var item = {
      title: titleElement.innerHTML,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg,
    };
    cartItems.push(item);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Loads In Cart
function loadCartItems() { 
    var cartItems= localStorage.getItem('cartItems');
    if(cartItems){
        cartItems=JSON.parse(cartItems);

        for(var i =0; i< cartItems.length;i++){
            var item = cartItems[i];
            addProductToCart(item.title , item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length-1];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity');
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem('cartTotal');
    if(cartTotal){
        document.getElementsByClassName('total-price')[0].innerText="$"+cartTotal;
    }

 }




  if (window.location.href.includes("suits.html")) {
    loadProducts("suits");
  } else if (window.location.href.includes("watches.html")) {
    loadProducts("watches");
  } else if(window.location.href.includes("vestes.html")){
    loadProducts("vests");
  } else if(window.location.href.includes("shirts.html")){
    loadProducts("shirts");
  } else if(window.location.href.includes("shoes.html")){
    loadProducts("shoes");
  } else if(window.location.href.includes("ties.html")){
    loadProducts("ties");
  } else if(window.location.href.includes("belts.html")){
    loadProducts("belts");
  } else if(window.location.href.includes("cufflinks.html")){
    loadProducts("cufflinks");
  } else if(window.location.href.includes("socks.html")){
    loadProducts("socks");
  } else if(window.location.href.includes("suspenders.html")){
    loadProducts("suspenders");
  }