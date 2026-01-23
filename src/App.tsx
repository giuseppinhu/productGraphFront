import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Sales from "./pages/Sales/Sales";
import Layout from "./layout";
import ClientsPage from "./pages/Users/Users";
import DashboardLayout from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/users" element={<ClientsPage />} />
        </Route>

        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
