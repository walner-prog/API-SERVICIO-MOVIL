

import express from 'express';
import authRoutes from './auth.js';

import uploadRoutes from './uploadRoutes.js'
import userRoutes from './user.js'
import vehiculoRoutes from './vehiculos.js'
import servicioRoutes from './servicios.js'
import negociacionRoutes from './negociaciones.js'
const router = express.Router();
router.use('/auth', authRoutes);

router.use('/', uploadRoutes)
router.use('/', userRoutes)
router.use('/', vehiculoRoutes)
router.use('/', servicioRoutes)
router.use('/', negociacionRoutes)

  
export default router;
