
// $(document).ready(function(){

//   $(".fade-in-text").each(function(index){

//       $(this).css("opacity","0")

//       .delay(index*600)

//       .animate({
//           opacity: 1,
//           marginLeft: "50px"
//       }, 1000);
//   })
// });

// $(document).ready(function(){

//   $(".fade-in-img").each(function(index){

//       $(this).css("opacity","0")

//       .delay(index*600)

//       .animate({
//           opacity: 1,
//           marginLeft: "0px"
//       }, 1000);
//   })
// });

// const productBoxs = document.querySelectorAll('.prodcut-box');

// const observer = new IntersectionObserver((entries,observer) => {
//   entries.forEach(entry => {
//       console.log("Observed:", entry);
//       if(entry.isIntersecting) {
//           entry.target.classList.add('fade-in');
//           observer.unobserve(entry.target);
//       }
//   });
// },{
//   threshold:0.2,

// });

// productBoxs.forEach(box => {
//   observer.observe(box);
// })

// // Cart Open CLose
// let cartIcon = document.querySelector("#cart-icon");
// let cart = document.querySelector(".cart");
// let closeCart = document.querySelector("#close-cart");
// // Open Cart
// cartIcon.onclick = () => {
// cart.classList.add("active");
// };
// // Close Cart
// closeCart.onclick = () => {
// cart.classList.remove("active");
// };
// // Adding to cart
// // Cart Using JS
// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", ready);
// } else {
//   ready();
// }

//   // Loads In Cart
// function loadCartItems() { 
//   var cartItems= localStorage.getItem('cartItems');
//   if(cartItems){
//       cartItems=JSON.parse(cartItems);

//       for(var i =0; i< cartItems.length;i++){
//           var item = cartItems[i];
//           addProductToCart(item.title , item.price, item.productImg);

//           var cartBoxes = document.getElementsByClassName('cart-box');
//           var cartBox = cartBoxes[cartBoxes.length-1];
//           var quantityElement = cartBox.getElementsByClassName('cart-quantity');
//           quantityElement.value = item.quantity;
//       }
//   }
//   var cartTotal = localStorage.getItem('cartTotal');
//   if(cartTotal){
//       document.getElementsByClassName('total-price')[0].innerText="$"+cartTotal;
//   }

// }

//   // Remove Cart Item
//   function removeCartItem(event) {
//     var buttonClicked = event.target;
//     buttonClicked.parentElement.remove();
//     updatePrice();
//     saveCartItems();
//   }
  
//   // Quantit Changes
//   function quantitChanges(event) {
//     var input = event.target;
//     if (isNaN(input.value) || input.value <= 0) {
//       input.value = 1;
//     }
//     updatePrice();
//     saveCartItems();
    
//   }
//   function ready() {
//     // Remove Item From Cart
//     var removeCartButtons = document.getElementsByClassName("cart-remove");
//     for (var i = 0; i < removeCartButtons.length; i++) {
//       var button = removeCartButtons[i];
//       button.addEventListener("click", removeCartItem);
//     }
  
//     // Quantity change
//     var quantitInputs = document.getElementsByClassName("cart-quantity");
//     for (var i = 0; i < quantitInputs.length; i++) {
//       var input = quantitInputs[i];
//       input.addEventListener("change", quantitChanges);
//     }
  
//     // Add to cart
//     var addCart = document.addEventListener("click",function(event) {
//       if(event.target && event.target.classList.contains("add-cart")){
//         addCartClicked(event);
//       }
//     })
//     // for (var i = 0; i < addCart.length; i++) {
//     //   var button = addCart[i];
//     //   button.addEventListener("click", addCartClicked);
//     // }
//     loadCartItems();
//   }
//   // Add Cart Function
//   function addCartClicked(event) {
//     var button = event.target;
//     var shopProducts = button.parentElement;
//     var title =
//       shopProducts.getElementsByClassName("products-title")[0];
//     var price = shopProducts.getElementsByClassName("price")[0];
//     var productImg = shopProducts.getElementsByClassName("product-img")[0];
  
    
//     addProductToCart(title, price, productImg);
//     updatePrice();
    
    
//   }
  
//   function addProductToCart(title, price, productImg) {
//     var cartShopBox = document.createElement("div");
//     cartShopBox.classList.add("cart-box");
//     var cartItems = document.getElementsByClassName("cart-content")[0];
//     var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
//     for (var i = 0; i < cartItemsNames.length; i++) {
//       if (cartItemsNames[i].innerText == title) {
//         alert("you have already added this item to the cart");
//       return;
//       }
//     }
//     var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
//                           <div class="detail-box">
//                               <div class="cart-product-title">${title}</div>
//                               <div class="cart-price">${price}</div>
//                               <input type="number" name="" id="" value="1" class="cart-quantity">
//                           </div>
//                           <!-- Remove Item -->
//                           <i class='bx bx-trash-alt cart-remove'></i>`;
//     cartShopBox.innerHTML = cartBoxContent;
//     cartItems.append(cartShopBox);
//     cartShopBox
//       .getElementsByClassName("cart-remove")[0]
//       .addEventListener("click", removeCartItem);
//     cartShopBox
//       .getElementsByClassName("cart-quantity")[0]
//       .addEventListener("change", quantitChanges);
//       saveCartItems();
//       updatePrice();
//   }

//   // Update Price
// function updatePrice() {
//   var cartContent = document.getElementsByClassName("cart-content")[0];
//   var cartBoxes = cartContent.getElementsByClassName("cart-box");
//   var total = 0;
//   for (var i = 0; i < cartBoxes.length; i++) {
//     var cartBox = cartBoxes[i];
//     var priceElement = cartBox.getElementsByClassName("cart-price")[0];
//     var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
//     var price = parseFloat(priceElement.innerText.replace("$", ""));
//     var quantity = quantityElement.value;
//     total += price * quantity;
//   }
//   total = Math.round(total * 100) / 100;
//   document.getElementsByClassName("total-price")[0].innerText = "$" + total;
//   // Save Total to localStorage
//   localStorage.setItem("cartTotal", total);
// }
  