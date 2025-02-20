//Crear un Servidor Express

const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');// configura el servidor para que sirva archivos estáticos

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential : admin.credential.cert(serviceAccount),
    });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', productRoutes);
app.use('/', authRoutes);


dbConnection();

app.listen(process.env.PORT, () => console.log(`Server listening on http://localhost:${process.env.PORT}`));


