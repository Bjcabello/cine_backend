import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import { pool } from '../database/db';

export const crearPelicula: RequestHandler = async (req, res) => {
  const { nombre, duracion } = req.body;
  if (!nombre || !duracion) {
    res.status(400).json({ mensaje: 'Nombre y duración requeridos' });
    return;
  }
  try {
    const resultado = await pool.query(
      'INSERT INTO pelicula (nombre, duracion) VALUES ($1, $2) RETURNING *',
      [nombre, duracion]
    );
     res.status(201).json({
      mensaje: 'Película creada correctamente',
      pelicula: resultado.rows[0],
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la película' });
  }
};

export const obtenerPeliculas: RequestHandler = async (_req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM pelicula');
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las películas' });
  }
};

export const obtenerPeliculaPorId: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('SELECT * FROM pelicula WHERE id_pelicula = $1', [id]);
    if (resultado.rowCount === 0) {
      res.status(404).json({ mensaje: 'Película no encontrada' });
      return;
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la película' });
  }
};


export const actualizarPelicula = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nombre, duracion } = req.body;

  try {
    const resultado = await pool.query(
      'UPDATE pelicula SET nombre = $1, duracion = $2 WHERE id_pelicula = $3 RETURNING *',
      [nombre, duracion, id]
    );

    if (resultado.rowCount === 0) {
      res.status(404).json({ mensaje: 'Película no encontrada' });
      return;
    }

    res.json({
      mensaje: 'Película actualizada correctamente',
      data: resultado.rows[0],
    });
  } catch (error) {
    console.error('Error al actualizar la película:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la película' });
  }
};

export const eliminarPelicula: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      'DELETE FROM pelicula WHERE id_pelicula = $1 RETURNING *',
      [id]
    );
    if (resultado.rowCount === 0) {
      res.status(404).json({ mensaje: 'Película no encontrada' });
      return;
    }
    res.json({ mensaje: 'Película eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la película' });
  }
};

export const buscarPeliculasPorNombre: RequestHandler = async (req, res) => {
  const { nombre } = req.query;
  if (!nombre) {
    res.status(400).json({ mensaje: 'Debe proporcionar el nombre' });
    return;
  }
  try {
    const resultado = await pool.query(
      'SELECT * FROM pelicula WHERE LOWER(nombre) LIKE LOWER($1)',
      [`%${nombre}%`]
    );
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar la película' });
  }
};