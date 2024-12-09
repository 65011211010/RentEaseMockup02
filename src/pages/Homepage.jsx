import React from "react";
import { useNavigate } from "react-router-dom"; // สำหรับการนำทาง

const Homepage = () => {
  // Mock Data
  const usersCount = 10682;
  const productsCount = 16;
  const soldItemsCount = 38391;

  const featuredProducts = [
    {
      id: 1,
      name: "เก้าอี้สำนักงาน",
      price: 150,
      remaining: 5,
      image:
        "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
    },
    {
      id: 2,
      name: "โต๊ะพับอเนกประสงค์",
      price: 200,
      remaining: 8,
      image:
        "https://images.pexels.com/photos/6408284/pexels-photo-6408284.jpeg",
    },
    {
      id: 3,
      name: "พัดลมตั้งพื้น",
      price: 120,
      remaining: 10,
      image:
        "https://images.pexels.com/photos/116630/pexels-photo-116630.jpeg",
    },
    {
      id: 4,
      name: "เตาไมโครเวฟ",
      price: 300,
      remaining: 3,
      image:
        "https://images.pexels.com/photos/1049687/pexels-photo-1049687.jpeg",
    },
  ];

  const allProducts = [
    ...featuredProducts,
    {
      id: 5,
      name: "เครื่องปั่นน้ำผลไม้",
      price: 180,
      remaining: 6,
      image:
        "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg",
    },
    {
      id: 6,
      name: "เต็นท์ขนาดใหญ่",
      price: 400,
      remaining: 2,
      image:
        "https://images.pexels.com/photos/675764/pexels-photo-675764.jpeg",
    },
    {
      id: 7,
      name: "โปรเจคเตอร์",
      price: 500,
      remaining: 4,
      image:
        "https://images.pexels.com/photos/1591055/pexels-photo-1591055.jpeg",
    },
    {
      id: 8,
      name: "ชุดเครื่องเสียง",
      price: 800,
      remaining: 1,
      image:
        "https://images.pexels.com/photos/28857430/pexels-photo-28857430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const categories = [
    { name: "เฟอร์นิเจอร์" },
    { name: "เครื่องใช้ไฟฟ้า" },
    { name: "อุปกรณ์กีฬา" },
    { name: "อุปกรณ์สำนักงาน" },
  ];

  const navigate = useNavigate(); // Hook สำหรับการนำทาง

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Promotion Banner Section */}
      <section className="mb-8">
        <img
          src="https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Promotion Banner"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </section>

      {/* Welcome Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          ยินดีต้อนรับสู่ RentEase
        </h1>
        <p className="text-gray-700 text-lg">
          ผู้ใช้งานทั้งหมด:{" "}
          <span className="font-bold text-green-600">{usersCount} คน</span> |{" "}
          สินค้าทั้งหมด:{" "}
          <span className="font-bold text-green-600">{productsCount} ชิ้น</span>{" "}
          | เช่าแล้ว:{" "}
          <span className="font-bold text-green-600">{soldItemsCount} ชิ้น</span>
        </p>
      </section>

      {/* Categories Section (ไม่มีรูปภาพ) */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-green-700 mb-4">หมวดหมู่สินค้า</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-md font-bold text-gray-800 mb-2">{category.name}</h3>
              <button
                className="mt-4 w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition-all"
                onClick={() => navigate(`/category/${category.name}`)} // นำทางไปหน้าหมวดหมู่
              >
                ดูสินค้า
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-bold text-green-700 mb-4">สินค้าแนะนำ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-green-600 font-semibold text-lg mb-1">
                {product.price} บาท/วัน
              </p>
              <p className="text-gray-500 text-sm">
                เหลือ: {product.remaining} ชิ้น
              </p>
              <button
                className="mt-4 w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition-all"
                onClick={() => navigate(`/product/${product.id}`)} // นำทางไปหน้ารายละเอียดสินค้า
              >
                เช่าสินค้า
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* All Products Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-green-700 mb-4">สินค้าทั้งหมด</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-green-600 font-semibold text-lg mb-1">
                {product.price} บาท/วัน
              </p>
              <p className="text-gray-500 text-sm">
                เหลือ: {product.remaining} ชิ้น
              </p>
              <button
                className="mt-4 w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition-all"
                onClick={() => navigate(`/product/${product.id}`)} // นำทางไปหน้ารายละเอียดสินค้า
              >
                เช่าสินค้า
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
