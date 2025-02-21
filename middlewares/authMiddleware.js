//./index.js
//middlewares/authMiddleware.js: Archivo que contendrá el middleware para comprobar si el usuario está autenticado. Este buscará la sesión del usuario y, si no la encuentra, redirigirá al formulario de login.

const { getApps, initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
if (!getApps().length) initializeApp();
const auth = admin.auth();

const authVerification = (req, res, next) => {
    const tokenCookie = req.cookies.token;

    if(!tokenCookie) {
        res.redirect('/login')
    }

    auth.verifyIdToken(tokenCookie)
    .then((decodedToken) => {
        req.user = decodedToken;
        next()
    })
    .catch((error) => {
        console.error(`Error al verificar el token de las cookies: ${error}`)
    })
}

module.exports = authVerification;