import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuPage.css";

function MenuPage() {
  const navigate = useNavigate();
  // Update page title on component mount

  const items = [
    { id: 1, name: "ชานม", price: "19.00", image: "/src/photo/menu/ชานม.jpg" },
    {
      id: 2,
      name: "ชาไทย",
      price: "19.00",
      image: "/src/photo/menu/ชาไทย.jpg",
    },
    {
      id: 3,
      name: "ชาเขียวนม",
      price: "19.00",
      image: "/src/photo/menu/ชาเขียวนม.jpg",
    },
    {
      id: 4,
      name: "ชาแดงองุ่น",
      price: "19.00",
      image: "/src/photo/menu/ชาแดงองุ่น.jpg",
    },
    {
      id: 5,
      name: "ชาเขียวบลูเบอร์รี่",
      price: "19.00",
      image: "/src/photo/menu/ชาเขียวบลูเบอร์รี่.jpg",
    },
    {
      id: 6,
      name: "ชาเขียวมะลิ",
      price: "19.00",
      image: "/src/photo/menu/ชาเขียวมะลิ.jpg",
    },
    {
      id: 7,
      name: "ชาเขียวแอปเปิ้ล",
      price: "19.00",
      image: "/src/photo/menu/ชาเขียวแอปเปิ้ล.jpg",
    },
    {
      id: 8,
      name: "ชาสตรอเบอร์รี่",
      price: "19.00",
      image: "/src/photo/menu/ชาสตรอเบอร์รี่.jpg",
    },
    {
      id: 9,
      name: "ชาโยเกิร์ตแอปเปิ้ล",
      price: "19.00",
      image: "/src/photo/menu/ชาโยเกิร์ตแอปเปิ้ล.jpg",
    },
    {
      id: 10,
      name: "ชามะนาว",
      price: "19.00",
      image: "/src/photo/menu/ชามะนาว.jpg",
    },
    {
      id: 11,
      name: "ชาเขียวลิ้นจี่",
      price: "19.00",
      image: "/src/photo/menu/ชาเขียวลิ้นจี่.jpg",
    },
    {
      id: 12,
      name: "ชาเขียวเสารส",
      price: "19.00",
      image: "/src/photo/menu/ชาเขียวเสารส.jpg",
    },
    {
      id: 13,
      name: "ชานมสตรอเบอร์รี่",
      price: "19.00",
      image: "/src/photo/menu/ชานมสตรอเบอร์รี่.jpg",
    },
    {
      id: 14,
      name: "บราวน์ชูการ์",
      price: "19.00",
      image: "/src/photo/menu/บราวน์ชูการ์.jpg",
    },
  ];

  const handleAddToCart = (item) => {
    navigate("/custom", { state: { item } });
  };

  const goToCart = () => {
    navigate("/cart"); // Ensure this path matches your CartPage route
  };
  return (
    <div className="menu-page">
      <header className="menu-header">
        <div className="logo-section">
          <img
            src="/src/photo/brand.png"
            alt="Kita chanom logo"
            className="logo-image"
          />
          <h1>Kita chanom</h1>
        </div>
        <div className="cart-icon">
          <button
            onClick={goToCart}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img src="/src/photo/cart.png" alt="Cart" />
          </button>
        </div>
      </header>
      <h2 className="menu-title">Menu</h2>
      <div className="menu-grid">
        {items.map((item) => (
          <div key={item.id} className="menu-item">
            <img
              src={item.image}
              alt={item.name}
              className="menu-image"
              loading="lazy"
            />
            <div className="menu-info">
              <p className="menu-name">{item.name}</p>
              <p className="menu-price">{item.price} Bath</p>
            </div>
            <button
              className="add-button"
              onClick={() => handleAddToCart(item)}
              aria-label={`Add ${item.name} to cart`}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
