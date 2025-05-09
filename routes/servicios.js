//   archivo de routes/servicios.js
import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js";

import {
  userMe,
  store,
  show,
  update,
  destroy,
  index,
 

} from "../controllers/ServicioController.js";

const router = express.Router();

//router.use(authenticateJWT);
router.get("/todos-los-servicios", authenticateJWT, index);
router.get("/servicios-me", authenticateJWT, userMe);
router.post("/servicios", authenticateJWT, store);
router.get("/servicios/:id", authenticateJWT, show);
router.put("/servicios/:id", authenticateJWT, update);
router.delete("/servicios/:id",authenticateJWT,  destroy);


export default router;
