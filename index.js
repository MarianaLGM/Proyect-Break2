//Crear un Servidor Express

const express = require('express');
const app = express();
const methodOverride = require('method-override');//methodOverride nos permite hacer solicitudes put y delete 
const dbConnection = require('./config/db');
const routes = require('./routes/productRoutes');
require('dotenv').config();
const path = require('path');// configura el servidor para que sirva archivos estáticos


app.use(methodOverride('_method'));//methodOverride nos permite hacer solicitudes put y delete 

app.use(express.static(path.join(__dirname, 'public')));// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

dbConnection();

app.listen(process.env.PORT, () => console.log(`Server listening on http://localhost:${process.env.PORT}`));



