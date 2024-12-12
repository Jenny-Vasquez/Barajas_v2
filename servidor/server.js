const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Habilitamos CORS para todas las rutas
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener las cartas
app.get('/cards', (req, res) => {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    
    // Crear las cartas
    const cards = suits.flatMap(suit =>
        values.map(value => {
            return {
                value,
                suit
            };
        })
    );

    res.json(cards);
});
///-----------------------------------------
let gameState = {}; // Objeto para almacenar el estado actual del juego

// Endpoint para guardar el estado actual
app.post('/save-state', express.json(), (req, res) => {
    gameState = req.body; // Guardamos el estado recibido
    res.status(200).send({ message: 'Estado guardado exitosamente' });
});

// Endpoint para recuperar el estado actual
app.get('/load-state', (req, res) => {
    res.json(gameState); // Enviamos el estado almacenado
});
//-----------------------------------------------------
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
