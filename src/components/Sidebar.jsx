import React, { useState } from "react"; // Import 'useState' here
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Added login state

  const menuItems = [
    { name: "หน้าหลัก", path: "/", icon: "🏠" },
    { 
      name: "จัดการสินค้าของคุณ", 
      path: "/products", 
      icon: "📦",
      subItems: [
        { name: "เพิ่ม/ลบสินค้า", path: "/products/add" },
        { name: "การจัดส่ง", path: "/products/shipping" },  {/* เปลี่ยนจาก "/products/list" เป็น "/shipping" */}
      ],
    },
    { name: "สินค้าที่เช่า", path: "/rented", icon: "📄" },
    { name: "จัดการบัญชี", path: "/account", icon: "👤" },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-green-700 text-white z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 w-64`}
    >
      <div className="p-6 text-lg font-bold flex justify-between items-center">
        <span>RentEase</span>
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl focus:outline-none"
        >
          ✖
        </button>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="p-4 hover:bg-green-600">
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                  <span className="ml-auto">{activeDropdown === index ? "▲" : "▼"}</span>
                </button>
                {activeDropdown === index && (
                  <ul className="ml-6 mt-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="p-2 hover:bg-green-500">
                        <Link to={subItem.path}>{subItem.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link to={item.path} className="flex items-center space-x-2">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )}
          </li>
        ))}
        
        {/* Conditionally render Login/Logout button */}
        <li className="p-4 hover:bg-blue-600 mt-4">
          <button onClick={handleLogout} className="flex items-center space-x-2 w-full">
            <span>🔒</span>
            <span>ออกจากระบบ</span> {/* Logout button */}
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
