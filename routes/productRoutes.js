//Define las rutas y las asocia al controlador:
const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

/*****************************************CLIENTE********************************************************/
router.get("/products", productController.showProductsClient); //GET /products: Devuelve todos los productos.
router.get("/products/:productId", productController.showProductByIdClient);//GET /products/:productId: Devuelve el detalle de un producto.);//(CLIENTE)

/***************************************ADMINISTRADOR****************************************************/
router.get("/dashboard", productController.showProducts);//GET /dashboard: Devuelve el dashboard del administrador.
router.get("/dashboard/new",productController.showNewProduct);//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.post("/dashboard", productController.createProduct);//POST /dashboard: Crea un nuevo producto.
router.get("/dashboard/:productId", productController.showProductById);//GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId/edit",productController.showEditProduct );//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
router.put("/dashboard/:productId", productController.updateProduct);//PUT /dashboard/:productId: Actualiza un producto.
router.delete("/dashboard/:productId/delete", productController.deleteProduct);//DELETE /dashboard/:productId/delete: Elimina un producto.




//router.get('/productos/:categoria', productController.showTrousers)

router.get("/camisetas",productController.showProductsClient)
router.get("/pantalones",productController.showProductsClient)
router.get("/zapatos",productController.showProductsClient)
router.get("/accesorios",productController.showProductsClient)

router.get("/login",productController.loginClient)//GET /login: Para que se logue el cliente.
router.post("/login",productController.verifyLoginClient)//POST /login: para procesar el formulario de inicio de sesión cuando el usuario lo envía.
router.post("/logout",productController.logoutClient)//POST /logout: Para que se deslogue el cliente.
/*
router.get('/login', (req, res) => {
    res.send `
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
        
            <form method="post" action="/logout">
                <button type="submit">Cerrar sesión</button>
                </body>
            </form>
        `;
    })
*/


module.exports = router;
