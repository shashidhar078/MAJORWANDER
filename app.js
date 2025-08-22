const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");
const path=require('path');

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then((res)=>{
    console.log("Connected to Db");
}).catch((err)=>{
    console.log(err);
})


async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello im groot!!");
})

// Index Route implemented
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
})

//show route implemented 
// to represent price in indian rupess we use toLocaleString
app.get("/listings/:id",async (req,res)=>{
    const {id} = req.params;
    const showListings=await Listing.findById(id)
    res.render("./listings/show.ejs",{showListings});
})

// app.get("/testListing",async (req,res)=>{
//     const newlisting=new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"calangute , Goa",
//         country:"India"
//     });

//     await newlisting.save().then((res)=>{
//         console.log(res);
//     }).catch((err)=>{
//         console.log(err);
//     });
//     console.log("Sample was saved");
//     res.send("Sample saved successfully");
// })

app.listen(8080,()=>{
    console.log("app is listening to 8080");
})