import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Topbar from "./Components/Topbar.jsx";
import FullMap from "./Pages/FullMap.jsx";
import Orders from "./Pages/Orders.jsx";
import TotalOrders from "./Pages/TotalOrders.jsx";
import Products from "./Pages/Products.jsx";
import DashboardProducts from "./Pages/DashboardProducts.jsx";
import Messages from "./Pages/Messages.jsx";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onHoverChange={setIsSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const [orders, setOrders] = useState([]);

  const handleAddOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/map" element={<Layout><FullMap /></Layout>} />
        <Route path="/orders" element={<Layout><Orders onAddOrder={handleAddOrder} /></Layout>} />
        <Route path="/total-orders" element={<Layout><TotalOrders orders={orders} /></Layout>} />
        <Route path="/add-products" element={<Layout><Products /></Layout>} />
        <Route path="/products" element={<Layout><DashboardProducts /></Layout>} />
        <Route path="/messages" element={<Layout><Messages /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
