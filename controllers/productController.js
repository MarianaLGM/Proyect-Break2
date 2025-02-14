
const Product = require("../models/Product.js");

//showProducts: Devuelve la vista con todos los productos.
//GET /products: Devuelve todos los productos.
const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productCards = getProductCards(products);
        const html = baseHtml + getNavBar() + productCards;
        res.send(html);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: 'Error getting all products'})
    }
};


//showProductById: Devuelve la vista con el detalle de un producto.
//GET /products/:productId: Devuelve el detalle de un producto.
const showProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        const productCards = getProductCards(product);
        const html = baseHtml + getNavBar() + productCards;
        res.send(html);
    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: 'Error getting the product'})
    }
};

//showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
const showNewProduct = async (req, res) => {

    try{         
        const html = baseHtml() + getNavBar() + form();
        
        res.status(200).send(html);

    }  catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem getting the form" });
    }
};

//createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
//POST /dashboard: Crea un nuevo producto.
const createProduct = async (req, res) => {    
    try {
        const product = await Product.create({...req.body});
        
        const productCards = getProductCards(product);
        const html = baseHtml + getNavBar() + productCards;
        res
        .status(201)
        .send(html);

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to create a product" });
    }
};


//showEditProduct: Devuelve la vista con el formulario para editar un producto.
//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.










//updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
//PUT /dashboard/:productId: Actualiza un producto.

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.productId, 
            req.body,
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
};

//deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.
//DELETE /dashboard/:productId/delete: Elimina un producto.

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const productCards = getProductCards(product);
        const html = baseHtml + getNavBar() + productCards;

        res.json({ message: "product deleted", product });

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to delete a product" });
    }
};
////////////////////////////////Funciones auxiliares para generar el HTML/////////////////////////////////////////

//getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.
function getProductCards(products) {
    let html = '';
    for (let product of products) {
    html += `
        <div class="product-card">
        <img src="${product.imagen}" alt="${product.nombre}">
        <h2>${product.nombre}</h2>
        <p>${product.descripcion}</p>
        <p>${product.precio}€</p>
        <a href="/products/${product._id}">Ver detalle</a>
        <a href="/products/${product._id}/edit">Editar</a>
        <a href="/products/${product._id}/delete">Eliminar</a>
        </div>
    `;
    }
    return html;
}

//baseHtml: html común a todas las páginas. Puede contener elementos como la importación de estilos, etc.
const baseHtml = () => {
    return `
    <!DOCTYPE html>
    <html lang="es">
        <head>
        <meta charset="UTF-8">
        <title>Tienda de ropa online</title>
        <link rel="stylesheet" href="./public/styles.css">
        </head>
    `;
};

//getNavBar: Genera la barra de navegación con las categorías. También generará un enlace para subir un nuevo producto.
function getNavBar() { 
    return `
    <header class="header"> 
    <nav>
        <div class="container">
            <ul class="nav1"> 
                <li><a href="#"class="navigation">Productos</a></li>
                <li><a href="#"class="navigation">Camisetas</a></li>
                <li><a href="#"class="navigation">Pantalones</a></li>
                <li><a href="#"class="navigation">Zapatos</a></li>
                <li><a href="#"class="navigation">Accesorios</a></li>
                <li><a href="#"class="navigation">Login</a></li>
            </ul>
        </div>
    </nav>
    </header>
    `;
    }

    const form = () => {
        return `
        <body>
            <form action='/dashboard'>

                    <label for="productImg">Select files:</label>
                    <input type="file" id="productImg" name="productImg" required>
                    
                    <label for='productName'>Nombre del producto: </label>
                    <input id='productName' type='text' name='productName' required>
                    
                    <label for='productDescription'>Descripción del producto: </label>
                    <input id='productDescription' type='text' name='productDescription' required>
                    
                    <label for='productCategory'>Categoría del producto: </label>
                    <select id="productCategory" name="productCategory" required>
                        <option value="camisetas">Camisetas</option>
                        <option value="pantalones">Pantalones</option>
                        <option value="zapatos">Zapatos</option>
                        <option value="accesorios">Accesorios</option>
                    </select>
                    
                    <label for='productSize'>Talla del producto: </label>
                    <select id="productSize" name="productSize" required>
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                    </select>

                    <label for='productPrice'>Precio del producto: </label>
                    <input id='productPrice' type='number' name='productPrice' min='0' required>

                    <button id=newProductBtn type='submit'>Enviar</button>

                </form>
            </body>
        `;
    };
module.exports = { 
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct,
    getProductCards,
    baseHtml, 
    getNavBar, 
    showProducts
};





/*

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

//GET /dashboard: Devuelve el dashboard del administrador. 
//En el dashboard aparecerán todos los artículos que se hayan subido. 
//Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.

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
        res.json({ message: "product deleted", product });

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to delete a product" });
    }
});

