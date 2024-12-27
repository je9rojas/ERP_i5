// Ruta: back-end/purchases/app.js

// Importación de dependencias
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../shared/database'); // Ruta relativa al archivo de conexión

// Configuración del entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

// Inicialización de la aplicación
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para procesar solicitudes JSON

// Ruta principal del microservicio
app.get('/', (req, res) => {
    res.send('Microservicio de compras está funcionando');
});

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de compras corriendo en el puerto ${PORT}`);
});
