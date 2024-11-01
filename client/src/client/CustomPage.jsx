import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux"; // นำเข้า useSelector
import Axios from "axios"; // import Axios สำหรับการเรียก API
import "./CustomPage.css";

function CustomPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { item, isEdit } = state || {}; // ดึง item และ isEdit จาก state

  // ตั้งค่าตัวแปร state ตามค่าที่ได้รับจาก item ถ้ามี
  const [sweetness, setSweetness] = useState(isEdit ? item.sweetness : "50%");
  const [topping, setTopping] = useState(isEdit ? item.topping : null);
  const [pearl, setPearl] = useState(isEdit ? item.pearl : null);

  // ดึงค่า name จาก global state
  const name = useSelector((state) => state.name);
  const customerId = useSelector((state) => state.customerId); // ดึง customer_id จาก global state

  console.log(name);
  console.log(item);
  console.log(isEdit);
  console.log(customerId);
  const checkTotalPrice = () => {
    const toppings = [
      { name: "วุ้นสตรอเบอร์รี่", price: 5 },
      { name: "วิปชีส", price: 10 },
      { name: "ครีมชีส", price: 20 },
      { name: "วุ้นคาราเมล", price: 5 },
    ];
    const pearls = [
      { name: "มุกบราวน์ชูการ์", price: 5 },
      { name: "มุกต้นตำหรับ", price: 5 },
      { name: "มุกอโลเวร่า", price: 10 },
    ];

    // เริ่มจากราคาหลักของ item
    let total_price = parseFloat(item.price); // แปลงราคาเมนูเป็น number

    // คำนวณราคาของ pearl ที่เลือก
    pearls.forEach((pearlOption) => {
      if (pearlOption.name === pearl) {
        total_price += pearlOption.price; // เพิ่มราคา pearl
      }
    });

    // คำนวณราคาของ topping ที่เลือก
    toppings.forEach((toppingOption) => {
      if (toppingOption.name === topping) {
        total_price += toppingOption.price; // เพิ่มราคา topping
      }
    });

    return total_price; // คืนค่ารวมทั้งหมด
  };

  const handleAddToCart = () => {
    const total_price = checkTotalPrice(); // เรียกใช้ฟังก์ชันที่คำนวณ total_price
    const customizedOrder = {
      customer_id: customerId, // เพิ่ม customer_id ที่มาจาก global state
      customer_name: name, // เพิ่ม customer_name ที่มาจาก global state
      menu_name: item.name,
      price: parseFloat(item.price), // แปลงราคาเป็น number
      quantity: 1, // ตั้งค่า quantity เริ่มต้น
      photo: item.photo,
      sweetness,
      pearl,
      topping,
      total_price: total_price.toFixed(2), // แปลง total_price เป็น string ที่มีทศนิยม 2 ตำแหน่ง
    };

    console.log(
      `Topping: ${topping}, Pearl: ${pearl}, Total Price: ${customizedOrder.total_price}`
    );

    if (isEdit) {
      // อัปเดต total_price ใหม่ในกรณีที่เป็นโหมดแก้ไข
      const updatedTotalPrice = checkTotalPrice();
      customizedOrder.total_price = updatedTotalPrice.toFixed(2); // อัปเดต total_price

      // หากอยู่ในโหมดแก้ไข ให้เรียก API สำหรับการอัปเดต
      Axios.put(`http://localhost:3001/cart/update/${item.id}`, customizedOrder)
        .then((response) => {
          console.log(response.data);
          // นำทางไปที่ CartPage พร้อมกับการอัปเดตตะกร้า
          navigate("/cart", { state: { updatedOrder: customizedOrder } });
        })
        .catch((error) => {
          console.error("Error updating item in cart:", error);
        });
    } else {
      // หากเป็นการเพิ่มใหม่ ให้เรียก API สำหรับการเพิ่ม
      Axios.post("http://localhost:3001/cart/add", customizedOrder)
        .then((response) => {
          console.log(response.data);
          console.log(customizedOrder);
          // นำทางไปที่ CartPage พร้อมกับการอัปเดตตะกร้า
          navigate("/cart", { state: { updatedOrder: customizedOrder } });
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });
    }
  };

  if (!item) return <div>Item not found</div>; // Fallback if no item data is passed

  return (
    <div className="custom-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>
      <img src={item.photo} alt={item.name} className="drink-image" />

      <div className="drink-info">
        <h2>{item.name}</h2>
        <p>{item.price} Bath</p>
      </div>

      <div className="custom-section">
        <h3>ระดับความหวาน</h3>
        {["100%", "75%", "50%", "25%", "0%"].map((level) => (
          <label key={level}>
            <input
              type="radio"
              name="sweetness"
              value={level}
              checked={sweetness === level}
              onChange={() => setSweetness(level)}
            />
            {level}
          </label>
        ))}
      </div>

      <div className="custom-section">
        <h3>เลือกไข่มุก</h3>
        {[
          {
            name: "มุกบราวน์ชูการ์",
            price: 5,
            image: "/src/photo/pearl/image1.png",
          },
          {
            name: "มุกต้นตำหรับ",
            price: 5,
            image: "/src/photo/pearl/image2.png",
          },
          {
            name: "มุกอโลเวร่า",
            price: 10,
            image: "/src/photo/pearl/image3.png",
          },
        ].map((option) => (
          <label key={option.name}>
            <input
              type="radio"
              name="pearl"
              value={option.name}
              checked={pearl === option.name}
              onChange={() => setPearl(option.name)}
            />
            <img
              src={option.image}
              alt={option.name}
              className="option-image"
            />
            {option.name} +{option.price}
          </label>
        ))}
      </div>

      <div className="custom-section">
        <h3>เลือก Topping</h3>
        {[
          {
            name: "วุ้นสตรอเบอร์รี่",
            price: 5,
            image: "/src/photo/topping/image1.png",
          },
          { name: "วิปชีส", price: 10, image: "/src/photo/topping/image2.png" },
          {
            name: "ครีมชีส",
            price: 20,
            image: "/src/photo/topping/image3.png",
          },
          {
            name: "วุ้นคาราเมล",
            price: 5,
            image: "/src/photo/topping/image4.png",
          },
        ].map((option) => (
          <label key={option.name}>
            <input
              type="radio"
              name="topping"
              value={option.name}
              checked={topping === option.name}
              onChange={() => setTopping(option.name)}
            />
            <img
              src={option.image}
              alt={option.name}
              className="option-image"
            />
            {option.name} +{option.price}
          </label>
        ))}
      </div>

      <button className="add-cart-button" onClick={handleAddToCart}>
        {isEdit ? "UPDATE CART" : "ADD CART"}
      </button>
    </div>
  );
}

export default CustomPage;
