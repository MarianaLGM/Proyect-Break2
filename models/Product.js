//.models/Product
/* Vamos a crear el modelo de producto. El modelo de producto tendrá los siguientes campos:

Nombre
Descripción
Imagen
Categoría
Talla
Precio
La categoría será un string que podrá ser "Camisetas", "Pantalones", "Zapatos", "Accesorios".

La talla será un string que podrá ser "XS", "S", "M", "L", "XL". */
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Nombre: String,
    Descripción: String,
    Imagen: String, //Ver esto
    Categoría: String
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;