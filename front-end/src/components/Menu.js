// Ruta: front-end/src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <ul>
        <li><Link to="/purchases">Compras</Link></li>
        <li><Link to="/sales">Ventas</Link></li>
        <li><Link to="/inventory">Inventario</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;
