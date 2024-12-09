import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./pages/ProductDetails"; // สำหรับหน้ารายละเอียดสินค้า

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // สถานะล็อกอิน

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // จัดการล็อกอิน
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // จัดการล็อกเอาท์
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Component สำหรับป้องกันเส้นทาง
  const PrivateRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="flex">
        {/* Sidebar จะปรากฏเฉพาะตอนล็อกอิน */}
        {isLoggedIn && (
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
          />
        )}

        {/* Main Content */}
        <div className="flex-1">
          <Navbar
            toggleSidebar={toggleSidebar}
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
          <main className="p-6">
            <Routes>
              {/* เส้นทางสาธารณะ */}
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

              {/* เส้นทางที่ต้องล็อกอิน */}
              <Route
                path="/product/:id"
                element={<PrivateRoute element={<ProductDetails />} />}
              />

              {/* หาก URL ไม่ตรงให้เปลี่ยนไปหน้าแรก */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
