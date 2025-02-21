# Proyect_Break"# Proyect-Break2"  




*********************************************************TIENDA DE ROPA********************************************************

ÍNDICE
- Creación de base de datos
- Creación del servidor
- Creación de modelos
- Creación de rutas
- Creación de controladores
- Despliegue
- Bonus 1 - Tests
- Bonus 2 - Autenticación con Firebase
- Bonus 3 - API y documentación con Swagger
- Recursos

*****************************************************CARACTERÍSTICAS ARCHIVOS**************************************************

- config/db.js: Archivo que contendrá la configuración de la base de datos. Deberá conectarse a la base de datos de mongo en Atlas.

- controllers/productController.js: Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. Devolverá las respuestas en formato HTML.

- models/Product.js: Archivo que contendrá la definición del esquema del producto utilizando Mongoose.

- routes/productRoutes.js: Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

- index.js: Archivo principal que iniciará el servidor Express. Importa las rutas y las usa. También tiene que estar configurado para servir archivos estáticos y para leer el body de las peticiones de formularios.

- public/styles.css: contiene los estilos de la aplicación.

- .env: Archivo que contendrá las variables de entorno. 

- package.json: Archivo que contendrá las dependencias del proyecto ----->("start": "node --watch index.js") 

//BONUS//
- config/firebase.js: Archivo que contendrá la configuración de firebase. Deberá inicializar la conexión con firebase.
- controllers/authController.js: Archivo que contendrá la lógica para manejar las solicitudes de autenticación. Devolverá las respuestas en formato HTML.
- routes/authRoutes.js: Archivo que contendrá la definición de las rutas para la autenticación. Este llama a los métodos del controlador.
- middlewares/authMiddleware.js: Archivo que contendrá el middleware para comprobar si el usuario está autenticado. Este buscará la sesión del usuario y, si no la encuentra, redirigirá al formulario de login.

******************************************************BBDD**********************************************************

Vamos a crear la base de datos en Atlas. Creamos un nuevo proyecto y lo desplegamos.

Una vez creada la base de datos, copiamos la uri y la guardamos en el archivo .env

MONGO_URI=<uri_bd_atlas>

****************************************************SERVIDOR*********************************************************
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

////////////PRODUCT////////////

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

POSTMAN: https://documenter.getpostman.com/view/40898562/2sAYXFhHDT


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



//////////////USER//////////////

- GET /register: devuelve formulario para crear usuario.

- POST /register: Comprobación de auténticación para continuar al login.

- GET /login: devuelve formulario para iniciar sesión.

- POST /login: Comprobación de auténticación para continuar al dashboard.

- POST /logout: cierra sesión.



*********************************************************CONTROLADORES**************************************************

///////Vista sin inciciar sesión /products//////// 

- showProducts: Devuelve la vista con todos los productos.

- showProductById: Devuelve la vista con el detalle de un producto.

- showProductByCategory: clasifica los productos por categoría.


///////Vista iniciando sesión /dashboard////////// 

- showProductsDashboard: Devuelve la vista con todos los productos.

- showProductByIdDashboard: Devuelve la vista con el detalle de un producto.

- showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.

- createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.

- showEditProduct: Devuelve la vista con el formulario para editar un producto.

- updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.

- deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.

- showProductByCategoryDashboard: clasifica los productos por categoría.



///////////////register, login, logout///////////// 

- register: permite al administrador registrarse si no tiene cuenta.

- registerPost: permite al administrador registrarse si no tiene cuenta.

- login: Comprobación de auténticación para continuar al login.

- loginPost: Comprobación de auténticación para continuar al dashboard.

- logoutPost: cerrar sessión.




///////////////variables y funciones necesarias para introducir HTML en el código///////////// 

- baseHtml: html común a todas las páginas. Contiene la importación de estilos CSS así como biblioteca para íconos.https://fonts.google.com/

- getNavBar: Genera la barra de navegación con las categorías. 

- getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos (sin opción a editar/eliminar) ya que no ha iniciado sesión.

- getProductCardsDashboard:  Genera el html de los productos pero con vista administrador (opción editar/eliminar) ya que sí ha iniciado sesión.

- formEditProduct: formulario para actualizar/modificar producto.

- formCreateProduct: formulario para crear producto.

- registerForm: formulario para registrar usuario.

- loginForm: formulario para iniciar sesión.





***********************************************************DESPLIEGUE******************************************************

Creamos un nuevo proyecto en render y desplegamos el proyecto desde github. Recordad añadir las variables de entorno en render. Si no aparece el repositorio en render, tendremos que modificar los permisos de render para que pueda acceder al repositorio.














*********************************************************BONUS****************************************************************

Bonus 1 - Tests
Para poder comprobar que el controlador de productos funciona correctamente, vamos a crear tests para las funciones. Para ello, necesitaremos instalar el paquete jest y crear el archivo productController.test.js en la carpeta test. En este archivo, importaremos el controlador y crearemos los tests. Podemos hacer tests tanto para las funciones que devuelven html como para las funciones que crean, actualizan o eliminan productos.

Bonus 2 - API y documentación con Swagger
Para poder usar la aplicación con un frontend en React, vamos a crear una API que haga las mismas operaciones que el controlador de productos, pero que devuelva los datos en formato JSON. Documentaremos la API con Swagger, para que sea más fácil de entender y usar.

Bonus 3 - Autenticación con Firebase
Crearemos un usuario administrador para que pueda subir desde el dashboard más productos. Esas rutas deberán estar protegidas para que solo pueda entrar quien esté logado y pueda acceder a esos elementos para crearlos, verlos, actualizarlos y borrarlos. Podéis ver la manera de poder hacer esta autenticación con firebase aquí:

VIDEO: https://drive.google.com/file/d/1LMYwYofSomhtgf63FhhOQNwyu6kVM24B/view
REPO: https://github.com/CarlosDiazGirol/firebase-example-log además de todo el código está el paso a paso desde firebase
Recordad que los datos del serviceAccountestán protegidos y debes tenerlos en el archivo .env

También en este repo hay un ejemplo de viewsde como acceder a la carpeta public para hacer accesible esos archivos estáticos express.static.

