import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin();  // Call the onLogin function passed from the parent component
      navigate("/");  // Redirect to homepage after successful login
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-md w-96"
      >
        <h2 className="text-xl font-bold mb-4">เข้าสู่ระบบ</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            ชื่อผู้ใช้งาน
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            รหัสผ่าน
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
