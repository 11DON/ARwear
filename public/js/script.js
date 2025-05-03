

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
const productBoxs = document.querySelectorAll('.prodcut-box'); // Fixed the typo

// Create an intersection observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        console.log("Observed:", entry);
        if(entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Check if we're on the correct page
if (
    window.location.href === "http://localhost:3000/index.html" ||
    window.location.href === "http://localhost:3000/"
) {
    // Apply the observer to elements only if they exist
    if (smallParag) observer.observe(smallParag);
    if (phonePic2) observer.observe(phonePic2);
    if (slogan) observer.observe(slogan);

    productBoxs.forEach(box => {
        if (box) observer.observe(box);
    });
} else {
    console.log("Observer not applied: elements are not available on this page.");
}

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
//  Clear Cart After Successful Payment

function clearCart(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    cartContent.innerHTML='';
    updatePrice();
    localStorage.removeItem("cartItems");
  }