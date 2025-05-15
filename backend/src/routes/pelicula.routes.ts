import { Router } from 'express';
import {
  crearPelicula,
  obtenerPeliculas,
  obtenerPeliculaPorId,
  actualizarPelicula,
  eliminarPelicula,
  buscarPeliculasPorNombre
} from '../controllers/pelicula.controller';

const router = Router();

/**
 * @swagger
 * /peliculas:
 *   post:
 *     summary: Crear una nueva película
 *     tags: [Películas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - duracion
 *             properties:
 *               nombre:
 *                 type: string
 *               duracion:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 */
router.post('/', crearPelicula);

/**
 * @swagger
 * /peliculas:
 *   get:
 *     summary: Obtener todas las películas
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas
 */
router.get('/', obtenerPeliculas);

/**
 * @swagger
 * /peliculas/buscar:
 *   get:
 *     summary: Buscar películas por nombre
 *     tags: [Películas]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la película
 *     responses:
 *       200:
 *         description: Lista de películas que coinciden con el nombre
 *       400:
 *         description: Parámetro de búsqueda inválido
 */
router.get('/buscar', buscarPeliculasPorNombre);

/**
 * @swagger
 * /peliculas/{id}:
 *   get:
 *     summary: Obtener una película por ID
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película encontrada
 *       404:
 *         description: Película no encontrada
 */
router.get('/:id', obtenerPeliculaPorId);

/**
 * @swagger
 * /peliculas/{id}:
 *   put:
 *     summary: Actualizar una película
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la película
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               duracion:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Película actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Película no encontrada
 */
router.put('/:id', actualizarPelicula);

/**
 * @swagger
 * /peliculas/{id}:
 *   delete:
 *     summary: Eliminar una película (lógica)
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película eliminada
 *       404:
 *         description: Película no encontrada
 */
router.delete('/:id', eliminarPelicula);

export default router;
