

import express from 'express';
import { register, verifyEmail, forgotCredentials, resetAccount,login,logout } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas para registro e inicio de sesión
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email/{token}', verifyEmail);
router.post('/recuperar-cuenta', forgotCredentials);
router.post('/reset-account', resetAccount);



router.post('/logout', authenticateJWT, logout);

// Rutas protegidas que requieren autenticación
router.get('/protected-route', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'Acceso a ruta protegida' });
});

export default router;
