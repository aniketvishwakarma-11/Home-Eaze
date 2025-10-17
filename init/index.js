const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require("../models/professional.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/home-fix";
const MONOGO_URL = "mongodb+srv://aniketvis675_db_user:helloAniket@cluster0.0gqhff9.mongodb.net/home-eaze?retryWrites=true&w=majority&appName=Cluster0";

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

const initDB = async () => {
    await Listing.deleteMany({}); //we will first delete all existing listings
    await Listing.insertMany(initData.data); //the initData.data is an array of objects
    console.log("Database initialized with sample data");
}  

initDB();
