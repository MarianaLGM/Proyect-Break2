//./routes/productRoutes
const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");


//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get("/products", async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: 'Error getting all products'})
    }
});


//GET /products/:productId: Devuelve el detalle de un producto.
router.get("/products/:productId", async(req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: `There was a problem with the productId number: ${req.params.productId}` });
    }
});

/*GET /dashboard: Devuelve el dashboard del administrador. 
En el dashboard aparecerán todos los artículos que se hayan subido. 
Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.*/

router.get("/dashboard", async(req, res) => {
    res.send("Administrator dashboard");
});

//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.get("/dashboard/new", async(req, res) => {
    res.send("Form to add a new article");
});

//POST /dashboard: Crea un nuevo producto.
router.post("/dashboard", async(req, res) => {
    try {
        const product = await Product.create({...req.body});
        res
        .status(201)
        .json({ message: "Product successfully created", product });

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to create a product" });
    }
});

//GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId", async(req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: `There was a problem with the productId number: ${req.params.productId}` });
    }
});


//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.///DUDA///
router.get("/dashboard/:productId/edit", async(req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: `There was a problem with the productId number: ${req.params.productId}` });
    }
});

//PUT /dashboard/:productId: Actualiza un producto.
//UPDATE TASK

router.put("/dashboard/:productId", async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.productId, 
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product successfully updated", product });

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({
            message: `There was a problem trying to update a product with productId: ${req.params.productId}`
        })
    }
});

//DELETE /dashboard/:productId/delete: Elimina un producto.
router.delete("/dashboard/:productId/delete", async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params._id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "product deleted", task });

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to delete a product" });
    }
});

module.exports = router;