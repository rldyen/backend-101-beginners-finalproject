const express = require('express');
const path = require('path');
const PORT = 3000;
const mongoose = require('mongoose');
const Listing = require ("./models/listing");
const User = require ("./models/user");
const methodOverride = require('method-override');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/kapeKo')
.then(() => {
    console.log("Connection Open");
})
.catch(err =>{
    console.log("Error!");
    console.log(err);
});

//Form to Add Cafe
app.get('/cafe/add', (req, res) => {
    res.render('cafe/add');
});

//Insert a New Cafe
app.post('/cafe', async (req, res) =>{
    const newCafe = new Listing(req.body);
    await newCafe.save();
    console.log(newCafe);
    res.redirect(`/cafe/${newCafe._id}`);
});

//Form to update a Cafe
app.get('/cafe/:id/updateCafe', async (req, res) => {
    const { id } = req.params;
    const cafe = await Listing.findById(id);
    res.render('cafe/edit', { cafe });
});

//Update a Cafe
app.put('/cafe/:id', async (req, res) =>{
    const { id } = req.params;
    const cafe = await Listing.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/cafe/${cafe._id}`);
});

//Delete a Cafe
app.delete('/cafe/:id', async (req, res) =>{
    const { id } = req.params;
    const deleteCafe = await Listing.findByIdAndDelete(id);
    res.redirect('/home')
})

//View Specific Cafe
app.get('/cafe/:id', async (req, res) => {
    const { id } = req.params;
    const cafe = await Listing.findById(id);
    res.render("cafe/cafe", { cafe });
});

//Show all Cafe to home
app.get('/home', async (req,res) => {
    const listings = await Listing.find({});
    res.render('cafe/home', { listings });
})

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.use((req, res) => {
    res.status(404).render("error");
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
    console.log(`Access using http://localhost:${PORT}/home`);
});