

$(document).ready(function(){

  $(".fade-in-text").each(function(index){

      $(this).css("opacity","0")

      .delay(index*600)

      .animate({
          opacity: 1,
          marginLeft: "50px"
      }, 1000);
  })
});

$(document).ready(function(){

  $(".fade-in-img").each(function(index){

      $(this).css("opacity","0")

      .delay(index*600)

      .animate({
          opacity: 1,
          marginLeft: "0px"
      }, 1000);
  })
});

const smallParag = document.querySelector('.smallParag');
const phonePic2 = document.querySelector(".phonePic2");
const slogan =  document.querySelector('.slogan');
const productBoxs = document.querySelectorAll('.prodcut-box');

const observer = new IntersectionObserver((entries,observer) => {
  entries.forEach(entry => {
      console.log("Observed:", entry);
      if(entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
      }
  });
},{
  threshold:0.2,

});
observer.observe(smallParag);
observer.observe(phonePic2);
observer.observe(slogan);
productBoxs.forEach(box => {
  observer.observe(box);
})

// Cart Open CLose
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
cart.classList.remove("active");
};
// Adding to cart
// Cart Using JS
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
  
  updateCartIcon();
}

// Add Cart Function
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title =
    shopProducts.getElementsByClassName("products-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;

  
  addProductToCart(title, price, productImg);
  updatePrice();
  
  
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
    updateCartIcon();
    updatePrice();
}
