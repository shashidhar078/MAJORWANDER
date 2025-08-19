const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then((res)=>{
    console.log("Connected to Db");
}).catch((err)=>{
    console.log(err);
})


async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Hello im groot!!");
})

app.get("/testListing",async (req,res)=>{
    const newlisting=new Listing({
        title:"My new Villa",
        description:"By the beach",
        price:1200,
        location:"calangute , Goa",
        country:"India"
    });

    await newlisting.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
    console.log("Sample was saved");
    res.send("Sample saved successfully");
})

app.listen(8080,()=>{
    console.log("app is listening to 8080");
})