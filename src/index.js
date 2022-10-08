const express = require("express");
// const mongoose = require('mongoose');
const redis = require('redis');
const { Client }= require('pg');

//init app
const PORT=process.env.PORT|| 4000;
const app=express();

//connect redis
const REDIS_PORT=6379;
const REDIS_HOST='redis';
const client = redis.createClient({
    url:`redis://${REDIS_HOST}:${REDIS_PORT}`
});

client.on('error', err => {
    console.log('Redis Error ' + err);
});
client.on('connect', () => {
    console.log('Connected to redis ');
});
client.connect();


//connect to db
// const DB_USER= 'root';
// const DB_PASSWORD='example';
// const DB_PORT= 27017;
// const DB_HOST='mongo';
// const URI=`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
// .connect(URI)
// .then(()=>console.log('connected to mongo successfully'))
// .catch((err)=>console.log('failed to connect mongo',err));


//connect db postgress
const DB_USER= 'root';
const DB_PASSWORD='example';
const DB_PORT= 5423;
const DB_HOST='postgres';
const URI=`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const postgresClient=new Client({
    connectionString: URI
});
postgresClient
.connect()
.then(()=>console.log('connected to postgres successfully'))
.catch((err)=>console.log('failed to connect postgres',err));




app.get('/',(req, res)=> 
{
    client.set('products',"products...");
    res.send('<h1>Hellow Reham !</h1>');
});

app.get('/data',async(req, res)=> 
{
    const products=await client.get('products');
    res.send(`<h1>PRODUCTS: ${products} !</h1>`);
});

app.listen(PORT,()=> console.log(`app is up and running on port ${PORT}`));
