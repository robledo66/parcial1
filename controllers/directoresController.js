// controllers/directoresController.js

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
const obtenerDirectores = (req, res) => {
    res.status(200).json(directores);
};

// Obtener un director por ID
const obtenerDirectorPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const director = directores.find(d => d.id === id);

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(404).json({ mensaje: 'Director no encontrado' });
    }
};

// Agregar un nuevo director
const agregarDirector = (req, res) => {
    const { nombre, nacionalidad, peliculasDirigidas } = req.body;
    const nuevoDirector = {
        id: directores.length + 1,
        nombre,
        nacionalidad,
        peliculasDirigidas
    };
    directores.push(nuevoDirector);
    res.status(201).json({ mensaje: 'Director agregado con éxito', director: nuevoDirector });
};

// Actualizar un director
const actualizarDirector = (req, res) => {
    const id = parseInt(req.params.id);
    const director = directores.find(d => d.id === id);

    if (director) {
        const { nombre, nacionalidad, peliculasDirigidas } = req.body;
        if (nombre) director.nombre = nombre;
        if (nacionalidad) director.nacionalidad = nacionalidad;
        if (peliculasDirigidas) director.peliculasDirigidas = peliculasDirigidas;

        res.status(200).json({ mensaje: 'Director actualizado con éxito', director });
    } else {
        res.status(404).json({ mensaje: 'Director no encontrado' });
    }
};

// Eliminar un director
const eliminarDirector = (req, res) => {
    const id = parseInt(req.params.id);
    const indice = directores.findIndex(d => d.id === id);

    if (indice !== -1) {
        directores.splice(indice, 1);
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).json({ mensaje: 'Director no encontrado' });
    }
};

// Exportación de las funciones
export { obtenerDirectores, obtenerDirectorPorId, agregarDirector, actualizarDirector, eliminarDirector };
