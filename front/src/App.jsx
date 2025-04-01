import './index.css'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import VirtualStore from './pages/VirtualStore';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<VirtualStore />} />
      </Routes>
    </div>
  );
}

export default App;