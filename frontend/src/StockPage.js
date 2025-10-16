import React, { useEffect, useState } from 'react';
import StockSection from './StockSection';


function StockPage(props) {
  const { usuario } = props;
  const [stock, setStock] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [nuevoStock, setNuevoStock] = useState({ producto: '', cantidad: '' });
  const [buscaStock, setBuscaStock] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('http://127.0.0.1:8000/api/stock/').then(r => r.json()),
      fetch('http://127.0.0.1:8000/api/productos/').then(r => r.json())
    ]).then(([stockData, productosData]) => {
      const stockConProducto = stockData.map(s => {
        const producto = productosData.find(p => p.id === s.producto);
        return { ...s, productoInfo: producto };
      });
      setStock(stockConProducto);
      setProductosDisponibles(productosData);
    }).catch(() => setError('No se pudo cargar el stock.'));
  }, []);

  const handleStockChange = e => setNuevoStock({ ...nuevoStock, [e.target.name]: e.target.value });
  const handleStockSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/stock/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoStock)
      });
      if (!res.ok) throw new Error();
      const st = await res.json();
      setStock(prev => {
        const producto = productosDisponibles.find(p => p.id === st.producto);
        return [...prev, { ...st, productoInfo: producto }];
      });
      setNuevoStock({ producto: '', cantidad: '' });
    } catch {
      setError('Error al agregar stock');
    }
  };

  return (
    <StockSection
      stock={stock}
      handleStockSubmit={handleStockSubmit}
      nuevoStock={nuevoStock}
      handleStockChange={handleStockChange}
      productosDisponibles={productosDisponibles}
      buscaStock={buscaStock}
      setBuscaStock={setBuscaStock}
      usuario={usuario}
    />
  );
}

export default StockPage;