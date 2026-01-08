import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardLayout from './pages/Dashboard/Dashboard'; // O componente que tipamos antes
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/dashboard" element={<DashboardLayout />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;