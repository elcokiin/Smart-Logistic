import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SuperAdmin from './components/dashboard/SuperAdmin'
import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home'
import VirtualStore from './pages/VirtualStore';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/store" element={<VirtualStore />} />
            <Route path="/superAdmin" element={<SuperAdmin />} />
            {/* Aquí puedes añadir más rutas según las necesites */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
