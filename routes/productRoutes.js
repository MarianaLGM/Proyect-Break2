//Define las rutas y las asocia al controlador:
const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');
const authVerification = require('../middlewares/authMiddleware')



/*****************************************DESDE PRODUCTS********************************************************/
router.get("/products", productController.showProducts); //GET /products: Devuelve todos los productos.
router.get("/products/:productId", productController.showProductById);//GET /products/:productId: Devuelve el detalle de un producto.;
router.get("/products/categoria/:categoria",productController.showProductByCategory)//GET /products/categoria/:categoria filtra por categoría

/*****************************************DESDE DASHBOARD******************************************************/
router.get("/dashboard", authVerification, productController.showProducts);//GET /dashboard: Devuelve el dashboard del administrador.
router.get("/dashboard/new",authVerification, productController.showNewProduct);//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.post("/dashboard", productController.createProduct);//POST /dashboard: Crea un nuevo producto.
router.get("/dashboard/:productId", authVerification, productController.showProductById);//GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId/edit",authVerification, productController.showEditProduct );//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

/*ACTUALIZAR PRODUCTO DESDE POSTMAN Y DESDE NAVEGADOR*/
//router.put("/dashboard/:productId", productController.updateProduct);//PUT /dashboard/:productId: Actualiza un producto.
router.post("/dashboard/:productId", productController.updateProduct);

/*ELIMINAR PRODUCTO DESDE POSTMAN Y DESDE NAVEGADOR*/
//router.delete("/dashboard/:productId/delete", productController.deleteProduct);//DELETE /dashboard/:productId/delete: Elimina un producto.
router.post("/dashboard/:productId/delete", productController.deleteProduct)

router.get("/dashboard/categoria/:categoria", authVerification, productController.showProductByCategory)////GET /dashboard/categoria/:categoria filtra por categoría

router.post("/search",productController.searchProduct)

module.exports = router;
