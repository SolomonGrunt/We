const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const express = require("express");
const app = express();
const port = 1000;
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Abs:Admin@cluster0.5swzs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(express.static('public'))
app.set('views engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use("/css", express.static(__dirname + 'public/css'))
app.use("/js", express.static(__dirname + 'public/js'))
app.use("/png", express.static(__dirname + 'public/img'))
const {json} = require("express");
const bodyparser = require("express");
const stripe = require('stripe')('sk_test_51LTCmkA6hkZ7OMJv5C2LuZ5QyPyXAMuzarLZnLoOq43SRNjcLZgVtcl1v52QS8TLRRuQAwXyEEUOPeZIrCY3pWDO00ZYigsDXS');

var publishkey ="pk_test_51LTCmkA6hkZ7OMJvDkBid6cLOhEClKsDJRlSKaqsQHyenM7fMUq7DECxQVWiXZnerfWzrLACH3pEmHGYd1nU2Uj300qlWpJCb7"
var secretkey ="pk_test_51LTCmkA6hkZ7OMJvDkBid6cLOhEClKsDJRlSKaqsQHyenM7fMUq7DECxQVWiXZnerfWzrLACH3pEmHGYd1nU2Uj300qlWpJCb7"
app.use(bodyparser.urlencoded({extended:false}))
app.use(json())
const start = async() =>{
    try{
        await client.connect()
        console.log('connected')
    }
    catch (e) {
        console.log(e)
    }
}
start()

app.get('/donations.html', function(req, res){
    res.render('donations.html', {
        key: "pk_test_51LTCmkA6hkZ7OMJvDkBid6cLOhEClKsDJRlSKaqsQHyenM7fMUq7DECxQVWiXZnerfWzrLACH3pEmHGYd1nU2Uj300qlWpJCb7",
    })
})

app.post('/payment', function(req, res){

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Abishev Amirhan',
        address: {
            line1: '2',
            postal_code: '222222',
            city: 'Michigan',
            state: 'Michigan',
            country: 'USA',
        }
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: 2500,     // Charing Rs 25
                description: 'Web Development Product',
                currency: 'USD',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.send("Success")  // If no error occurs
        })
        .catch((err) => {
            res.send(err)       // If some error occurs
        });
})

app.get('/', (req, res) =>
{ res.render("index.html");
});
app.get('/basket.html', (req, res) =>
{ res.render("basket.html");
});
app.get('/product.html', (req, res) =>
{ res.render("product.html");
});
app.get('/index.html', (req, res) =>
{ res.render("index.html");
});
app.get('/registr.html', (req, res) =>
{ res.render("registr.html");
});
app.get('/search.html', (req, res) =>
{ res.render("search.html");
});
app.listen(1000)