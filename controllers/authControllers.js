//BONUS
//controllers/authController.js: Archivo que contendrá la lógica para manejar las solicitudes de autenticación. 
// Devolverá las respuestas en formato HTML.

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const admin = require('firebase-admin');
admin.initializeApp()
const auth = admin.auth();
const baseHtml = require('./productController');
require('dotenv').config();

const firebaseConfig = {
  apiKey: "AIzaSyAgMn9edGTbdK19-esx8CEJ9cwZ3xPYdOU",
  authDomain: "projectbreak2-943b5.firebaseapp.com",
  projectId: "projectbreak2-943b5",
  storageBucket: "projectbreak2-943b5.firebasestorage.app",
  messagingSenderId: "7064897938",
  appId: "1:7064897938:web:59668e8108dc4caf51d94b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authSignIn = getAuth(app);

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

  try {
          
    const {email, password} = req.body;
    const userCredential = await signInWithEmailAndPassword(authSignIn, email, password);
    const user = userCredential.user;

    const idToken = await user.getIdToken();
    console.log('Token enviado', idToken);
  
    const response = await fetch(`http://localhost:${process.env.PORT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({idToken})
    })
  
    console.log('Cuerpo de la solicitud enviado', {idToken})
  
    const data = await response.json();
  
    //console.log('Datos recibidos en /login:', req.body);

    if(!idToken) {
      return res.status(400).json({success: false, message: 'Token no recibido'})
    }

    await auth.verifyIdToken(idToken);
    
    res.cookie('token', idToken, {httpOnly: true, secure: false});
    
    res.redirect('/dashboard');

  } catch (error) {
    console.log(`Error al verificar el administrador, ${error}`);
    res.status(401).json({success: false, message: 'Token inválido'})
  }
}

//Formulario de Register
const registerForm = `
  <body>
    <h1>Register</h1>
    <form id='registerForm' action='/register' method='post'>
      <label for='email'>Introduce tu correo electrónico: </label>
      <input type='email' name='email' id='email' required>

      <label for='password'>Introduce tu correo contraseña: </label>
      <input type='password' name='password' id='password' required>

      <button type='submit' id='loginButton'>Registrar</button>
    </form>

    <script type='module' src='../config/configLogin1.js'></script>
  </body>
  `
//Formulario de Login
const loginForm = `
  <body>
    <h1>Login</h1>
    <form id='loginForm' action='/login' method='post'>
      <label for='email'>Introduce tu correo electrónico: </label>
      <input type='email' name='email' id='email' required>

      <label for='password'>Introduce tu correo contraseña: </label>
      <input type='password' name='password' id='password' required>

      <button type='submit' id='loginButton'>Iniciar sesión</button>
    </form>

    <div id='mensajeLogin'>
        
      <!--Mensaje de cuando iniciamos sesión -->
      
    </div>

    <script type='module' src='/authControllers.js'></script>
  </body>

`

module.exports = {
  register,
  registerPost,
  login,
  loginPost
}