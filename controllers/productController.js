
const Product = require("../models/Product.js");

/*Las funciones principales del controlador serán:

showProductById: Devuelve la vista con el detalle de un producto.
showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
showEditProduct: Devuelve la vista con el formulario para editar un producto.
updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.

Las funciones showProducts y showProductById pueden devolver respuestas ligeramente distintas si se llega desde el dashboard o desde la vista principal. Por ejemplo, si se llega desde el dashboard, 
se mostrará un enlace para editar o eliminar el producto. Para ello podemos utilizar la url de la petición o pasar al controlador un parámetro extra que indique si se llega desde el dashboard o no
*/


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

  //showProducts: Devuelve la vista con todos los productos.
  const showProducts = async (req, res) => {
    const products = await Product.find();
    const productCards = getProductCards(products);
    const html = baseHtml + getNavBar() + productCards;
    res.send(html);
  };


  module.exports = {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct
  };

////////////////////////////////Funciones auxiliares para generar el HTML/////////////////////////////////////////

//baseHtml: html común a todas las páginas. Puede contener elementos como la importación de estilos, etc.
const baseHtml = () => {
    return `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Tienda de ropa online</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
    `;
};

//getNavBar: Genera la barra de navegación con las categorías. También generará un enlace para subir un nuevo producto.
function getNavBar(products) {
     
    }

  


module.exports = { baseHtml, getNavBar, getProductCards, showProducts, getProductForm };
      




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
        res.json({ message: "product deleted", task });

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to delete a product" });
    }
});
*/

module.exports = {
    showProducts,  };