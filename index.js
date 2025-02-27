//Crear un Servidor Express

const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const methodOverride = require('method-override');//methodOverride nos permite hacer solicitudes put y delete 
const dbConnection = require('./config/db');
const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');// configura el servidor para que sirva archivos estáticos

app.use(express.static(path.join(__dirname, 'public')));// Sirve archivos estáticos desde la carpeta 'public'
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential : admin.credential.cert(serviceAccount),
    });
}

app.use(methodOverride('_method'));//methodOverride nos permite hacer solicitudes put y delete 


const swaggerUI = require('swagger-ui-express') //SWAGGER
const docs = require('./docs/index')//SWAGGER
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs))//SWAGGER


app.use(express.urlencoded({ extended: true }));////REQUERIR Y ACCEDER URLENCODED Y JSON:  Middleware para manejar datos de formulario y JSON
app.use(express.json());
app.use(cookieParser())

app.use('/', authRoutes);
app.use('/', productRoutes);


app.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    return next(error)
}) 

dbConnection();

app.listen(process.env.PORT, () => console.log(`Server listening on http://localhost:${process.env.PORT}/products`));


module.exports = app;
