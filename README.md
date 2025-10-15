# TiCaShop LATAM ERP

Este proyecto es una solución integral para la gestión de TiCaShop LATAM, desarrollado con Django (Python, MySQL) para el backend y React para el frontend.

## Estructura del Proyecto
- `backend/`: Proyecto Django (API REST, lógica de negocio, conexión MySQL)
- `frontend/`: Proyecto React (interfaz de usuario)

## Módulos principales
- Inventario
- Ventas y Cotizaciones
- Proveedores y Compras
- Administración y Finanzas
- Recursos Humanos
- Soporte Técnico

## Funcionalidades implementadas

### Backend (Django + MySQL)
- Configuración de base de datos MySQL y compatibilidad con phpMyAdmin.
- Modelos, serializadores y vistas para todos los módulos de negocio.
- API RESTful para productos, stock, clientes, cotizaciones, proveedores, órdenes de compra, facturas, comisiones, empleados, vacaciones, tickets e instalaciones.
- Autenticación de usuarios con Django REST Framework Token Auth.
- Endpoint de login (`/api/auth/`) y endpoint de usuario autenticado (`/api/user/`).
- Roles: Administrador (superusuario Django) y Empleado (usuario normal).
- CORS habilitado para permitir peticiones desde React.

### Frontend (React)
- Interfaz moderna y responsiva con CSS personalizado.
- Login conectado a la API de Django, con manejo de roles y cierre de sesión.
- Visualización del usuario y rol en la interfaz.
- CRUD completo para todos los módulos principales (productos, clientes, stock, cotizaciones, órdenes, facturas, empleados, tickets, etc).
- Navegación entre módulos desde la barra superior.
- Formularios validados y mensajes de error amigables.
- Navegación por páginas independientes usando React Router (`react-router-dom`).
- Cada módulo principal tiene su propia URL y componente.
- Menú superior actualizado para navegación por rutas.
- Componente `StockSection` para gestión y filtrado de stock por SKU/nombre.

## Primeros pasos

### 1. Backend
```bash
cd backend
python -m venv venv
# Activar entorno virtual:
# En PowerShell:
.\venv\Scripts\Activate.ps1
# En CMD:
.\venv\Scripts\activate.bat
pip install -r requirements.txt
# Configura tu base de datos en core/settings.py
python manage.py migrate
python manage.py createsuperuser  # Crea el admin
python manage.py runserver
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

### 3. Acceso y roles
- Ingresa con el usuario creado en Django admin.
- El sistema detecta si eres Administrador (superusuario) o Empleado (usuario normal).
- El login es seguro y usa tokens de la API.

## Notas técnicas
- Puedes tener el backend y frontend corriendo en terminales separadas.
- El backend expone la API en `http://127.0.0.1:8000/api/`.
- El frontend corre en `http://localhost:3000`.
- Para agregar empleados, usa Django admin o la API de empleados.

### Cambios recientes
- Navegación por páginas independientes usando React Router (`react-router-dom`).
- Cada módulo principal tiene su propia URL y componente.
- Menú superior actualizado para navegación por rutas.
- Componente `StockSection` para gestión y filtrado de stock por SKU/nombre.

### Instalación de dependencias adicionales

#### Frontend
```bash
cd frontend
npm install react-router-dom
```

---

Desarrollado por GitHub Copilot para TiCaShop LATAM. Última actualización: Octubre 2025.