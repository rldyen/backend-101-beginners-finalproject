const mongoose = require('mongoose');
const User = require('./models/user');
const Listing = require('./models/listing');
const userData = require('./data/user.json');
const listingData = require('./data/listings.json');

mongoose.connect('mongodb://localhost:27017/kapeKo')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err =>{
        console.log("Error!");
        console.log(err);
    })

User.insertMany(userData)
    .then(p =>{
        console.log(p);
    })
    .catch(e =>{
        console.log(e);
    })

Listing.insertMany(listingData)
    .then(p =>{
        console.log(p);
    })
    .catch(e =>{
        console.log(e);
    })
