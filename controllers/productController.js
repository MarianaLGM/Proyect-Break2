
const Product = require("../models/Product.js");



////////////////////////////////Funciones para generar el HTML/////////////////////////////////////////

// VISTA DASHBOARD getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.
function getProductCardsDashboard(products) {
    let html = '';

    if(products.length > 0) { 
        for (let product of products) {
            html += `
                <div class="product-card">
                    <img src="${product.Imagen}" alt="${product.Nombre}">
                    <h2>${product.Nombre}</h2>
                    <p>${product.Descripción}</p>
                    <p>${product.Precio}€</p>
                    <a href="/products/${product._id}">Ver detalle</a>
                    <a href="/products/${product._id}/edit">Editar</a>
                    <a href="/products/${product._id}/delete">Eliminar</a>
                </div>`
        }
        return html;
    } else {
        html = `
            <div class="product-card">
                <img src="${products.Imagen}" alt="${products.Nombre}">
                <h2>${products.Nombre}</h2>
                <p>${products.Descripción}</p>
                <p>${products.Precio}€</p>
                <a href="/products/${products._id}">Ver detalle</a>
                <a href="/products/${products._id}/edit">Editar</a>
                <a href="/products/${products._id}/delete">Eliminar</a>
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
                    <img src="${product.Imagen}" alt="${product.Nombre}">
                    <h2>${product.Nombre}</h2>
                    <p>${product.Descripción}</p>
                    <p>${product.Precio}€</p>
                    <a href="/products/${products._id}">Ver detalle</a>
                </div>`
        }
        return html;
    } else {
        html = `
            <div class="product-card">
                <img src="${products.Imagen}" alt="${products.Nombre}">
                <h2>${products.Nombre}</h2>
                <p>${products.Descripción}</p>
                <p>${products.Precio}€</p>
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

const successfullyUpdated=
`
    <h2>Product successfully updated</h2>
`;


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
        <form action='/dashboard'>
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

            <button id=newProductBtn type='submit'>Enviar</button>

            </form>
        </body>
    `;


//VISTA DASHBOARD formEditProduct, formulario para editar producto:
const formEditProduct = (product) => {
    return `
    <body>
        <form action='/dashboard/:productId' method='post'>

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

                <button id=newProductBtn type='submit'>Enviar</button>

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
        .json({ message: 'Error getting the product'})
    }
};

/**************************************VISTA DASHBOARD***************************************/

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
        .json({ message: 'Error getting the product'})
    }
};


//showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
const showNewProduct = async (req, res) => {
    try{         
        const html = baseHtml + getNavBar + formCreateProduct;
        
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
const showEditProduct = async (req, res) => {    
    try {
        const product = await Product.findById(req.params.productId);
        const msg = 'Product not found'

        if (!product) {
            return res.status(404).send(baseHtml + getNavBar + msg);
        }
        
        const html = baseHtml + getNavBar + formEditProduct();
        
        res.status(200).send(html);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: `There was a problem with the productId number: ${req.params.productId}` });
    }
};

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
        res
            .send({ message: "product deleted"})
            .redirect ("/dashboard");

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to delete a product" });
    }
};



/*
//showProductsBy: Devuelve la vista pantalones
//GET /products/:categoria Devuelve productos según categoría
const showProductsBy = async (req, res) => {
    try {
        const products = await Product.find(req.params.categoría);
        const productCards = getProductCards(products);
        const html = baseHtml + getNavBar + productCards;
        res.send(html);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: 'Error getting this category'})
    }
};*/

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





module.exports = { 
    showProducts,
    showNewProduct,
    createProduct,
    showProductById,
    showProductByIdDashboard,
    showEditProduct,
    updateProduct,
    deleteProduct,

};




