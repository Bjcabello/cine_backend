import { RequestHandler } from 'express';
import { pool } from '../database/db'; 

export const obtenerIndicadores: RequestHandler = async (_req, res) => {
  try {
    const totalSalas = await pool.query('SELECT COUNT(*) FROM sala_cine');
    const salasDisponibles = await pool.query('SELECT COUNT(*) FROM sala_cine WHERE estado = true');
    const totalPeliculas = await pool.query('SELECT COUNT(*) FROM pelicula');

    res.json({
      totalSalas: parseInt(totalSalas.rows[0].count),
      salasDisponibles: parseInt(salasDisponibles.rows[0].count),
      totalPeliculas: parseInt(totalPeliculas.rows[0].count)
    });
  } catch (error) {
    console.error('Error al obtener indicadores del dashboard:', error);
    res.status(500).json({ mensaje: 'Error al obtener indicadores' });
  }
};
