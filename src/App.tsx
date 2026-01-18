import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./pages/Dashboard/Dashboard";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Sales from "./pages/Sales/Sales";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
      <BrowserRouter>
        <div className="flex">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/dashboard" element={<DashboardLayout />} />

            <Route path="/login" element={<Login />} />

            <Route path="/sales" element={<Sales />} />
     
            <Route path="*" element={<h1>Página não encontrada</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
