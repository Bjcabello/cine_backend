// src/controllers/sala.controller.ts
import { RequestHandler } from 'express';
import {pool} from '../database/db';

export const crearSala: RequestHandler = async (req, res) => {
  const { nombre, estado } = req.body;
  if (!nombre) {
    res.status(400).json({ mensaje: 'Nombre requerido' });
    return;
  }
  try {
    const resultado = await pool.query(
      'INSERT INTO sala_cine (nombre, estado) VALUES ($1, $2) RETURNING *',
      [nombre, estado || 'disponible']
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la sala' });
  }
};

export const obtenerSalas: RequestHandler = async (_req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM sala_cine');
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener salas' });
  }
};

export const actualizarSala: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;
  try {
    const resultado = await pool.query(
      'UPDATE sala_cine SET nombre = $1, estado = $2 WHERE id_sala = $3 RETURNING *',
      [nombre, estado, id]
    );
    if (resultado.rowCount === 0) {
      res.status(404).json({ mensaje: 'Sala no encontrada' });
      return;
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la sala' });
  }
};