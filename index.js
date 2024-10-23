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
    { id: 1, titulo: 'Inception', director: 'Christopher Nolan', año: 2010 },
    { id: 2, titulo: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski', año: 1999 },
    { id: 3, titulo: 'Interstellar', director: 'Christopher Nolan', año: 2014 },
    { id: 4, titulo: 'The Godfather', director: 'Francis Ford Coppola', año: 1972 },
    { id: 5, titulo: 'Pulp Fiction', director: 'Quentin Tarantino', año: 1994 },
    { id: 6, titulo: 'Fight Club', director: 'David Fincher', año: 1999 },
    { id: 7, titulo: 'The Dark Knight', director: 'Christopher Nolan', año: 2008 },
    { id: 8, titulo: 'Forrest Gump', director: 'Robert Zemeckis', año: 1994 },
    { id: 9, titulo: 'The Shawshank Redemption', director: 'Frank Darabont', año: 1994 },
    { id: 10, titulo: 'Schindler\'s List', director: 'Steven Spielberg', año: 1993 }
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
 






const directores = [
    { id: 1, nombre: 'Christopher Nolan', nacionalidad: 'Británico', peliculasDirigidas: ['Inception', 'Dunkirk'] },
    { id: 2, nombre: 'Lana Wachowski', nacionalidad: 'Americana', peliculasDirigidas: ['The Matrix', 'Cloud Atlas'] },
    { id: 3, nombre: 'Lilly Wachowski', nacionalidad: 'Americana', peliculasDirigidas: ['The Matrix', 'Cloud Atlas'] },
    { id: 4, nombre: 'Steven Spielberg', nacionalidad: 'Americano', peliculasDirigidas: ['Jurassic Park', 'E.T.'] },
    { id: 5, nombre: 'Martin Scorsese', nacionalidad: 'Americano', peliculasDirigidas: ['Goodfellas', 'Taxi Driver'] },
    { id: 6, nombre: 'Quentin Tarantino', nacionalidad: 'Americano', peliculasDirigidas: ['Pulp Fiction', 'Kill Bill'] },
    { id: 7, nombre: 'James Cameron', nacionalidad: 'Canadiense', peliculasDirigidas: ['Avatar', 'Titanic'] },
    { id: 8, nombre: 'David Fincher', nacionalidad: 'Americano', peliculasDirigidas: ['Fight Club', 'The Social Network'] },
    { id: 9, nombre: 'Ridley Scott', nacionalidad: 'Británico', peliculasDirigidas: ['Alien', 'Gladiator'] },
    { id: 10, nombre: 'Pedro Almodóvar', nacionalidad: 'Español', peliculasDirigidas: ['Talk to Her', 'Volver'] },
];


// Obtener todos los directores 
app.get('/directores', (req, res) => {
    res.json(directores);
});

// Obtener un director por ID
app.get('/directores/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    const director = directores.find(d => d.id === id);
    
    if (director) {
        res.json(director);
    } else {
        res.status(404).json({ mensaje: 'Director no encontrado' });
    }
});

// Agregar un nuevo director 
app.post('/directores', (req, res) => {
    const { nombre, nacionalidad, peliculasDirigidas } = req.body; 
    const nuevoDirector = { 
        id: directores.length + 1,
        nombre,
        nacionalidad,
        peliculasDirigidas
    };
    directores.push(nuevoDirector);
    res.status(201).json({ mensaje: 'Director agregado con éxito', director: nuevoDirector });
});

// Actualizar un director 
app.put('/directores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const director = directores.find(d => d.id === id); 

    if (director) {
        const { nombre, nacionalidad, peliculasDirigidas } = req.body;
        if (nombre) director.nombre = nombre;
        if (nacionalidad) director.nacionalidad = nacionalidad;
        if (peliculasDirigidas) director.peliculasDirigidas = peliculasDirigidas;

        res.json({ mensaje: 'Director actualizado con éxito', director });
    } else {
        res.status(404).json({ mensaje: 'Director no encontrado' });
    }
});

// Eliminar un director
app.delete('/directores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = directores.findIndex(d => d.id === id);

    if (indice !== -1) {
        directores.splice(indice, 1);
        res.json({ mensaje: 'Director eliminado con éxito' });
    } else {
        res.status(404).json({ mensaje: 'Director no encontrado' });
    }
});
