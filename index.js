//Crear un Servidor Express
const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const routes = require('./routes/productRoutes');
require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes)

dbConnection();

app.listen(process.env.PORT, () => console.log(`Server listening on http://localhost:${process.env.PORT}`));

