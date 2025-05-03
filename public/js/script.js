

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
// // observer.observe(smallParag);
// observer.observe(phonePic2);
// observer.observe(slogan);
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
