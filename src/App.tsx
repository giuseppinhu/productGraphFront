import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Sales from "./pages/Sales/Sales";
import Layout from "./layout";
import User from "./pages/Users/Users";
import DashboardLayout from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/users" element={<User />} />
            <Route path="/products" element={<Products />} />
          </Route>

          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="bottom-left" autoClose={5000} />
    </>
  );
}

export default App;
