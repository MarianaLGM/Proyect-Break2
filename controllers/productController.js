
const Product = require("../models/Product.js");

////////////////////////////////Funciones para generar el HTML/////////////////////////////////////////

// VISTA DASHBOARD getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.
function getProductCardsDashboard(products) {
    let html = '';

    if(products.length > 0) { 
        for (let product of products) {
            html += `
                <div class="product-card">
                    <img class="productImagen"src="${product.Imagen}" alt="${product.Nombre}">
                    <h2 class="productNombre">${product.Nombre}</h2>
                    <p class="productDescripcion">${product.Descripción}</p>
                    <p class="productPrecio">${product.Precio}€</p>

                    <a href="/dashboard/${product._id}">Ver detalle</a>
                    <a href="/dashboard/${product._id}/edit">Editar</a>
                    <a href="/dashboard/${product._id}/delete">Eliminar</a>
                </div>`
        }

        return html;
    } else {
        html = `
            <div class="product-card">
                    <img class="productImagen"src="${products.Imagen}" alt="${products.Nombre}">
                    <h2 class="productNombre">${products.Nombre}</h2>
                    <p class="productDescripcion">${products.Descripción}</p>
                    <p class="productPrecio">${products.Precio}€</p>

                    <a href="/dashboard/${products._id}">Ver detalle</a>
                    <a href="/dashboard/${products._id}/edit">Editar</a>
                    <a href="/dashboard/${products._id}/delete">Eliminar</a>
                </div>
        `;
        
        return html;
    }
}

//VISTA GENERAL getProductCardsClient Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos
function getProductCards(products) {
    let html = '';

    if(products.length > 0) { 
        for (let product of products) {
            html += `
                <div class="product-card">
                    <img class="productImagen"src="${product.Imagen}" alt="${product.Nombre}">
                    <h2 class="productNombre">${product.Nombre}</h2>
                    <p class="productDescripcion">${product.Descripción}</p>
                    <p class="productPrecio">${product.Precio}€</p>

                    <a href="/products/${product._id}">Ver detalle</a>
                </div>`
        }
        return html;
    } else {
        html = `
            <div class="product-card">
                <img class="productImagen" src="${products.Imagen}" alt="${products.Nombre}">
                <h2 class="productNombre">${products.Nombre}</h2>
                <p class="productDescripcion">${products.Descripción}</p>
                <p class="productPrecio">${products.Precio}€</p>

                <a href="/products/${products._id}">Ver detalle</a>
            </div>
        `;
        
        return html;
    }
}


//baseHtml: html común a todas las páginas. Puede contener elementos como la importación de estilos, etc.
const baseHtml =
`
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Tienda de ropa online</title>
            <link rel="stylesheet" href="/style.css">
        </head>
    </html>
`;

//Mensaje se ha eliminado correctamente
const successfullyUpdated=
`
    <h2>Product successfully updated</h2>
`;

//Mensaje se ha eliminado correctamente
const deletedSuccessfully=
`
    <h2>Product successfully deleted</h2>
`

//getNavBar: Genera la barra de navegación con las categorías. También generará un enlace para subir un nuevo producto.
const getNavBar= 
`
    <header class="header"> 
    <nav>
        <div class="container">
            <ul class="nav1"> 
                <li><a href="/products"class="navigation">Productos</a></li>
                <li><a href="/camisetas"class="navigation">Camisetas</a></li>
                <li><a href="/pantalones"class="navigation">Pantalones</a></li>
                <li><a href="/zapatos"class="navigation">Zapatos</a></li>
                <li><a href="/accesorios"class="navigation">Accesorios</a></li>
                <li><a href="/login"class="navigation">Login</a></li>
            </ul>
        </div>
    </nav>
    </header>
    `;


//VISTA DASHBOARD formCreateProduct, formulario para crear producto:
const formCreateProduct = 
`
    <body>
        <form class="formCreateProduct" action='/dashboard'>
            <label for="productImg">Select files:</label>
            <input type="file" id="productImg" name="productImg" required>
                    
            <label for='productName'>Nombre del producto: </label>
            <input id='productName' type='text' name='productName' required>
                    
            <label for='productDescription'>Descripción del producto: </label>
            <input id='productDescription' type='text' name='productDescription' required>
                    
            <label for='productCategory'>Categoría del producto: </label>
            <select id="productCategory" name="productCategory" required>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>
                    
            <label for='productSize'>Talla del producto: </label>
            <select id="productSize" name="productSize" required>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>

            <label for='productPrice'>Precio del producto: </label>
            <input id='productPrice' type='number' name='productPrice' min='0' required>

            <button class="newProductBtn" type='submit'>Enviar</button>

            </form>
        </body>
    `;


//VISTA DASHBOARD formEditProduct, formulario para editar producto:
const formEditProduct = (product) => {
    return `
    <body>
        <form class="formEditProduct" action='/dashboard/:productId' method='post'>

            <label for="productImg">Select files:</label>
            <input type="file" id="productImg" name="productImg"><br>
                
            <label for='productName'>Nombre del producto: </label>
            <input id='productName' type='text' name='productName' value='${product.Nombre}'><br>
                
            <label for='productDescription'>Descripción del producto: </label>
            <textarea id='productDescription' type='text' name='productDescription' required value='${product.Descripción}'></textarea><br>
                
            <label for='productCategory'>Categoría del producto: </label>
            <select id="productCategory" name="productCategory">
                <option value="camisetas">Camisetas</option>
                <option value="pantalones">Pantalones</option>
                <option value="zapatos">Zapatos</option>
                <option value="accesorios">Accesorios</option>
            </select><br>
                
            <label for='productSize'>Talla del producto: </label>
            <select id="productSize" name="productSize">
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select><br>

            <label for='productPrice'>Precio del producto: </label>
            <input id='productPrice' type='number' name='productPrice' min='0' value='${product.Precio}'><br>

            <button class="newProductBtn" type='submit'>Enviar</button>

        </form>
    </body>
    `;
};



/**************************************VISTA GENERAL***************************************/

//showProducts: Devuelve la vista con todos los productos
//GET /products: Devuelve todos los productos.
const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productCards = getProductCards(products);
        const html = baseHtml + getNavBar + productCards;
        res.send(html);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: 'Error getting all products'})
    }
};


//showProductById: Devuelve la vista con el detalle de un producto
//GET /products/:productId: Devuelve el detalle de un producto.
const showProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        const msg = 'Product not found'

        if (!product) {
            return res.status(404).send(baseHtml + getNavBar + msg);
        }
        const productCards = getProductCards(product);
        const html = baseHtml + getNavBar + productCards;
        
        res.status(200).send(html);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: 'Error getting a product'})
    }
};

/**************************************VISTA DASHBOARD***************************************/
//

//showProductsDashboard: Devuelve la vista con todos los productos pero incluyendo opción de eliminar y editar
//GET /dashboard
const showProductsDashboard = async (req, res) => {
    try {
        const products = await Product.find();
        const productCardsDashboard = getProductCardsDashboard(products);
        const html = baseHtml + getNavBar + productCardsDashboard;
        res.send(html);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: 'Error getting all products'})
    }
};


//showProductById: Devuelve la vista con el detalle de un producto.
//GET /dashboard/:productId: Devuelve el detalle de un producto.
const showProductByIdDashboard = async (req, res) => {    
    try {
        const product = await Product.findById(req.params.productId);
        const msg = 'Product not found'

        if (!product) {
            return res.status(404).send(baseHtml + getNavBar + msg);
        }
        const productCardsDashboard = getProductCardsDashboard(product);
        const html = baseHtml + getNavBar + productCardsDashboard;
        
        res.status(200).send(html);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: 'Error getting a product'})
    }
};


//showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
<<<<<<< HEAD
const showNewProduct = async (req, res) => {
    try{         
        const html = baseHtml + getNavBar + formCreateProduct;
        
        res.status(200).send(html);

    }  catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem getting a form" });
    }
};
=======






>>>>>>> 2a991fe6d57f76510df20c3e08967a5e213e368f

//createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
//POST /dashboard: Crea un nuevo producto.
const createProduct = async (req, res) => {    
    try {
        const product = await Product.create({...req.body});
        
        const productCardsDashboard = getProductCardsDashboard(product);
        const html = baseHtml + getNavBar + productCardsDashboard;
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
<<<<<<< HEAD
const showEditProduct = async (req, res) => {    
    try {
        const product = await Product.findById(req.params.productId);
        const msg = 'Product not found'

        if (!product) {
            return res.status(404).send(baseHtml + getNavBar + msg);
        }
        
        const html = baseHtml + getNavBar + formEditProduct(product);
        
        res.status(200).send(html);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: `There was a problem with the productId number: ${req.params.productId}` });
    }
};
=======







>>>>>>> 2a991fe6d57f76510df20c3e08967a5e213e368f

//updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
//PUT /dashboard/:productId: Actualiza un producto.
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.productId, 
            req.body,
            { new: true }
        );
        const msg = 'Product not found'

        if (!product) {
            return res.status(404).send(baseHtml + getNavBar + msg);
        }
        const html = baseHtml + getNavBar + successfullyUpdated;
        res.send(html);

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
        const msg = 'Product not found'

        if (!product) {
            return res.status(404).send(baseHtml + getNavBar + msg);
        }
        const html = baseHtml + getNavBar + deletedSuccessfully;
        res
            .send(html)

    setTimeout(() => {
            res.redirect("/dashboard"); // Redirige a los 3seg
            }, 3000); 
    

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to delete a product" });
    }
};

module.exports = { 
    showProducts,
    showProductById,
    showProductsDashboard,
    showProductByIdDashboard,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct,

};

<<<<<<< HEAD
/*
const login = () => {
    return `
    <body>
        <form method="post"action='/login'>
            <div class="loginUser">
                <label for="email">Correo electrónico o Usuario</label>
                <input type="email" id="email" name="email" required placeholder="Ingresa tu correo o usuario">
                    
                <form method="post" action="/logout">

                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" required placeholder="Ingresa tu contraseña">
=======





/*
  //GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get("/products", async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
>>>>>>> 2a991fe6d57f76510df20c3e08967a5e213e368f

                <button type="submit">Iniciar sesión</button>
            </div> 
        </form>
    </body>    
    `;
};

const logout =()=>{
    return `
    <body>
        <form method="post" action="/logout">
            <button type="submit">Cerrar sesión</button>
            </form>
    </body>
    `
}

const logout = (req, res) => {
    req.session.destroy((err) => {  // Eliminar la sesión
        if (err) {
            return res.status(500).send("No se pudo cerrar sesión.");
        }
        res.redirect("/login"); // Redirigir al login después de cerrar sesión
    });
};*/










<<<<<<< HEAD
=======
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

module.exports = {
    showProducts,  };
*/
>>>>>>> 2a991fe6d57f76510df20c3e08967a5e213e368f
