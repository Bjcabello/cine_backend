import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cine Backend',
      version: '1.0.0',
      description: 'Documentación de la API del sistema de gestión de salas de cine',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },
  apis: ['src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJSDoc(options);
