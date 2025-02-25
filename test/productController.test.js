

const request = require("supertest");
const app = require("../index.js");
const Product = require("../models/Product.js");
const productController=require ("../controllers/productController.js")


describe("testing/productRoutes", () => {
    
    const product = {//lo que metemos por el body(postman)
        Nombre:"Camiseta",
        Descripcion: "Camiseta de algodón orgánico personalizables",
        Categoria:"Camisetas",
        Imagen: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.crealo.es%2Fcamisetas-de-futbol-personalizadas%2F12138-camiseta-futbol-sublimada-modelo-rayas-personalizada.html&psig=AOvVaw2ZgnJeHBfBN7QCEg58aP3U&ust=1739631599373000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNi30vC2w4sDFQAAAAAdAAAAABAE",
        Talla: "M",
        Precio: 55
    };
    

    test("Create a product", async() => {
        
        let productsCount = await Product.countDocuments({});// contamos prod. que hay en nuestra colección de prod.
        expect(productsCount).toBe(0); //no deberían haber

        const res = await request(app).productController.post("/dashboard").send(product).expect(201);//creamos producto
        
        productsCount = await Product.countDocuments({});//contamos colección productos

        expect(productsCount).toBe(1); // tendríamos que tener 1 producto en nuestra colección

        expect(res.text).toBeDefined(); //comprueba que la respuesta no sea vacía o incorrecta

    });

    test("Get products", async() => {
        
        const res = await request(app)//petición todos GET products, mostrar todos
            .get("/dashboard")
            .expect(200)
        
        expect(typeof res.text).toBe("string");//comprueba que la rspuesta sea string
    });
});