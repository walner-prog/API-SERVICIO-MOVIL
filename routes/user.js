import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import multer from "multer";
import {
  me,
  actualizarPerfil,
  eliminarCuenta,
  reactivarCuenta,
} from "../controllers/userController.js";



const router = express.Router();

// Ruta protegida para obtener datos del usuario autenticado
router.get("/miperfil", authenticateJWT, me);

// Actualizar perfil (opcionalmente con imagen)
router.put("/me", authenticateJWT, actualizarPerfil);

// Eliminar/desactivar cuenta (soft delete)
router.delete("/me", authenticateJWT, eliminarCuenta);

// Reactivar cuenta con username + password
router.post("/reactivar", reactivarCuenta);

export default router;
