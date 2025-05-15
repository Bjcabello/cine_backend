import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger';
import dashboardRoutes from './routes/dashboard.routes';
import peliculaRoutes from './routes/pelicula.routes';
import salaRoutes from './routes/sala.routes';
import asignacionRoutes from './routes/asignacion.routes';


const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/dashboard', dashboardRoutes);
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/salas', salaRoutes);
app.use('/api/asignaciones', asignacionRoutes);

export default app;
