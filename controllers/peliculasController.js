// controllers/peliculasController.js

import dotenv from 'dotenv';

dotenv.config();

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
const obtenerPeliculas = (req, res) => {
    res.status(200).json(peliculas);
};

// Obtener una película por ID
const obtenerPeliculaPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === id);

    if (pelicula) {
        res.status(200).json(pelicula);
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
};

// Agregar una nueva película
const agregarPelicula = (req, res) => {
    const { titulo, director, año } = req.body;
    const nuevaPelicula = {
        id: peliculas.length + 1,
        titulo,
        director,
        año
    };
    peliculas.push(nuevaPelicula);
    res.status(201).json({ mensaje: 'Película agregada con éxito', pelicula: nuevaPelicula });
};

// Actualizar una película por su ID
const actualizarPelicula = (req, res) => {
    const id = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === id);

    if (pelicula) {
        const { titulo, director, año } = req.body;

        if (titulo) pelicula.titulo = titulo;
        if (director) pelicula.director = director;
        if (año) pelicula.año = año;

        res.status(200).json({ mensaje: 'Película actualizada con éxito', pelicula });
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
};

// Eliminar una película por su ID
const eliminarPelicula = (req, res) => {
    const id = parseInt(req.params.id);
    const index = peliculas.findIndex(p => p.id === id);

    if (index !== -1) {
        peliculas.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
};

// Exportación de las funciones individualmente
export { obtenerPeliculas, obtenerPeliculaPorId, agregarPelicula, actualizarPelicula, eliminarPelicula };
