// Ruta: front-end/src/pages/Inventory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Inventory() {
  // Estado para almacenar los productos en inventario
  const [inventory, setInventory] = useState([]);

  // Estado para buscar productos por nombre
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar el inventario al montar el componente
  useEffect(() => {
    fetchInventory();
  }, []);

  // Función para cargar inventario desde el backend
  const fetchInventory = () => {
    axios
      .get('http://localhost:3000/api/inventory')
      .then((response) => {
        setInventory(response.data.inventory);
      })
      .catch((error) => console.error('Error al cargar el inventario:', error));
  };

  // Filtrar productos por nombre
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Inventario</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Lista de productos */}
      <h2>Lista de Productos</h2>
      <ul>
        {filteredInventory.map((item) => (
          <li key={item.id_inventory}>
            {item.name} - {item.category} - {item.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
