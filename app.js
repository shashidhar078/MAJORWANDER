const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");
const path=require('path');
const methodOverride=require('method-override');
const ejsmate=require('ejs-mate');

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
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);

app.get("/",(req,res)=>{
    res.send("Hello im groot!!");
})

// Index Route implemented
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
})

//create and new route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
})

app.post("/listings",async (req,res)=>{
    //let {title,description,image,price,location,country} = req.body
    //previouslt we use to do like this 
    //now we are using more compact form using object check for form we will understand
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//show route implemented 
// to represent price in indian rupess we use toLocaleString
app.get("/listings/:id",async (req,res)=>{
    const {id} = req.params;
    const showListings=await Listing.findById(id)
    res.render("./listings/show.ejs",{showListings});
})


//update route
app.get("/listings/:id/edit",async (req,res)=>{
     const {id} = req.params;
    const showListings=await Listing.findById(id);
    res.render("./listings/edit.ejs",{showListings});
})

app.put("/listings/:id",async (req,res)=>{
     const {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
})

app.delete("/listings/:id",async (req,res)=>{
    const {id} = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings");
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