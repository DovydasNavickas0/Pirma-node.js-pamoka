//const message = require('./modules/message')
//console.log("Mano pirmas NODEjs projektas." + message);

//naujas serveris
const express = require('express');
const app = express();

//duomenys bus gaunami, perduodami jsdn formatu.
app.use(express.json())

const products = [
    {id: 1, title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"},
    {id: 2, title: "Mens Casual Premium Slim Fit T-Shirts"},
    {id: 3, title: "Mens Cotton Jacket"},
]

//svarbu 1. sukurti route (visi produktai)
//turi pasirinkti GET per postman
app.get('/api/products', (req, res) => {
    res.send(products);
})

//konkreti paieska (viena pasirinkta grazina).
//req yra ID.
//res aprasome patys.
//turi pasirinkti GET per postman
app.get('/api/products/:id', (req, res) => {
    const my_product = products.find(product => product.id === parseInt(req.params.id));
    if(!my_product) res.status(404).send('not found');
    res.send(my_product);
});

// leidzia prideti nauja preke.
// neturi jokiu patikrinimu. Reiketu ideti jas pats.
// turi pasirinkti POST per postman
app.post('/api/products', (req, res) => {
    const product = {
        id: products.length +1,
        title: req.body.title
    };

    products.push(product)
    res.send(products)
})

// esamos prekes info atnaujinimas
//  pasirinkti PUT
app.put('/api/products/:id', (req, res)=>{
    const my_product = products.find(product => product.id === parseInt(req.params.id));
    if(!my_product) res.status(404).send('not found');

    my_product.title = req.body.title;
    res.send(my_product)
})

// easamos prekes trynimas
// naudoti DELETE
app.delete('/api/products/:id', (req, res)=>{
    const my_product = products.find(product => product.id === parseInt(req.params.id));
    if(!my_product) res.status(404).send("not found");

    const product_index = products.indexOf(my_product);
    products.splice(product_index, 1);

    res.send(my_product);
});

// apsirasome port'a ant kurio veiks serveris
const PORT = 5001;

//2. tik tada kai sukurtas, egzistuojaroute, startuoti serveri
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});


