//   archivo de routes/vehiculos.js
import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js";

import {
  userMe,
  store,
  show,
  update,
  destroy,
  index,
 

} from "../controllers/VehiculoController.js";

const router = express.Router();

//router.use(authenticateJWT);
router.get("/todos-los-vehiculos", authenticateJWT, index);
router.get("/vehiculos-me", authenticateJWT, userMe);
router.post("/vehiculos", authenticateJWT, store);
router.get("/vehiculos/:id", authenticateJWT, show);
router.put("/vehiculos/:id", authenticateJWT, update);
router.delete("/vehiculos/:id",authenticateJWT,  destroy);


export default router;
