

const request = require("supertest");

const app = require("../index.js");
const Product = require("../models/Product.js");
const productController=require ("../controllers/productController.js");
const mongoose = require('mongoose');

/*
describe("testing/productRoutes", () => {
    
    const product = {//lo que metemos por el body(postman)
        Nombre:"Camiseta flor",
        Descripción: "Camiseta de algodón orgánico personalizables",
        Imagen: "https://img.ltwebstatic.com/images3_pi/2024/04/09/df/1712659748ccb830b59d9da791f1d27a4b934c2d39_wk_1722506854_thumbnail_560x.webp",
        Categoría:"Camisetas",
        Talla: "M",
        Precio: 55
    };

    test("Create a product", async() => {
        
        let productsCount = await Product.countDocuments({});// contamos prod. que hay en nuestra colección de prod.
        expect(productsCount).toBe(7); //no deberían haber

        const res = (await request(app)
        .post("/dashboard")
        .send(product)
        .expect(201)
        
    );//creamos producto
        //console.log(res)
        productsCount = await Product.countDocuments({});//contamos colección productos

        expect(productsCount).toBe(8); // tendríamos que tener 1 producto en nuestra colección

        expect(res.text).toBeDefined(); //comprueba que la respuesta no sea vacía o incorrecta

    });

    test("Get products", async() => {
        
        const res = await request(app)//petición todos GET products, mostrar todos
            .get("/products")
            .expect(200)
        
        expect(typeof res.text).toBe("string");//comprueba que la rspuesta sea string
    });
});
*/

//buscar por id
describe("testing/productRoutes", () => {

    const product = { 
        _id: new mongoose.Types.ObjectId(),
        Nombre: "Camiseta flor",
        Descripción: "Camiseta de algodón orgánico personalizables",
        Imagen: "https://img.ltwebstatic.com/images3_pi/2024/04/09/df/1712659748ccb830b59d9da791f1d27a4b934c2d39_wk_1722506854_thumbnail_560x.webp",
        Categoría: "Camisetas",
        Talla: "M",
        Precio: 55
    };

    let productId;

    test("Create and get product", async () => {
        const res = await request(app) //creo producto y lo guardo en "res"
            .post("/dashboard")
            .send(product)
            .expect(201);
            console.log(res.body);

        productId = res.body._id; // aquí guardo en productId el id del producto que acabo de crear en res.body._id

        const getProductId = await request(app) //obtener producto por el id
            .get(`/products/${productId}`)
            .expect(200);

        expect(getProductId.body._id).toBe(productId);// Verificar que el producto obtenido tenga el mismo ID
    });

});


afterAll(() => {//cuando terminan los test vacía toda la colección de Product
    return Product.deleteOne({ Nombre: "Camiseta flor" })
});
//update
//delete