const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const Booking = require("./models/professional.js")
const port = 8080;
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');



const MONOGO_URL = "mongodb://127.0.0.1:27017/home-fix";

main()
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log(err);
    });


async function main() {
    await mongoose.connect(MONOGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate); //this line is used to set ejs-mate as the template engine for ejs files
app.use(express.static(path.join(__dirname, 'public'))); //to serve static files like css,js,images from the public folder


app.get("/",(req,res)=>{
    res.render("pages/index.ejs");
})
app.get("/search", async (req,res)=>{
    const professionals = await Booking.find({});
    res.render("pages/search.ejs",{professionals});
});
app.post("/search", async (req,res)=>{
    const {query } = req.body;
    const professionals = await Booking.find({ profession: { $regex: query, $options: 'i' } });
    res.render("pages/search.ejs",{professionals});
});
app.get("/search/:id", async (req,res)=>{
    const {id} = req.params;
    const professional = await Booking.findById(id);
    res.render("pages/professional.ejs",{professional});
});
app.get("/contactUs",(req,res)=>{
    res.render("pages/contact.ejs")
})

app.listen(port, () => {
    console.log(`Listeining to port : ${port}`);
});
