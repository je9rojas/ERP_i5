// Ruta: back-end/purchases/routes/purchaseRoutes.js

const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase'); // Modelo de datos para las compras

// Ruta para obtener compras con filtros de búsqueda y paginación
router.get('/', async (req, res) => {
  const { startDate, endDate, page = 1, limit = 50 } = req.query;

  // Construir la consulta según los filtros proporcionados
  const query = {};
  if (startDate && endDate) {
    query.purchaseDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  try {
    // Obtener las compras según la consulta, ordenadas por fecha descendente
    const purchases = await Purchase.find(query)
      .sort({ purchaseDate: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Obtener el número total de compras que cumplen con la consulta
    const total = await Purchase.countDocuments(query);

    res.json({ purchases, total }); // Enviar los datos al cliente
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
});

module.exports = router;
