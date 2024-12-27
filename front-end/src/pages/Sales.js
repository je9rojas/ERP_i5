// Ruta: front-end/src/pages/Sales.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sales() {
  // Estado para almacenar las ventas
  const [sales, setSales] = useState([]);

  // Estado para manejar los datos del formulario de búsqueda
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Número de ventas por página

  // Cargar todas las ventas al montar el componente
  useEffect(() => {
    fetchSales();
  }, []);

  // Función para cargar ventas desde el backend
  const fetchSales = (queryParams = {}) => {
    axios
      .get('http://localhost:3000/api/sales', { params: queryParams })
      .then((response) => {
        setSales(response.data.sales); // Asignar las ventas al estado
      })
      .catch((error) => console.error('Error al cargar las ventas:', error));
  };

  // Manejar el envío del formulario de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    fetchSales({ startDate: formData.startDate, endDate: formData.endDate });
  };

  // Obtener los índices para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sales.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(sales.length / itemsPerPage);

  // Cambiar de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Ventas</h1>

      {/* Formulario para buscar ventas por rango de fechas */}
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

      {/* Lista de ventas con paginación */}
      <h2>Lista de Ventas</h2>
      <ul>
        {currentItems.map((sale) => (
          <li key={sale.id_sales}>
            {sale.product_code} - {sale.product_type} - {sale.brand} - 
            {sale.quantity} - {sale.price} - {sale.saleDate}
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

export default Sales;
