import { RequestHandler } from 'express';
import {pool} from '../database/db';  

export const asignarPeliculaASala: RequestHandler = async (req, res) => {
  const { id_pelicula, id_sala_cine, fecha_publicacion, fecha_fin } = req.body;
  if (!id_pelicula || !id_sala_cine || !fecha_publicacion || !fecha_fin) {
    res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    return;
  }
  try {
    const resultado = await pool.query(
      'INSERT INTO pelicula_sala_cine (id_pelicula, id_sala_cine, fecha_publicacion, fecha_fin) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_pelicula, id_sala_cine, fecha_publicacion, fecha_fin]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al asignar película a sala' });
  }
};

export const obtenerPeliculasPorFecha: RequestHandler = async (req, res) => {
  const { fecha } = req.query;
  if (!fecha || typeof fecha !== 'string') {
    res.status(400).json({ mensaje: 'Debe proporcionar una fecha válida' });
    return;
  }
  try {
    const resultado = await pool.query(
      `SELECT p.* FROM pelicula_sala_cine ps
       JOIN pelicula p ON p.id_pelicula = ps.id_pelicula
       WHERE ps.fecha_publicacion = $1`,
      [fecha]
    );
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener películas por fecha' });
  }
};

export const verificarEstadoSala: RequestHandler = async (req, res) => {
  const { nombre } = req.params;
  try {
    const resultado = await pool.query(
      `SELECT COUNT(*) FROM pelicula_sala_cine ps
       JOIN sala_cine s ON s.id_sala = ps.id_sala_cine
       WHERE LOWER(s.nombre) = LOWER($1)`,
      [nombre]
    );
    const cantidad = parseInt(resultado.rows[0].count);
    if (cantidad < 3) {
      res.json({ mensaje: 'Sala disponible' });
    } else if (cantidad <= 5) {
      res.json({ mensaje: `Sala con ${cantidad} películas asignadas` });
    } else {
      res.json({ mensaje: 'Sala no disponible' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al verificar estado de sala' });
  }
};

