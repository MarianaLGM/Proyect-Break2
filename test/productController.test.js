

const request = require("supertest");
const app = require("../index.js");
const Product = require("../models/Product.js");
const productController=require ("../controllers/productController.js");
const mongoose = require('mongoose');

const SECONDS = 1000;

/* describe('GET /login', function() {
    test('login user', function(done) {
      request(app)
        .get('/login')
        .auth('adnisosa@gmail.com', '123456')
        .expect(200, done);
    });
  });  */

/* beforeAll(async () => {
 let productsCount = await Product.countDocuments({});
 console.log(productsCount);
}) */

afterAll(() => {//cuando terminan los test vacía toda la colección de Product
    return Product.deleteOne({ Nombre: "Camiseta flor" })
});

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
        
        let productsCount = await Product.countDocuments({});// contamos los productos que hay en nuestra colección de productos
        expect(productsCount).toBe(45); 

        const res = (await request(app)
        .post("/dashboard")
        .send(product)
        .expect(201)
        
        );//creamos producto
    
        productsCount = await Product.countDocuments({});//contamos colección productos

        expect(productsCount).toBe(46); // tendríamos que tener 1 producto más en nuestra colección

        expect(res.text).toBeDefined(); //comprueba que la respuesta no sea vacía o incorrecta
        
    }, 70 * SECONDS);

    test("Get all the products", async() => {
        
        const res = await request(app)//petición todos GET products, mostrar todos
            .get("/products")
            .expect(200)
            
        expect(typeof res.text).toBe("string");//comprueba que la rspuesta sea string
    }, 70 * SECONDS);

     test("Get a product by id", async() => {
        const productExist = await Product.findOne({Nombre: "Cinturón"});
        const id = productExist._id.toHexString()

        const res = await request(app)//petición todos GET products, mostrar todos
            .get(`/products/${id}`)
            .expect(200)
            
        expect(typeof res.text).toBe("string");//comprueba que la rspuesta sea string
    }, 70 * SECONDS);

    test("Update a product", async() => {
        const productEdit = {//lo que metemos por el body(postman)
            Nombre: 'Pantalón',
            Descripción: 'Pantalón para chica color rosa, estilo campana',
            Imagen: 'https://img01.ztat.net/article/spp-media-p1/f205e64b14b14c749188f03711d3ed51/4bc19c3a546d4e13aa3b3653c7ffef17.jpg?imwidth=1800&filter=packshot',
            Categoría: 'Pantalones',
            Talla: 'L',
            Precio: 55
        };
        
        const productExist = await Product.findOne(); //Encuentra un producto en la base de datos
        const id = productExist._id.toHexString() //Obtengo id de ese producto y lo convierte en una cadena hexadecimal de 24 caracteres.
        //console.log(productExist)

        const res = await request(app)//Busco el producto por su id y envío el producto con el cambio a realizar
            .post(`/dashboard/${id}`)
            .send(productEdit)
            .expect(302)

            const productCheck = await Product.findById(id);//Busco el producto en la base de datos para ver si se ha modificado
            //console.log(productCheck)
            
            expect(productCheck).toMatchObject({ //Compruebo la modificación
                Nombre: 'Pantalón',
                Descripción: 'Pantalón para chica color rosa, estilo campana',
                Imagen: 'https://img01.ztat.net/article/spp-media-p1/f205e64b14b14c749188f03711d3ed51/4bc19c3a546d4e13aa3b3653c7ffef17.jpg?imwidth=1800&filter=packshot',
                Categoría: 'Pantalones',
                Talla: 'L',
                Precio: 55
            })
           
    }, 70 * SECONDS);

    test("Delete a product", async() => {
        let productsCount = await Product.countDocuments({});// contamos los productos que hay en nuestra colección de productos
        expect(productsCount).toBe(45); 

        const productExist = await Product.findOne({Nombre: "Camiseta flor"}); //Encuentra un producto en la base de datos
        //console.log(productExist)
        const id = productExist._id.toHexString() //Obtengo id de ese producto y lo convierte en una cadena hexadecimal de 24 caracteres.

        const res = await request(app)
        .post(`/dashboard/${id}/delete`)
        .expect(302)

        productsCount = await Product.countDocuments({});// contamos nuevamente los productos que hay en nuestra colección de productos, debe haber 1 menos.
        expect(productsCount).toBe(44); 
    }, 70 * SECONDS)
});

