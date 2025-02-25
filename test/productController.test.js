

const request = require("supertest");

const app = require("../index.js");
const Product = require("../models/Product.js");
const productController=require ("../controllers/productController.js");

var session = require('supertest-session');
var testSession = null;
let authenticatedSession;

beforeEach(function () {
    testSession = session(app);
});
    

/* beforeEach(function (done) {
    testSession.post('/login').type('form')
        .send({email: 'adnisosa@gmail.com', password: '123456'})
        .expect(302) // get redirected to /dashboard
        .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
    });
});
 */


/* describe('GET /login', function() {
    test('login user', function(done) {
        request(app)
        .get('/login')
        .auth('adnisosa@gmail.com', '123456')
        .expect(200, done);
    });
  });  */

describe("testing/productRoutes", () => {
    
    const product = {//lo que metemos por el body(postman)
        Nombre:"Camiseta",
        Descripción: "Camiseta de algodón orgánico personalizables",
        Imagen: "https://img.ltwebstatic.com/images3_pi/2024/04/09/df/1712659748ccb830b59d9da791f1d27a4b934c2d39_wk_1722506854_thumbnail_560x.webp",
        Categoría:"Camisetas",
        Talla: "M",
        Precio: 55
    };

    test("Create a product", async() => {
        
        let productsCount = await Product.countDocuments({});// contamos prod. que hay en nuestra colección de prod.
        expect(productsCount).toBe(9); //no deberían haber

        const res = (await request(app)
        .post("/dashboard")
        .send(product)
        .expect(201)
        
    );//creamos producto
        //console.log(res)
        productsCount = await Product.countDocuments({});//contamos colección productos

        expect(productsCount).toBe(10); // tendríamos que tener 1 producto en nuestra colección

        expect(res.text).toBeDefined(); //comprueba que la respuesta no sea vacía o incorrecta

    });

    test("Get products", async() => {
        
        const res = await request(app)//petición todos GET products, mostrar todos
            .get("/products")
            .expect(200)
        
        expect(typeof res.text).toBe("string");//comprueba que la rspuesta sea string
    });
});