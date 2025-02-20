//BONUS
//routes/authRoutes.js: Archivo que contendrá la definición de las rutas para la autenticación. 
// Este llama a los métodos del controlador.

const express = require("express");
const router = express.Router();
const authController = require('../controllers/authControllers');

router.get('/register', authController.register);
router.post('/register', authController.registerPost);
router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.post('/logout', authController.logoutPost);

module.exports = router;

