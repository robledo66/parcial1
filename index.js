import express from 'express';
import peliculasRoutes from './routes/peliculasRoutes.js';
import directoresRoutes from './routes/directoresRoutes.js';

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Rutas de películas
app.use('/peliculas', peliculasRoutes);

// Rutas de directores
app.use('/directores', directoresRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
