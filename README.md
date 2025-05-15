# node.js

        Este proyecto permite:

        - Crear , leer , actualizar y eliminar películas  
        - Buscar película por el nombre.
        - Presente las películas que se publican en una fecha
        - Buscar por el nombre de la sala de cine y presentar la siguiente información
            en los siguientes casos:
            ❖ Si la sala de cine tiene menos de 3 películas presente un mensaje
            “Sala disponible” REQUERIDO
            ❖ Si la sala de cine tiene entre 3 y 5 películas, presente “Sala con [n]
            películas asignadas” REQUERIDO
            ❖ Si la sala de cine tiene más de 5 películas presente “Sala no
            disponible” REQUERIDO

Dependencias principales:

    express .
    pg
    cors
    dotenv
    morgan
    swagger-jsdoc
    swagger-ui-express

 Dependencias de desarrollo:

    typescript
    ts-node-dev
    @types/express
    @types/node
    @types/cors
    @types/swagger-jsdoc
    @types/swagger-ui-express
    @types/pg

    arranca el backend
    npm run dev
