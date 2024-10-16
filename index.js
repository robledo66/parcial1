const express = require ('express');
const path = require('path');


// App de express

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuro la carpeta public para servir archivos estaticos por ejemplo el index.html

app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal que sera para el archivo html

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Defino el puerto que correrá el servidor 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// rutas de películas


const peliculas = [
    {id: 1, titulo: 'Inception', director: 'Christopher Nolan', año: 2010},
    {id: 2, titulo: 'The matrix', director: 'Lana Wachowski, Lilly Wachowski', año: 1999},
    {id: 3, titulo: 'Interstellar', director: 'Christopher Nolan', año: 2014}


];


// Obtener todas las películas

app.get('/peliculas', (req,res) => {
    res.json(peliculas);

});


// Obtener una pelicula por ID

app.get('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === id);

    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
});
// Ruta para directores

app.get('/directores', (res,req) => {
    const directores = peliculas.map(p => p.director);
    res.json(directores);
});

// Ruta para actualizar una pelicula por su ID

app.put('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const pelicula = peliculas.find(p => p.id === id);  

    if (pelicula) {
        
        const { titulo, director, año } = req.body; 

        if (titulo) pelicula.titulo = titulo;  
        if (director) pelicula.director = director;  
        if (año) pelicula.año = año;  

        res.json({ mensaje: 'Pelicula actualizada con éxito', pelicula });  
    } else {
        res.status(404).json({ mensaje: 'Pelicula no encontrada' });  
    }
});


// Ruta para eliminar una pelicula por su ID 

app.delete('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);  
    const index = peliculas.findIndex(p => p.id === id);  

    if (index !== -1) {
        peliculas.splice(index, 1);  
        res.json({ mensaje: 'Película eliminada' });  
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });  
    }
});