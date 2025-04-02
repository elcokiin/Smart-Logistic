import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AdminDashboard from './components/dashboard/Admin'
import SuperAdminDashboard from './components/dashboard/SuperAdmin'
import SuperAdmin from './components/dashboard/SuperAdmin'
import User from './components/dashboard/User'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './routes/routes'
import Home from './pages/Home'
import VirtualStore from './pages/VirtualStore';
import Unauthorized from './pages/Unauthorized'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/store" element={<VirtualStore />} />
            <Route path="/superAdmin" element={<SuperAdmin />} />
            
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/superadmin" element={
              <ProtectedRoute requiredRole="superadmin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/user" element={
              <ProtectedRoute requiredRole="user">
                <User />
              </ProtectedRoute>
            } />
            
            <Route path="/unauthorized" element={<Unauthorized/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;