import React from 'react';

function StockSection({ stock, handleStockSubmit, nuevoStock, handleStockChange, productosDisponibles, buscaStock, setBuscaStock }) {
  // Agrupar stock por producto
  const stockAgrupado = stock.reduce((acc, s) => {
    const productoInfo = s.productoInfo || {};
    const sku = productoInfo.sku;
    if (!sku) return acc;
    
    if (!acc[sku]) {
      acc[sku] = {
        sku: sku,
        nombre: productoInfo.nombre,
        cantidad: 0
      };
    }
    acc[sku].cantidad += s.cantidad;
    return acc;
  }, {});

  // Convertir a array y filtrar
  const stockFiltrado = Object.values(stockAgrupado)
    .filter(item => 
      !buscaStock || 
      item.nombre.toLowerCase().includes(buscaStock.toLowerCase()) ||
      item.sku.toLowerCase().includes(buscaStock.toLowerCase())
    );

  return (
    <section>
      <h2>Stock</h2>
      <form onSubmit={handleStockSubmit} style={{ marginBottom: 16 }}>
        <select 
          name="producto" 
          value={nuevoStock.producto} 
          onChange={handleStockChange}
          required
          style={{ padding: '4px', marginRight: '8px' }}
        >
          <option value="">Seleccione un producto</option>
          {productosDisponibles.map(p => (
            <option key={p.id} value={p.sku}>
              {p.sku} - {p.nombre}
            </option>
          ))}
        </select>
        <input 
          name="cantidad" 
          type="number" 
          placeholder="Cantidad" 
          value={nuevoStock.cantidad} 
          onChange={handleStockChange}
          required
          min="1"
        />{' '}
        <button type="submit">Agregar</button>
      </form>
      
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Buscar por nombre o SKU"
          value={buscaStock}
          onChange={e => setBuscaStock(e.target.value)}
          style={{ width: 220, padding: '4px' }}
        />
      </div>

      <table border="1" cellPadding="6" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Cantidad Total</th>
          </tr>
        </thead>
        <tbody>
          {stockFiltrado.map(item => (
            <tr key={item.sku}>
              <td>{item.sku}</td>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default StockSection;