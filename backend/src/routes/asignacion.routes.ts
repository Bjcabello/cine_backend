import { Router } from 'express';
import {
  asignarPeliculaASala,
  obtenerPeliculasPorFecha,
  verificarEstadoSala
} from '../controllers/asignacion.controller';

const router = Router();

/**
 * @swagger
 * /asignaciones:
 *   post:
 *     summary: Asignar una película a una sala de cine
 *     tags: [Asignaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_pelicula
 *               - id_sala_cine
 *               - fecha_publicacion
 *               - fecha_fin
 *             properties:
 *               id_pelicula:
 *                 type: integer
 *               id_sala_cine:
 *                 type: integer
 *               fecha_publicacion:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Asignación creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', asignarPeliculaASala);

/**
 * @swagger
 * /asignaciones/fecha:
 *   get:
 *     summary: Obtener películas publicadas en una fecha específica
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: query
 *         name: fecha
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de publicación a consultar (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de películas publicadas en la fecha
 *       400:
 *         description: Fecha inválida
 */
router.get('/fecha', obtenerPeliculasPorFecha);

/**
 * @swagger
 * /asignaciones/estado/{nombre}:
 *   get:
 *     summary: Verificar el estado de disponibilidad de una sala por su nombre
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la sala de cine
 *     responses:
 *       200:
 *         description: Estado de disponibilidad de la sala
 *       404:
 *         description: Sala no encontrada
 */
router.get('/estado/:nombre', verificarEstadoSala);

export default router;
