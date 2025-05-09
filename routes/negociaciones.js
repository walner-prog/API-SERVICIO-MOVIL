//   archivo de routes/negociaciones.js
import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js";

import {
  userMe,
  store,
  show,
  update,
  destroy,
  index,
 

} from "../controllers/NegociacionController.js";

const router = express.Router();

//router.use(authenticateJWT);
router.get("/todas-las-negociaciones", authenticateJWT, index);
router.get("/negociaciones-me", authenticateJWT, userMe);
router.post("/negociaciones", authenticateJWT, store);
router.get("/negociaciones/:id", authenticateJWT, show);
router.put("/negociaciones/:id", authenticateJWT, update);
router.delete("/negociaciones/:id",authenticateJWT,  destroy);


export default router;
