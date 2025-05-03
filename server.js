const express = require('express');
const dotenv = require('dotenv');
const stripe = require('stripe');


// Load Variables
dotenv.config();



// Start Sever
const app = express();

app.use(express.static('public'));
app.use(express.json());


// Home Route
app.get('/',(req,res)=>{
    res.sendFile("Home.html",{root:"public"})
});


// Success
app.get('/success',(req,res)=>{
    res.sendFile("success.html",{root:"public"})
});
// Cancel
app.get('/cancel',(req,res)=>{
    res.sendFile("cancel.html",{root:"public"})
});

// Stripe
let stripeGateway =  stripe(process.env.stripe_api);
let DOMAIN = process.env.DOMAIN;
app.post('/stripe-checkout',async (req,res)=>{
    const lineItems = req.body.items.map((item)=>{
        const unitAmount = Math.round(parseFloat(item.price.replace(/[^0-9.]+/g, '')) * 100);
        console.log('item-price: '+item.price);
        console.log('unitAmount:'+unitAmount);
        return{
            price_data : {
                currency:'usd',
                product_data:{
                    name:item.title,
                    images:[item.productImg]
                },
                unit_amount:unitAmount
            },
            quantity:item.quantity
        };
    });
    console.log('lineItems:', JSON.stringify(lineItems, null, 2));


    // Creat Cheokout Session
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types :['card'],
        mode:'payment',
        success_url:`${DOMAIN}/success`,
        cancel_url:`${DOMAIN}/cancel`,
        line_items:lineItems,
        // Asking Addres in Stripe Checkout
        billing_address_collection:'required',
        
        
    })
    res.json({url:session.url});
    
})
app.listen(3000 , ()=> {
    console.log("Listeneing on port 3000");
}) 