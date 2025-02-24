# Proyect_Break"# Proyect-Break2"  

Encabezados
    # A first-level heading
    ## A second-level heading
    ### A third-level heading
//Al usar dos o más encabezados, GitHub genera automáticamente una tabla de contenido a la que puede acceder haciendo clic en  dentro del encabezado del archivo. Todos los títulos de encabezado aparecen en la tabla de contenido, y puede hacer clic en un título para ir a la sección seleccionada.


*********************************************************TIENDA DE ROPA********************************************************
<em> TIENDA DE ROPA </em>
:construction: Proyecto en construcción :construction:

## ÍNDICE
*[Descripción del proyecto](#Descripción-del-proyecto)
*[Características de archivos](#Características-de-los-archivos)
*[Base de datos](#Base-de-datos)
*[Servidor](#Servidor)
*[Modelos](#Modelos)
*[Rutas](#Rutas)
*[Controladores](#Controladores)
*[Despliegue](#Despliegue)
*[Test](#Test)
*[Swagger](#Swagger)
*[Firebase](#Firebase)
*[Autores](#Autores)

## Descripción del proyecto
Proyecto realizado como requisito del Bootcamp Full Stack Developer de The Bridge. Tienda online de ropa, donde cualquier persona puede entrar a la web para ver los artículos que tiene disponible la tienda online. A los administradores de la tienda, les permite crear un usuario e iniciar sesión para poder gestionar los productos: crear, editar o borrar cualquier artículo.


*****************************************************CARACTERÍSTICAS ARCHIVOS**************************************************
## Características de los archivos
### config
- config/db.js: Archivo que contendrá la configuración de la base de datos. Deberá conectarse a la base de datos de mongo en Atlas.
-config/firebase.js: Archivo donde se guarda la clave privada generada en la configuración del proyecto en la plataforma Firebase.

### controlllers
- controllers/authControllers.js: Archivo que contiene la configuración de firebase y la lógica para manejar tanto la creación de usuario, como el registro, inicio y cierre de sesión del administrador utilizando Firebase. Devuelve las respuestas en formato HTML.
- controllers/productController.js: Archivo que contiene la lógica para manejar las solicitudes CRUD de los productos. Devuelve las respuestas en formato HTML.

### middlewares
- middlewares/authMiddleware.js: Archivo que contiene el middleware para comprobar si el usuario está autenticado. Este busca la sesión del usuario y, si no la encuentra, redirige al formulario de login.

### models
- models/Product.js: Archivo que contiene la definición del esquema del producto utilizando Mongoose.

### public
- public/styles.css: contiene los estilos de la aplicación.

### routes
- routes/productRoutes.js: Archivo que contiene la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.
- routes/authRoutes.js: Archivo que contiene la definición de las rutas para la autenticación. Este llama a los métodos del controlador.

### index.js
- index.js: Archivo principal que inicia el servidor Express. Importa las rutas y las usa. También tiene configurado para servir archivos estáticos y para leer el body de las peticiones de formularios.

- .env: Archivo que contendrá las variables de entorno. 

### package.json
- package.json: Archivo que contendrá las dependencias del proyecto. Se debe hacer ```npm i``` para instalar todas las dependencias necesarias para que el proyecto funcione. ----->("start": "node --watch index.js") 

//BONUS//
- config/firebase.js: Archivo que contendrá la configuración de firebase. Deberá inicializar la conexión con firebase.
- controllers/authController.js: Archivo que contendrá la lógica para manejar las solicitudes de autenticación. Devolverá las respuestas en formato HTML.
- routes/authRoutes.js: Archivo que contendrá la definición de las rutas para la autenticación. Este llama a los métodos del controlador.
- middlewares/authMiddleware.js: Archivo que contendrá el middleware para comprobar si el usuario está autenticado. Este buscará la sesión del usuario y, si no la encuentra, redirigirá al formulario de login.

******************************************************BBDD**********************************************************
## Base de datos
La base de datos se gestiona mediante MongoDB Atlas.

Una vez creada la base de datos, copiamos la uri y la guardamos en el archivo .env

MONGO_URI=<uri_bd_atlas>

****************************************************SERVIDOR*********************************************************
## Servidor
- npm install---> dependencias: cloudinary, cookie-parser,dotenv,express,firebase, firebase-admin, method-override, mongodb, mongoose. Nota: aquí indicamos no sólo las necesarias para levantar servidor, sino también aquellas requeridas durante el proyect.
- Requerimos express
- Puerto 8080 (http://localhost:8080/)
- Cargar puerto desde el archivo .env usando dotenv.
- Importamos conexión bbdd Mongo (dbConnection)
- Configurar el servidor para que sirva archivos estáticos (PATH) desde la carpeta public.
- Leer el body de las peticiones tipo post. 
- Importamos rutas
- Requerir y acceder (URLENCODED Y JSON):  Middleware para manejar datos de formulario y JSONmiddleware express.urlencoded.
- Requerimos methodOverride nos permite hacer solicitudes put y delete, pero no nos funcionó.

*******************************************************MODELOS******************************************************
## Modelos
////////////PRODUCT////////////
### Product

- Nombre, tipo STRING
- Descripción, tipo STRING
- Imagen, tipo STRING
- Categoría ("Camisetas", "Pantalones", "Zapatos", "Accesorios".), tipo STRING
- Talla("XS", "S", "M", "L", "XL".), tipo STRING
- Precio, tipo NÚMERO

//////////////USER/////////////

- Usuario, tipo STRING
- Contraseña, tipo STRING

*********************************************************RUTAS******************************************************
## Rutas
POSTMAN: https://documenter.getpostman.com/view/40898562/2sAYXFhHDT

## product
### product
////////////PRODUCT////////////

- GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.

- GET /products/:productId: Devuelve el detalle de un producto.

- GET /products/categoria/:categoria: filtra productos por categoría.

- GET /dashboard: Devuelve el dashboard del administrador con todos los artículos que se hayan subido. Si clickamos en uno de ellos nos permitirá actualizarlo o eliminarlo.

- GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.

- POST /dashboard: Crea un nuevo producto.

- GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.

- GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

- PUT /dashboard/:productId: Actualiza un producto.FUNCIONA EN POSTMAN
- POST /dashboard/:productId: Actualiza un producto. FUNCIONA EN NAVEGADOR

- DELETE /dashboard/:productId/delete: Elimina un producto. FUNCIONA EN POSTMAN
- POST /dashboard/:productId/delete: Elimina un producto. FUNCIONA EN NAVEGADOR

- GET /dashboard/categoria/:categoria: filtra productos por categoría.


### user
//////////////USER//////////////

- GET /register: Devuelve formulario para crear usuario.

- POST /register: Registro de usuario para continuar al login.

- GET /login: Devuelve formulario para iniciar sesión.

- POST /login: Comprobación de auténticación para continuar al dashboard.

- POST /logout: Cierra sesión.



*********************************************************CONTROLADORES**************************************************
## Controladores
### productController.js
///////Vista sin inciciar sesión ----> /products//////// 

- showProducts: Devuelve la vista con todos los productos.

- showProductById: Devuelve la vista con el detalle de un producto.

- showProductByCategory: clasifica los productos por categoría.


///////Vista iniciando sesión ----> /dashboard////////// 

- showProductsDashboard: Devuelve la vista con todos los productos con opciones disponibles solo para el administrador, como agregar, editar o eliminar un producto.

- showProductByIdDashboard: Devuelve la vista con el detalle de un producto, con opciones de editar o eliminar el producto seleccionado.

- showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.

- createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.

- showEditProduct: Devuelve la vista con el formulario para editar un producto.

- updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto.

- deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.

- showProductByCategoryDashboard: clasifica los productos por categoría.


### authControllers.js
///////////////register, login, logout///////////// 

- register: Envío de formulario para realizar el registro de usuario si el administrador no tiene cuenta.

- registerPost: Envío de datos del administrador para crear una cuenta de usuario.

- login: Envío de formulario para realizar inicio de sesión.

- loginPost: Comprobación de auténticación para continuar al dashboard.

- logoutPost: Cierre de sessión.



///////////////variables y funciones necesarias para introducir HTML en el código///////////// 

- baseHtml: html común a todas las páginas. Contiene la importación de estilos CSS así como biblioteca para íconos.https://fonts.google.com/

- getNavBar:barra de navegación con las categorías 

- getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos (sin opción a editar/eliminar) ya que no ha iniciado sesión.

- getProductCardsDashboard:  Genera el html de los productos pero con vista administrador (opción editar/eliminar) ya que sí ha iniciado sesión.

- formEditProduct: formulario para actualizar/modificar producto.

- formCreateProduct: formulario para crear producto.

- registerForm: formulario para registrar usuario.

- loginForm: formulario para iniciar sesión.

***********************************************************DESPLIEGUE******************************************************
## Despliegue
https://proyect-break2.onrender.com/products
https://proyect-break2.onrender.com/dashboard

*********************************************************BONUS****************************************************************

## Test

- npm i -D jest (-D hace referencia a que es una dependencia de desarrollo)

- en nuestro package.json creamos un script para ejecutar los tests cada vez que guardamos. ("scripts" ----->"test": "jest" y  "test:watch": "jest --watchAll",)

- Cada vez que queramos ejecutar en consola será:------> npm run test:watch


- module.exports = app; exportamos desde index.js app para poder tenerla


- crearemos los tests








## Swagger

- npm i swagger-ui

- importamos swaggerUi

- Importamos el index.js de la carpeta docs

- Creamos una ruta para poder ver la documentación creada

- En el navegador, abrimos nuestra página de documentación desde http://localhost:8080/api-docs

- /docs/basicInfo: contiene información básica de la API

- /docs/components: contiene componentes reutilizables para la documentación.

- /docs/index: creamos un archivo index.js que exportará todos los archivos que vamos a ir creando en la carpeta docs
importaremos los diferentes archivos y los exportaremos

- /docs/product: contiene documentación de los diferentes endpoints


## Firebase

Utilizamos Firebase para la autenticación del administrador o administradores del sitio web. 

### Dependencias
-npm i firebase-admin --> Para administrar usuarios y generar tokens. Nos permite la creación y el inicio de sesión de usuarios. 

-npm i cookie-parser --> Guarda el token generado por Firebase en la auténticación del usuario y permite que el usuario se mantenga en la sesión el tiempo que el token exista, lo que también nos permite dar acceso al dashboard sin la necesidad de volver a iniciar sesión.

### Descripción de archivos
-config/firebase.js --> Contiene todo la clave secreta para acceder al proyecto en la plataforma de Firebase. Se importa en index.js para utilizarlo en la inicialización de Firebase.

-controllers/authControllers.js --> Configuración de Firebase y la lógica para manejar tanto la creación de usuario, como el registro, inicio y cierre de sesión del administrador.

-middlewares/authMiddleware.js --> Archivo que contiene el middleware para comprobar si el usuario está autenticado. Este busca la sesión del usuario y, si no la encuentra, redirige al formulario de login. Middleware utilizado en la ruta /dashboard.

-routes/authRoutes --> Archivo que contiene la definición de las rutas para la autenticación.

### Rutas
- /register --> Muestra un formulario para agregar un correo y una contraseña, con mínimo 6 caracteres, para crear el usuario. Una vez creado el usuario, te redirige a /login.
- /login --> Muestra un formulario para realizar inicio de sesión, utilizando correo electrónico y contraseña. Una vez iniciada la sesión, te redirige a /dashboard.
- /logout --> Para realizar cierre de sesión, ir a la parte superior izquierda y dar el icono de cierre de sesión. Al cierre de sesión, te redirige a /login.


## Autores
[Mariana Lobeto](https://github.com/MarianaLGM) | [Adni Sosa](https://github.com/AdniSosa) 