const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
 const ejs = require('ejs');
const port = 8000;
// const port = process.env.port;

// const db = require('./config/mongoose');
const db = 'mongodb+srv://amandayal:amandayal2023@cluster0.vb8rsdk.mongodb.net/mernstack?retryWrites=true&w=majority';

mongoose.connect(db).then(()=>{
    console.log('connection successful');
}).catch((err)=> console.log('no connection'));

const Notice = require('./models/notice');
const Download = require('./models/download');
const Inspiration = require('./models/inspiration');


const app = express();


// To tell express that we are using ejs template engine

app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// This is the middleware used to decode the url data
// app.use(express.urlencoded());

// we are creating a middleware to access static files and storing the static files in folder assets
app.use(express.static('assets'));

// This is the middleware used to decode the url data
app.use(express.urlencoded());

// Admin login details
var adminLoginDetails =
{
    email: "aman@gmail.com",
    password: "8789911746"
};




app.get('/', function (req, res) {
    Download.find({}, function (err, docs1) {
        if (err) res.json(err);
        else Notice.find({}, function (err, docs) {
            if (err) res.json(err);
            else Inspiration.find({}, function(err, docs2){
                if (err) res.json(err);
                else res.render('home', { notices: docs, downloads: docs1, inspiration: docs2 });
            })
        });
    });
});
app.get('/aboutUs', function (req, res) {

    Download.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('aboutUs', { downloads: docs });
    });
});
app.get('/committee', function (req, res) {

    Download.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('committee', { downloads: docs });
    });
});
app.get('/speakers', function (req, res) {

    Download.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('speakers', { downloads: docs });
    });
});
app.get('/guidelines', function (req, res) {

    Download.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('guidelines', { downloads: docs });
    });
});
app.get('/registration', function (req, res) {

    Download.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('registration', { downloads: docs });
    });
});
app.get('/gallery', function (req, res) {

    Download.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('gallery', { downloads: docs });
    });
});
app.get('/contactUs', function (req, res) {

    Download.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('contactUs', { downloads: docs });
    });
});
app.get('/callforPaper', function (req, res) {

    Download.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('callforPaper', { downloads: docs });
    });
});
app.get('/login', function (req, res) {

    return res.render('login');
});


app.post('/login', function (req, res) {

    if (req.body.email == adminLoginDetails.email && req.body.password == adminLoginDetails.password) {

        return res.redirect('/homeAdmin');
    }
});


app.post('/homeAdmin', function (req, res) {

    var myData = new Notice({
        notice: req.body.notice,
        link:req.body.link
    });

    myData.save().then(() => {

        res.redirect('homeAdmin');

    }).catch(() => {
        res.status(400).send('There is a problem during data submission');
    });
});

app.get('/homeAdmin', function (req, res) {

    Notice.find({}, function (err, docs) {
        
        if (err) res.json(err);
        else res.render('homeAdmin', { notices: docs });
    });
    // const docs = Notice.find({});
    // // console.log(docs);
    // res.render('homeAdmin',{posts:docs.notice});

});

app.post('/homeAdminDownload', function (req, res) {

    var myData = new Download({
        download: req.body.download,
        link:req.body.link
    });

    myData.save().then(() => {

        res.redirect('homeAdminDownload');

    }).catch(() => {
        res.status(400).send('There is a problem during data submission');
    });
});

app.get('/homeAdminDownload', function (req, res) {

    Download.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('homeAdminDownload', { downloads: docs });
    });
});


app.get('/homeAdminInspiration', function (req, res) {

    Inspiration.find({}, function (err, docs) {
        if (err) res.json(err);
        else res.render('homeAdminInspiration', { inspirations: docs });
    });

});

app.post('/homeAdminInspiration', function (req, res) {

    var myData = new Inspiration({
        inspiration: req.body.inspiration
    });

    myData.save().then(() => {

        res.redirect('homeAdminInspiration');

    }).catch(() => {
        res.status(400).send('There is a problem during data submission');
    });
});

app.get('/delete-dwnld', function(req, res){
    
    let id = req.query.id;

    // find the contact in the database using id amd delete
    Download.findByIdAndDelete(id, function(err){
        if(err){ console.log('error in deleting contact from database'); return; }
    })
    return res.redirect('back');

});
app.get('/delete-notice', function(req, res){
    
    let id = req.query.id;

    // find the contact in the database using id amd delete
    Notice.findByIdAndDelete(id, function(err){
        if(err){ console.log('error in deleting contact from database'); return; }
    })
    return res.redirect('back');

});
app.get('/delete-inspiration', function(req, res){
    
    let id = req.query.id;

    // find the contact in the database using id amd delete
    Inspiration.findByIdAndDelete(id, function(err){
        if(err){ console.log('error in deleting contact from database'); return; }
    })
    return res.redirect('back');

});




app.listen(port, function (err) {
    if (err) { console.log('Error ', err); }

    console.log('Express server is up and running');
})