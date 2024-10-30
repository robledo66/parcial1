// routes/directoresRoutes.js
import express from 'express';
import {
    obtenerDirectores,
    obtenerDirectorPorId,
    agregarDirector,
    actualizarDirector,
    eliminarDirector
} from '../controllers/directoresController.js';

const router = express.Router();

// Ruta para obtener todos los directores
router.get('/', obtenerDirectores);

// Ruta para obtener un director por ID
router.get('/:id', obtenerDirectorPorId);

// Ruta para agregar un nuevo director
router.post('/', agregarDirector);

// Ruta para actualizar un director existente
router.put('/:id', actualizarDirector);

// Ruta para eliminar un director
router.delete('/:id', eliminarDirector);

export default router;
