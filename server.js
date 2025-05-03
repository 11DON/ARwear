const express = require('express');
const app =  express();
const path = require('path')
app.use(
    express.static(__dirname+'/public')
)
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/public/suits.html")
})

app.listen(3000,() => {
    console.log("app listening on port 3000");
    
});