require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require("../models/professional.js");

const MONOGO_URL = process.env.ATLASDB_URL; // Use the URL from the .env file

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
