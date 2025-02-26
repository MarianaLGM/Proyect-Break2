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
    _id: {
        type: new mongoose.Schema.Types.ObjectId, 
        required: true
    },
    Nombre: {
        type: String,
        required: true

    },
    Descripción: {
        type: String,
        required: true
    },
    Imagen:{
        type: String,
        required: true
    },
    Categoría:{
        type: String,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
        required: true
    },
    Talla: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        required: true
    },
    Precio: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;