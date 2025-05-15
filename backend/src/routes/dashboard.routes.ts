import { Router } from 'express';
import { obtenerIndicadores } from '../controllers/dashboard.controller';

const router = Router();

/**
 * @swagger
 * /dashboard/indicadores:
 *   get:
 *     summary: Obtener indicadores del dashboard
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Indicadores obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSalas:
 *                   type: integer
 *                 salasDisponibles:
 *                   type: integer
 *                 totalPeliculas:
 *                   type: integer
 */

router.get('/indicadores', obtenerIndicadores);

export default router;
