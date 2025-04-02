import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SuperAdmin from './components/dashboard/SuperAdmin'
import { AuthProvider, useAuth } from './context/AuthContext'

import Home from './pages/Home'
import VirtualStore from './pages/VirtualStore';
import AccessDenied from './pages/AccessDenied';
import WarehouseConfig from './pages/WarehouseConfig'
import Loader from './components/Loader'

// Define roles permitidos por ruta
const ROUTE_ACCESS_MAP = {
  '/home': ['admin'],
  '/store': ['admin'],
  '/superAdmin': ['superAdmin'],
  '/warehouse-config': ['superAdmin'],
};

// Protected route - redirige a login si no está autenticado o no tiene permiso
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { currentUser, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Loader />
      </div>
    );
  }

  // Redireccionar si no está autenticado
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Verificar si el usuario tiene al menos uno de los roles requeridos
  const hasRequiredRole = requiredRoles.length === 0 || requiredRoles.some(role => hasRole(role));

  if (!hasRequiredRole) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

// Public route - redirige a una página adecuada si ya está autenticado
const PublicRoute = ({ children }) => {
  const { currentUser, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Loader />
      </div>
    );
  }

  // Si está autenticado, redirigir a la primera página a la que tenga acceso
  if (currentUser) {
    // Buscar la primera ruta a la que tenga permiso
    if (hasRole('superAdmin')) return <Navigate to="/superAdmin" />;
    if (hasRole('admin')) return <Navigate to="/home" />;

    // Si no tiene ningún rol específico pero está autenticado
    return <Navigate to="/access-denied" />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas (solo para usuarios no autenticados) */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/access-denied" element={<AccessDenied />} />

      {/* Rutas protegidas por rol */}
      <Route
        path="/home"
        element={
          <ProtectedRoute requiredRoles={ROUTE_ACCESS_MAP['/home']}>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/store"
        element={
          <ProtectedRoute requiredRoles={ROUTE_ACCESS_MAP['/store']}>
            <VirtualStore />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superAdmin"
        element={
          <ProtectedRoute requiredRoles={ROUTE_ACCESS_MAP['/superAdmin']}>
            <SuperAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/warehouse-config"
        element={
          <ProtectedRoute requiredRoles={ROUTE_ACCESS_MAP['/warehouse-config']}>
            <WarehouseConfig />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;