// Ruta: front-end/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Purchases from './pages/Purchases';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';

function App() {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/" element={<h1>Bienvenido al Dashboard ERP_i5</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
