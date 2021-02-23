//import e from "express";
import express from 'express';
import mongoose from 'mongoose';
//import data from "./data.js";
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import Cors from 'cors';



const connection_url = 'mongodb+srv://admin:uYzCZHgWQxrGlGZI@cluster0.0adni.mongodb.net/cartdb?retryWrites=true&w=majority';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Cors());

mongoose.connect(connection_url,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
});

app.use('/api/users',userRouter);
app.use('/api/products',productRouter);


/*
app.get('/api/products',(req,res) => {
    //res.send('server is ready');
    res.status(200).send(data.products);
});

app.get('/api/products/:id',(req,res) => {
  //res.send('server is ready');
  //res.status(200).send(data.products);
  const product = data.products.find(x => x._id === req.params.id);
  if(product){
    res.status(200).send(product);
  }
  else{
    res.status(404).send({message: 'Product not found'});
  }   
});
*/

app.get('/',(req,res) => {
    //res.send('server is ready');
    res.status(200).send('server is ready');
});

app.use((err,req,res,next) => {
  res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
