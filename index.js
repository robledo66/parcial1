import express from 'express';
import path from 'path';
import peliculasRoutes from './routes/peliculasRoutes.js';
import directoresRoutes from './routes/directoresRoutes.js';

const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Servir archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(process.cwd(), 'public')));

// Ruta principal - Sirve el archivo index.html cuando accedes a '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(),'parcial1', 'public', 'index.html'));
});

// Rutas de películas
app.use('/peliculas', peliculasRoutes);

// Rutas de directores
app.use('/directores', directoresRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
