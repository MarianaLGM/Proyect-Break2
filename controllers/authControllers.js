//BONUS
//controllers/authController.js: Archivo que contendrá la lógica para manejar las solicitudes de autenticación. 
// Devolverá las respuestas en formato HTML.

const admin = require('firebase-admin');
admin.initializeApp()
const auth = admin.auth();
//const baseHtml = require('./productController');


//Envío de formulario para register
const register = (req, res) => {
  const html = baseHtml + registerForm
  res.send(html);
}

//Comprobación de auténticación para continuar al login
const registerPost = async (req, res) => {
  const {email, password} = req.body;

  try {
    await auth.createUser({
      email,
      password
    })

    res.redirect('/login')

  } catch (error) {
    console.error(`Error interno de registro: ${error}`);
    res.redirect('/register')
  }
}

//Envío de formulario para login
const login = (req, res) => {
  const html = baseHtml + loginForm
  res.send(html);
}

//Comprobación de auténticación para continuar al dashboard
const loginPost = async (req, res) => {
  console.log('Datos recibidos en /login:', req.body);

  const {idToken} = req.body;

  if(!idToken) {
    return res.status(400).json({success: false, message: 'Token no recibido'})
  }

  try {
    await auth.verifyIdToken(idToken);
    
    res.cookie('token', idToken, {httpOnly: true, secure: false});
    
    res.json({success: true});

  } catch (error) {
    console.log(`Error al verificar el administrador, ${error}`);
    res.status(401).json({success: false, message: 'Token inválido'})
  }
}

//Formulario de Register
const registerForm = `
<body>
  <div class="register">
    <h2>Crea tu cuenta</h2>
      <form class='registerForm' action='/register' method='post'>
        <label for='email'></label>
        <input type='email' name='email' class='email' placeholder='Correo electrónico' required>

        <label for='password'></label>
        <input type='password' name='password' class='password' placeholder="Contraseña" required>
      </form>

      <button type='submit' class='registerButton'>Crear cuenta</button>
      
    </div>
  <script type='module' src='../config/configLogin.js'></script>
</body>

`
//Formulario de Login
const loginForm = `
  <body>
    <div class="login">
      <h2>Iniciar sesión</h2>
        <form class='loginForm' method='post'>
          <label for='email'</label>
          <input type='email' name='email' class='email' placeholder='Correo electrónico' required>

          <label for='password'></label>
          <input type='password' name='password' class='password'  placeholder="Contraseña" required>
        </form>

        <button type='submit' class='loginButton'>Iniciar sesión</button>

        <h3>¿Todavía no tienes una cuenta?</h3>
        <a href="/register" class='register' >¡Regístrate!</a>
        
      </div>
    <div id='mensajeLogin'>
        
      <!--Mensaje de cuando iniciamos sesión -->
      
    </div>

    <script type='module' src='../config/configLogin.js'></script>
  </body>

`
//baseHtml: html común a todas las páginas. Puede contener elementos como la importación de estilos, etc.
const baseHtml =
`
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Tienda de ropa online</title>
            <link rel="stylesheet" href="/style.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        </head>
    </html>
`;

module.exports = {
  register,
  registerPost,
  login,
  loginPost
}