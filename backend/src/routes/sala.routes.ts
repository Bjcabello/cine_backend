import { Router } from 'express';
import {
  crearSala,
  obtenerSalas,
  actualizarSala
} from '../controllers/sala.controller';

const router = Router();

/**
 * @swagger
 * /salas:
 *   post:
 *     summary: Crear una nueva sala de cine
 *     tags: [Salas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Sala 1
 *     responses:
 *       201:
 *         description: Sala creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', crearSala);

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Obtener todas las salas de cine
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Lista de salas de cine
 */
router.get('/', obtenerSalas);

/**
 * @swagger
 * /salas/{id}:
 *   put:
 *     summary: Actualizar una sala de cine por ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               estado:
 *                 type: string
 *                 example: disponible
 *     responses:
 *       200:
 *         description: Sala actualizada exitosamente
 *       404:
 *         description: Sala no encontrada
 */
router.put('/:id', actualizarSala);

export default router;
