import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // รับ id จาก URL

  // Mock Data
  const products = [
    {
      id: "1",
      name: "เก้าอี้สำนักงาน",
      description: "เก้าอี้สำนักงานคุณภาพสูง เหมาะสำหรับการใช้งานในออฟฟิศ",
      price: 150,
      image:
        "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
      owner: {
        name: "คุณสมชาย",
        profileImage:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      },
      reviews: [
        {
          reviewer: "คุณธนา",
          rating: 5,
          comment: "เก้าอี้นั่งสบายมาก เหมาะกับการใช้งานระยะยาว"
        },
        {
          reviewer: "คุณปวีณา",
          rating: 4,
          comment: "สินค้าคุณภาพดี คุ้มค่ากับราคา"
        }
      ]
    },
    {
      id: "2",
      name: "โต๊ะพับอเนกประสงค์",
      description:
        "โต๊ะพับขนาดเล็ก ใช้ได้ในทุกสถานการณ์ พกพาสะดวกและทนทาน",
      price: 200,
      image:
        "https://images.pexels.com/photos/6408284/pexels-photo-6408284.jpeg",
      owner: {
        name: "คุณอรทัย",
        profileImage:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      },
      reviews: [
        {
          reviewer: "คุณไกรสร",
          rating: 4,
          comment: "โต๊ะพับใช้งานง่าย พกพาสะดวก"
        }
      ]
    }
  ];

  // สร้าง state สำหรับเลือกวันเช่าและวันคืน
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");

  // ค้นหาสินค้าจาก id
  const product = products.find((item) => item.id === id);

  // ตรวจสอบสินค้าหากไม่พบ
  if (!product) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">ไม่พบสินค้า</h1>
        <p>สินค้ารหัส {id} ไม่มีอยู่ในระบบ</p>
      </div>
    );
  }

  // ฟังก์ชันการคำนวณราคา
  const calculateTotalPrice = () => {
    if (!rentalStartDate || !rentalEndDate) {
      return 0;
    }

    const startDate = new Date(rentalStartDate);
    const endDate = new Date(rentalEndDate);

    // ตรวจสอบว่า วันที่เริ่มเช่าและวันที่คืนไม่สามารถเป็นวันเดียวกัน
    if (startDate.getTime() === endDate.getTime()) {
      return -1; // คืนค่า -1 เพื่อแสดงว่าไม่สามารถเลือกวันเดียวกันได้
    }

    // คำนวณจำนวนวันระหว่างวันที่เริ่มเช่าและวันคืน
    const timeDiff = endDate - startDate;
    const daysDiff = timeDiff / (1000 * 3600 * 24); // แปลงเป็นจำนวนวัน

    if (daysDiff <= 0) {
      return 0; // ถ้าจำนวนวันไม่ถูกต้อง
    }

    return daysDiff * product.price; // คูณจำนวนวันกับราคา/วัน
  };

  const totalPrice = calculateTotalPrice(); // คำนวณราคา

  // ฟังก์ชันการยืนยันการเช่า
  const handleConfirmRental = () => {
    if (!rentalStartDate || !rentalEndDate) {
      alert("กรุณาเลือกวันเช่าและวันคืน");
      return;
    }

    // ตรวจสอบว่า วันที่เริ่มเช่าและวันที่คืนไม่สามารถเป็นวันเดียวกัน
    const startDate = new Date(rentalStartDate);
    const endDate = new Date(rentalEndDate);
    if (startDate.getTime() === endDate.getTime()) {
      alert("วันที่เริ่มเช่าและวันคืนไม่สามารถเป็นวันเดียวกันได้");
      return;
    }

    alert(`ยืนยันการเช่า ${product.name} จาก ${rentalStartDate} ถึง ${rentalEndDate}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        {product.name}
      </h1>
      <div className="flex flex-col md:flex-row">
        {/* รูปสินค้า */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0"
        />

        {/* รายละเอียดสินค้า */}
        <div className="md:ml-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>รายละเอียด:</strong> {product.description}
          </p>
          <p className="text-green-600 font-bold text-xl mb-4">
            ราคา: {product.price} บาท/วัน
          </p>

          {/* ข้อมูลผู้ให้เช่า */}
          <div className="flex items-center mb-4">
            <img
              src={product.owner.profileImage}
              alt={product.owner.name}
              className="w-16 h-16 rounded-full shadow-md mr-4"
            />
            <div>
              <p className="text-gray-700 text-lg">
                <strong>ผู้ให้เช่า:</strong> {product.owner.name}
              </p>
            </div>
          </div>

          {/* ฟอร์มเลือกวันเช่าและวันคืน */}
          <div className="mb-6">
            <div className="mb-4">
              <label htmlFor="startDate" className="block text-gray-700 mb-2">
                วันที่เริ่มเช่า
              </label>
              <input
                type="date"
                id="startDate"
                value={rentalStartDate}
                onChange={(e) => setRentalStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="block text-gray-700 mb-2">
                วันที่คืน
              </label>
              <input
                type="date"
                id="endDate"
                value={rentalEndDate}
                onChange={(e) => setRentalEndDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* แสดงผลราคา */}
          {totalPrice === -1 ? (
            <p className="text-lg font-bold text-red-600 mb-4">
              วันที่เริ่มเช่าและวันคืนไม่สามารถเป็นวันเดียวกันได้
            </p>
          ) : totalPrice > 0 ? (
            <p className="text-lg font-bold text-green-600 mb-4">
              ราคาสำหรับการเช่า: {totalPrice} บาท
            </p>
          ) : (
            <p className="text-lg font-bold text-red-600 mb-4">
              กรุณาเลือกวันเริ่มเช่าและวันคืน
            </p>
          )}

          {/* ปุ่มยืนยันการเช่า */}
          <button
            onClick={handleConfirmRental}
            className="w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition-all"
          >
            ยืนยันการเช่า
          </button>
        </div>
      </div>

      {/* Section รีวิว */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">รีวิวจากผู้ใช้</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <div className="font-bold text-gray-700">{review.reviewer}</div>
                <div className="ml-2 text-yellow-500">
                  {/* สร้างระบบแสดงคะแนนดาว */}
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">ยังไม่มีรีวิวจากผู้ใช้</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
