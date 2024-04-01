const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express()

const port = 6000;

app.use(express.json());


app.get('/', (req,res) => {
    res.send('node server')
})


app.get('/api/products', async (req,res) => {
    
    try {
        const product = await Product.find({})
        res.status(200).json(product)

    } catch (error) {
        
        res.status(500).json({message: error.message})
    }
})


app.get('/api/product/:id', async (req,res) => {

    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})


app.post('/api/products', async (req,res) => {
    
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/api/products/:id', async (req,res) => {
    try {

        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body);


        if(!product){
            return res.status(404).json({ message: 'Product Not Found'})
        }

        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct)
        
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})


mongoose.connect('mongodb+srv://praveenkarunanithi:f6GCgehncfQK3nMK@finalcrud.zxta9z9.mongodb.net/Node-API?retryWrites=true&w=majority&appName=finalcrud')
.then(()=>{

    console.log('Connected to Database')

    app.listen(port, ()=> {
        console.log(`Server is Connected on Port: ${port} `)
    })
})
.catch(()=> {
    console.log('Connection Failed!')
})