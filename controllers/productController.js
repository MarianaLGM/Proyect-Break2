//controllers/productController.js: Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. 
// Devolverá las respuestas en formato HTML.


const Product = require("../models/Product.js");

////////////////////////////////Funciones para generar el HTML/////////////////////////////////////////

// VISTA DASHBOARD getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.
function getProductCardsDashboard(products) {
    let html = '<div class="container">';

    if(products.length > 0) { 
        for (let product of products) {
            html += `
                <div class="productCard">
                    <img class="productImagen"src="${product.Imagen}" alt="${product.Nombre}">
                    <h2 class="productNombre">${product.Nombre}</h2>

                    <a class="verDetalle" href="/dashboard/${product._id}">Ver detalle</a>

                </div>
                `
        }
        
        return html;
    } else {
        html +=  `
            <div class="productCard">
                <img class="productImagen"src="${products.Imagen}" alt="${products.Nombre}">
                <h2 class="productNombre">${products.Nombre}</h2>
                <p class="productDescripcion">${products.Descripción}</p>
                <p class="productTalla">Talla: ${products.Talla}</p>
                <p class="productPrecio">Precio: ${products.Precio}€</p>

                <a class="editar" href="/dashboard/${products._id}/edit">Editar producto</a>

                <form action="/dashboard/${products._id}/delete" method="POST">
                    <input type="hidden" name="_method" value="DELETE">
                    <button class="btnEliminar" type="submit">Eliminar</button>
                </form>
                
            </div> 
            `;
        html += '</div>' //cierre contenedor
        return html;
    }
}
/*NOTA DELETE: No ponemos ?_method=DELETE en la URL, porque el campo oculto _method en el formulario se encargará de la conversión.
Con esto, el formulario envía un POST, pero methodOverride lo convierte en un DELETE gracias al campo oculto.*/
//SSR Frontend desde el backend

//VISTA GENERAL getProductCardsClient Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos
function getProductCards(products) {
    let html = '<div class="container">';

    if(products.length > 0) { 
        for (let product of products) {
            html += `
                <div class="productCard1">
                
                    <img class="productImagen"src="${product.Imagen}" alt="${product.Nombre}">
                    <h2 class="productNombre">${product.Nombre}</h2>

                    <a class="verDetalle" href="/products/${product._id}">Ver detalle</a>
                </div>

                `
        }
        return html;
    } else {
        html += `
            <div class="productCard2">
                <img class="productImagen" src="${products.Imagen}" alt="${products.Nombre}">
                <h2 class="productNombre">${products.Nombre}</h2>
                <p class="productDescripcion">${products.Descripción}</p>
                <p class="productTalla">Talla: ${products.Talla}</p>
                <p class="productPrecio">Precio: ${products.Precio}€</p>
            </div>

        `;
        html += '</div>' 
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
            <link rel="shortcut icon" href="/image/logo.png">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        </head>
    </html>
`;

//getNavBar: Genera la barra de navegación con las categorías. También generará un enlace para subir un nuevo producto.
const getNavBarLogin= 
`
    <header class="header"> 
    <nav>
        <div class="containerSuperior">
            <a href="/login" class="persona"><span class="material-icons"style="font-size:40px">perm_identity</span></a>  
        </div>

        <div class="containerLogo">
            <video width="200" autoplay muted loop class="background-video">
                <source src="/image/Logotipo.mp4" type="video/mp4">
            </video>
        </div>


        <div class="container">
            <ul class="nav1"> 
                <li><a href="/products"class="navigation">Productos</a></li>
                <li><a href="/products/categoria/Camisetas"class="navigation">Camisetas</a></li>
                <li><a href="/products/categoria/Pantalones"class="navigation">Pantalones</a></li>
                <li><a href="/products/categoria/Zapatos"class="navigation">Zapatos</a></li>
                <li><a href="/products/categoria/Accesorios"class="navigation">Accesorios</a></li>
            </ul>
        </div>
        
    </nav>
    </header>
    `;



//getNavBar: Genera la barra de navegación con las categorías. También generará un enlace para subir un nuevo producto.
const getNavBarLogout= 
`
    <header class="header"> 
    <nav>      
        <div class="containerSuperior">       
            <a href="/dashboard/new" class="nuevoProducto"><span class="material-icons">add_circle</span>New!</a>
        </div>

        <div class="containerLogo">
            <video width="200" autoplay muted loop class="background-video">
                <source src="/image/Logotipo.mp4" type="video/mp4">
            </video>
        </div>

        <div class="container">
            <ul class="nav1"> 
                <li><a href="/dashboard"class="navigation">Productos</a></li>
                <li><a href="/dashboard/categoria/Camisetas"class="navigation">Camisetas</a></li>
                <li><a href="/dashboard/categoria/Pantalones"class="navigation">Pantalones</a></li>
                <li><a href="/dashboard/categoria/Zapatos"class="navigation">Zapatos</a></li>
                <li><a href="/dashboard/categoria/Accesorios"class="navigation">Accesorios</a></li>
            </ul>
        </div>
        
    </nav>
    </header>
    `;

const formLogout = `
    <form action='/logout' method='post'>
        <button type='submit' class="personaLogout"><span class="material-icons"style="font-size:35px">logout</span></button>
    </form>
`
const searchProductForm = `
    <form action='/search' method='post'>
        <input class='searchInput' type='text' name='searchInput'>
        <button type='submit' class="searchBtn"><span class="material-icons"style="font-size:35px">search</span></button>
    </form>
`

//VISTA DASHBOARD formCreateProduct, formulario para crear producto:
const formCreateProduct = 
`
    <body>
    <div class= "containerCreate"> 

        <form class="formCreateProduct" action='/dashboard' method="POST">
            <label for="productImg">Enlace de la imagen:</label>
            <input type="text" id="productImg" name="Imagen">
                    
            <label for='productName'>Nombre del producto: </label>
            <input class='productName' type='text' name='Nombre' required>
                    
            <label for='productDescription'>Descripción: </label>
            <input class='productDescription' type='text' name='Descripción' required>
                    
            <label for='productCategory'>Categoría: </label>
            <select class="productCategory" name="Categoría" required>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>
                    
            <label for='productSize'>Talla: </label>
            <select class="productSize" name="Talla" required>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>

            <label for='productPrice'>Precio: </label>
            <input class='productPrice' type='number' name='Precio' min='0' required>

            <button class="newProductBtn" type='submit'>Subir nuevo producto</button>

            </form>
        </div>    
        </body>
    `;


//VISTA DASHBOARD formEditProduct, formulario para editar producto:

const formEditProduct = (product) => {
    return `
    <body>
    <div class= "containerUpdate"> 
        <form class="formEditProduct" action='/dashboard/${product._id}' method='post'>

            <label for="productImg">Enlace de la imagen:</label>
            <input type="text" id="productImg" name="Imagen" value='${product.Imagen}'><br>
                
            <label for='productName'>Nombre del producto: </label>
            <input class='productName' type='text' name='Nombre' value='${product.Nombre}'><br>
                
            <label for='productDescription'>Descripción: </label>
            <textarea class='productDescription' type='text' name='Descripción'>${product.Descripción}</textarea><br>

            <label for='productCategory'>Categoría: </label>
            <select class="productCategory" name="Categoría">
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select><br>
                
            <label for='productSize'>Talla: </label>
            <select class="productSize" name="Talla">
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select><br>

            <label for='productPrice'>Precio: </label>
            <input class='productPrice' type='number' name='Precio' min='0' value='${product.Precio}'><br>
            <form action="/dashboard/${product._id}" method="POST">
                <input type="hidden" name="_method" value="PUT">
                <button class="editProductBtn" type="submit">Actualizar producto</button>
            </form>
        </form>
        </div>  
    </body>
    `;
};


/**************************************VISTA GENERAL***************************************/

//showProducts: Devuelve la vista con todos los productos
//GET /products: Devuelve todos los productos.
const showProducts = async (req, res) => {
    const { token } = req.cookies;
    let html;

    try {
        const products = await Product.find();

        if(!token) {
            const productCards = getProductCards(products);
            html = baseHtml + getNavBarLogin + searchProductForm + productCards;
        } else {
            const productCardsDashboard = getProductCardsDashboard(products);
            html = baseHtml + getNavBarLogout + formLogout + searchProductForm + productCardsDashboard;
        }
        
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
    const { token } = req.cookies;
    let html;

    try {
        const product = await Product.findById(req.params.productId);
        const msg = 'Product not found'

        if (!product) {
            return res.status(404).send(baseHtml + getNavBarLogin + msg);
        }

        if(!token) {
            const productCards = getProductCards(product);
            html = baseHtml + getNavBarLogin + searchProductForm + productCards;
        } else {
            const productCardsDashboard = getProductCardsDashboard(product);
            html = baseHtml + getNavBarLogout + formLogout + searchProductForm + productCardsDashboard;
        }
        
        res.status(200).send(html);

    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: 'Error getting a product'})
    }
};

/**************************************VISTA DASHBOARD***************************************/
//showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
const showNewProduct = async (req, res) => {
    try{         
        const html = baseHtml + getNavBarLogout + formLogout + searchProductForm + formCreateProduct;
        
        res.status(200).send(html);

    }  catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem getting a form" });
    }
};


//createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
//POST /dashboard: Crea un nuevo producto.
const createProduct = async (req, res) => {    
    try {
        const product = await Product.create({...req.body});
        
        const productCardsDashboard = getProductCardsDashboard(product);
        const html = baseHtml + getNavBarLogout + formLogout + searchProductForm + productCardsDashboard;
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
            return res.status(404).send(baseHtml + getNavBarLogout + msg);
        }
        
        const html = baseHtml + getNavBarLogout + formLogout + searchProductForm + formEditProduct(product);
        
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
        //console.log(req.body);

        if (!product) {
            const msg = 'Product not found';
            // Si no se encuentra el producto, enviamos el mensaje de error
            return res.status(404).send(baseHtml + getNavBarLogout + formLogout + searchProductForm + msg);
        }

        // Si el producto se actualizó correctamente, redirigimos después de 3 segundos al detalle del producto actualizado
        setTimeout(() => {
            res.redirect(`/dashboard/${req.params.productId}`);
        }, 3000);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: `There was a problem trying to update a product with productId: ${req.params.productId}`
        });
    }
};

//deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.
//DELETE /dashboard/:productId/delete: Elimina un producto. NECESITAREMOS INSTALAR method-override
const deleteProduct = async (req, res) => {

    try {
        const productId = req.params.productId;
        const product = await Product.findByIdAndDelete(productId);
        const msg = 'Product not found'

        if (!product) {
            return res.status(404).send(baseHtml + getNavBarLogout + formLogout + searchProductForm + msg);
        }

    setTimeout(() => {
            res.redirect("/dashboard"); // Redirige a los 3seg a todos los productos del dashboard
            }, 3000); 
    

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to delete a product" });
    }
};


//showProductByCategory Clasificar productos por su categoría
//GET /categoria/:categoria Clasificar productos por su categoría
const showProductByCategory = async (req, res) => {
    const categoria = req.params.categoria; // Obtiene la categoría de la URL
    const { token } = req.cookies;
    let html;

    try {
        const productsCategory = await Product.find({ Categoría: categoria });

        if (!productsCategory || productsCategory.length === 0) {
            return res.status(404).send('Category not found');
        }

        if(!token) {
            html = baseHtml + getNavBarLogin + searchProductForm + getProductCards(productsCategory)
        } else {
            html = baseHtml + getNavBarLogout + formLogout + searchProductForm + getProductCardsDashboard(productsCategory)
        }
        res.send(html)

    } catch (err) {
        console.error('Error getting products:', err); // Ver detalles del error
        return res.status(500).json({ message: 'Error getting products', error: err });
    }
};

//Buscador de productos
const searchProduct = async (req, res) => {
    const productName = req.body.searchInput.toLowerCase();
    const { token } = req.cookies;
    let html;
    //console.log(token)

    try {
        const searchProductName = await Product.find({ Nombre: { $regex: '.*' + productName + '.*', $options: 'i' } });

        if (!searchProductName || searchProductName.length === 0) {
            return res.status(404).send('Product not found');
        }

        if(!token) {
            html = baseHtml + getNavBarLogin + searchProductForm + getProductCards(searchProductName)
            
        } else {
            html = baseHtml + getNavBarLogout + formLogout + searchProductForm + getProductCardsDashboard(searchProductName)
        }
        res.send(html)

    } catch (err) {
        console.error('Error getting products:', err); // Ver detalles del error
        return res.status(500).json({ message: 'Error getting products', error: err });
    }
}

module.exports = { 
    showProducts,
    showProductById,
    showProductByCategory,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
};













