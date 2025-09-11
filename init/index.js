const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require("../models/professional.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/home-fix";

main()
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log(err);
    });


async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({}); //we will first delete all existing listings
    await Listing.insertMany(initData.data); //the initData.data is an array of objects
    console.log("Database initialized with sample data");
}  

initDB();
