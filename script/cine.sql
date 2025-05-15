-- CREACIÓN DE TABLAS

-- Tabla de películas
CREATE TABLE pelicula (
  id_pelicula SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  duracion INT NOT NULL
);

-- Tabla de salas de cine
CREATE TABLE sala_cine (
  id_sala SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  estado BOOLEAN DEFAULT TRUE
);

-- Tabla de asignación película-sala
CREATE TABLE pelicula_sala_cine (
  id_pelicula_sala SERIAL PRIMARY KEY,
  id_pelicula INT REFERENCES pelicula(id_pelicula),
  id_sala_cine INT REFERENCES sala_cine(id_sala),
  fecha_publicacion DATE NOT NULL,
  fecha_fin DATE NOT NULL
);

-- INSERCIÓN DE DATOS DE EJEMPLO

-- Insertar salas
INSERT INTO sala_cine (nombre, estado) VALUES
  ('Sala 1', true),
  ('Sala 2', true),
  ('Sala 3', true);

-- Insertar películas
INSERT INTO pelicula (nombre, duracion) VALUES
  ('Avengers: Endgame', 180),
  ('Inception', 148),
  ('Interstellar', 169),
  ('Iron Man', 126),
  ('Black Panther', 134),
  ('Thor: Ragnarok', 130),
  ('The Matrix', 136),
  ('Dune', 155),
  ('Joker', 122);

-- Asignar películas a salas
INSERT INTO pelicula_sala_cine (id_pelicula, id_sala_cine, fecha_publicacion, fecha_fin) VALUES
  (1, 1, '2025-05-01', '2025-05-15'),
  (2, 1, '2025-05-05', '2025-05-20'),
  (3, 1, '2025-05-08', '2025-05-22'),
  (4, 2, '2025-05-02', '2025-05-16'),
  (5, 2, '2025-05-06', '2025-05-21'),
  (6, 2, '2025-05-10', '2025-05-24'),
  (7, 3, '2025-05-03', '2025-05-17'),
  (8, 3, '2025-05-07', '2025-05-21'),
  (9, 3, '2025-05-11', '2025-05-25');

-- FUNCIÓN PARA CONTAR PELÍCULAS POR SALA

CREATE OR REPLACE FUNCTION contar_peliculas_por_sala(nombre_sala TEXT)
RETURNS INT AS $$
DECLARE
  cantidad INT;
BEGIN
  SELECT COUNT(*) INTO cantidad
  FROM pelicula_sala_cine ps
  JOIN sala_cine s ON s.id_sala = ps.id_sala_cine
  WHERE LOWER(s.nombre) = LOWER(nombre_sala);
  RETURN cantidad;
END;
$$ LANGUAGE plpgsql;

