// Ruta: front-end/src/pages/Purchases.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Para realizar solicitudes HTTP al backend

function Purchases() {
  // Estado para almacenar las compras cargadas desde el backend
  const [purchases, setPurchases] = useState([]);
  
  // Estado para manejar los datos del formulario de búsqueda por rango de fechas
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Número de compras por página

  // Cargar todas las compras al montar el componente
  useEffect(() => {
    fetchPurchases();
  }, []);

  // Función para cargar compras desde el backend
  const fetchPurchases = (queryParams = {}) => {
    axios
      .get('http://localhost:3000/api/purchases', { params: queryParams })
      .then((response) => {
        setPurchases(response.data.purchases); // Asignar los datos al estado
      })
      .catch((error) => console.error('Error al cargar las compras:', error));
  };

  // Manejar el envío del formulario de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPurchases({ startDate: formData.startDate, endDate: formData.endDate });
  };

  // Obtener el índice de los elementos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchases.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(purchases.length / itemsPerPage);

  // Cambiar de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Compras</h1>

      {/* Formulario para buscar por rango de fechas */}
      <form onSubmit={handleSearch}>
        <label>
          Fecha de inicio:
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </label>
        <label>
          Fecha de fin:
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </label>
        <button type="submit">Buscar</button>
      </form>

      {/* Lista de compras con paginación */}
      <h2>Lista de Compras</h2>
      <ul>
        {currentItems.map((purchase) => (
          <li key={purchase.id_purchases}>
            {purchase.product_code} - {purchase.product_type} - {purchase.brand} - 
            {purchase.quantity} - {purchase.price} - {purchase.purchaseDate}
          </li>
        ))}
      </ul>

      {/* Controles de paginación */}
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Purchases;
