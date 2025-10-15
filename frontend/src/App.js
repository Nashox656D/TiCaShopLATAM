import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { fetchProductos, crearProducto } from './api';
import './App.css';
import Login from './Login';
import StockSection from './StockSection';
import ProductosPage from './ProductosPage';
import ClientesPage from './ClientesPage';
import StockPage from './StockPage';
import CotizacionesPage from './CotizacionesPage';
import OrdenesPage from './OrdenesPage';
import FacturasPage from './FacturasPage';
import EmpleadosPage from './EmpleadosPage';
import TicketsPage from './TicketsPage';

function App() {
  const [buscaStock, setBuscaStock] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('productos');
  // Productos
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ sku: '', nombre: '', precio: '', categoria: '' });
  // Clientes
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', rut: '', email: '' });
  // Stock
  const [stock, setStock] = useState([]);
  const [nuevoStock, setNuevoStock] = useState({ producto: '', cantidad: '' });
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  // Cotizaciones
  const [cotizaciones, setCotizaciones] = useState([]);
  const [nuevaCot, setNuevaCot] = useState({ cliente: '', total: '' });
  // Ordenes de compra
  const [ordenes, setOrdenes] = useState([]);
  const [nuevaOrden, setNuevaOrden] = useState({ proveedor: '', total: '' });
  // Facturas
  const [facturas, setFacturas] = useState([]);
  const [nuevaFactura, setNuevaFactura] = useState({ numero: '', cliente: '', monto: '' });
  // Empleados
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre: '', rut: '', cargo: '', email: '', fecha_ingreso: '' });
  // Tickets
  const [tickets, setTickets] = useState([]);
  const [nuevoTicket, setNuevoTicket] = useState({ titulo: '', descripcion: '' });
  // Errores
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    if (vista === 'productos') {
      fetchProductos()
        .then(setProductos)
        .catch(() => setError('No se pudieron cargar los productos.'));
    } else if (vista === 'clientes') {
      fetch('http://127.0.0.1:8000/api/clientes/')
        .then(r => r.json()).then(setClientes)
        .catch(() => setError('No se pudieron cargar los clientes.'));
    } else if (vista === 'stock') {
      Promise.all([
        fetch('http://127.0.0.1:8000/api/stock/').then(r => r.json()),
        fetch('http://127.0.0.1:8000/api/productos/').then(r => r.json())
      ]).then(([stockData, productosData]) => {
        // Cargar datos del stock con información completa del producto
        const stockConProducto = stockData.map(s => {
          const producto = productosData.find(p => p.id === s.producto);
          return { ...s, productoInfo: producto };
        });
        setStock(stockConProducto);
        setProductosDisponibles(productosData);
      }).catch(() => setError('No se pudo cargar el stock.'));
    } else if (vista === 'cotizaciones') {
      fetch('http://127.0.0.1:8000/api/cotizaciones/')
        .then(r => r.json()).then(setCotizaciones)
        .catch(() => setError('No se pudieron cargar las cotizaciones.'));
    } else if (vista === 'ordenes') {
      fetch('http://127.0.0.1:8000/api/ordenes-compra/')
        .then(r => r.json()).then(setOrdenes)
        .catch(() => setError('No se pudieron cargar las órdenes.'));
    } else if (vista === 'facturas') {
      fetch('http://127.0.0.1:8000/api/facturas/')
        .then(r => r.json()).then(setFacturas)
        .catch(() => setError('No se pudieron cargar las facturas.'));
    } else if (vista === 'empleados') {
      fetch('http://127.0.0.1:8000/api/empleados/')
        .then(r => r.json()).then(setEmpleados)
        .catch(() => setError('No se pudieron cargar los empleados.'));
    } else if (vista === 'tickets') {
      fetch('http://127.0.0.1:8000/api/tickets/')
        .then(r => r.json()).then(setTickets)
        .catch(() => setError('No se pudieron cargar los tickets.'));
    }
  }, [vista]);

  // Handlers productos
  const handleChange = e => setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const prod = await crearProducto({
        sku: nuevo.sku,
        nombre: nuevo.nombre,
        precio: nuevo.precio,
        categoria: nuevo.categoria,
        descripcion: '',
        activo: true
      });
      setProductos([...productos, prod]);
      setNuevo({ sku: '', nombre: '', precio: '', categoria: '' });
    } catch {
      setError('Error al crear producto');
    }
  };

  // Handlers clientes
  const handleClienteChange = e => setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  const handleClienteSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/clientes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente)
      });
      if (!res.ok) throw new Error();
      const cli = await res.json();
      setClientes([...clientes, cli]);
      setNuevoCliente({ nombre: '', rut: '', email: '' });
    } catch {
      setError('Error al crear cliente');
    }
  };

  // Handlers stock
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
      setStock([...stock, st]);
      setNuevoStock({ producto: '', cantidad: '' });
    } catch {
      setError('Error al agregar stock');
    }
  };

  // Cotizaciones
  const handleCotChange = e => setNuevaCot({ ...nuevaCot, [e.target.name]: e.target.value });
  const handleCotSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/cotizaciones/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCot)
      });
      if (!res.ok) throw new Error();
      const cot = await res.json();
      setCotizaciones([...cotizaciones, cot]);
      setNuevaCot({ cliente: '', total: '' });
    } catch {
      setError('Error al crear cotización');
    }
  };

  // Ordenes de compra
  const handleOrdenChange = e => setNuevaOrden({ ...nuevaOrden, [e.target.name]: e.target.value });
  const handleOrdenSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/ordenes-compra/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaOrden)
      });
      if (!res.ok) throw new Error();
      const ord = await res.json();
      setOrdenes([...ordenes, ord]);
      setNuevaOrden({ proveedor: '', total: '' });
    } catch {
      setError('Error al crear orden de compra');
    }
  };

  // Facturas
  const handleFacturaChange = e => setNuevaFactura({ ...nuevaFactura, [e.target.name]: e.target.value });
  const handleFacturaSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/facturas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaFactura)
      });
      if (!res.ok) throw new Error();
      const fac = await res.json();
      setFacturas([...facturas, fac]);
      setNuevaFactura({ numero: '', cliente: '', monto: '' });
    } catch {
      setError('Error al crear factura');
    }
  };

  // Empleados
  const handleEmpleadoChange = e => setNuevoEmpleado({ ...nuevoEmpleado, [e.target.name]: e.target.value });
  const handleEmpleadoSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/empleados/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEmpleado)
      });
      if (!res.ok) throw new Error();
      const emp = await res.json();
      setEmpleados([...empleados, emp]);
      setNuevoEmpleado({ nombre: '', rut: '', cargo: '', email: '', fecha_ingreso: '' });
    } catch {
      setError('Error al crear empleado');
    }
  };

  // Tickets
  const handleTicketChange = e => setNuevoTicket({ ...nuevoTicket, [e.target.name]: e.target.value });
  const handleTicketSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/tickets/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoTicket)
      });
      if (!res.ok) throw new Error();
      const t = await res.json();
      setTickets([...tickets, t]);
      setNuevoTicket({ titulo: '', descripcion: '' });
    } catch {
      setError('Error al crear ticket');
    }
  };

  // Mostrar login si no está autenticado
  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  // Mostrar el rol en la UI
  const rol = usuario.is_superuser ? 'Administrador' : 'Empleado';

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <div style={{ textAlign: 'right', marginBottom: 8 }}>
        <b>Usuario:</b> {usuario.username} &nbsp;|&nbsp; <b>Rol:</b> {rol} &nbsp;|&nbsp; <button onClick={() => setUsuario(null)}>Cerrar sesión</button>
      </div>
      <h1>TiCaShop LATAM ERP</h1>
      <nav style={{ marginBottom: 24 }}>
        <Link to="/productos"><button>Productos</button></Link>
        <Link to="/clientes"><button>Clientes</button></Link>
        <Link to="/stock"><button>Stock</button></Link>
        <Link to="/cotizaciones"><button>Cotizaciones</button></Link>
        <Link to="/ordenes"><button>Órdenes de Compra</button></Link>
        <Link to="/facturas"><button>Facturas</button></Link>
        <Link to="/empleados"><button>Empleados</button></Link>
        <Link to="/tickets"><button>Tickets</button></Link>
      </nav>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <Routes>
        <Route path="/" element={<Navigate to="/productos" />} />
        <Route path="/productos" element={<ProductosPage
          productos={productos}
          setProductos={setProductos}
          nuevo={nuevo}
          setNuevo={setNuevo}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />} />
        <Route path="/clientes" element={<ClientesPage
          clientes={clientes}
          setClientes={setClientes}
          nuevoCliente={nuevoCliente}
          setNuevoCliente={setNuevoCliente}
          handleClienteSubmit={handleClienteSubmit}
          handleClienteChange={handleClienteChange}
        />} />
        <Route path="/stock" element={<StockPage
          stock={stock}
          setStock={setStock}
          nuevoStock={nuevoStock}
          setNuevoStock={setNuevoStock}
          handleStockSubmit={handleStockSubmit}
          handleStockChange={handleStockChange}
          productosDisponibles={productosDisponibles}
          buscaStock={buscaStock}
          setBuscaStock={setBuscaStock}
        />} />
        <Route path="/cotizaciones" element={<CotizacionesPage
          cotizaciones={cotizaciones}
          setCotizaciones={setCotizaciones}
          nuevaCot={nuevaCot}
          setNuevaCot={setNuevaCot}
          handleCotSubmit={handleCotSubmit}
          handleCotChange={handleCotChange}
        />} />
        <Route path="/ordenes" element={<OrdenesPage
          ordenes={ordenes}
          setOrdenes={setOrdenes}
          nuevaOrden={nuevaOrden}
          setNuevaOrden={setNuevaOrden}
          handleOrdenSubmit={handleOrdenSubmit}
          handleOrdenChange={handleOrdenChange}
        />} />
        <Route path="/facturas" element={<FacturasPage
          facturas={facturas}
          setFacturas={setFacturas}
          nuevaFactura={nuevaFactura}
          setNuevaFactura={setNuevaFactura}
          handleFacturaSubmit={handleFacturaSubmit}
          handleFacturaChange={handleFacturaChange}
        />} />
        <Route path="/empleados" element={<EmpleadosPage
          empleados={empleados}
          setEmpleados={setEmpleados}
          nuevoEmpleado={nuevoEmpleado}
          setNuevoEmpleado={setNuevoEmpleado}
          handleEmpleadoSubmit={handleEmpleadoSubmit}
          handleEmpleadoChange={handleEmpleadoChange}
        />} />
        <Route path="/tickets" element={<TicketsPage
          tickets={tickets}
          setTickets={setTickets}
          nuevoTicket={nuevoTicket}
          setNuevoTicket={setNuevoTicket}
          handleTicketSubmit={handleTicketSubmit}
          handleTicketChange={handleTicketChange}
        />} />
      </Routes>
    </div>
  );
}

export default App;
