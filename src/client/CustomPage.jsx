import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CustomPage.css";

function CustomPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { item } = state || {}; // Destructure item from state

  const [sweetness, setSweetness] = useState("50%");
  const [topping, setTopping] = useState(null);
  const [pearl, setPearl] = useState(null);

  const handleAddToCart = () => {
    const customizedOrder = {
      ...item,
      sweetness,
      topping,
      pearl,
      quantity: 1, // Default quantity
    };
  
    console.log("Order added:", customizedOrder);
  
    // Navigate to the CartPage while preserving existing orders
    navigate("/cart", {
      state: { 
        newOrder: customizedOrder 
      },
    });
  };
  

  if (!item) return <div>Item not found</div>; // Fallback if no item data is passed

  return (
    <div className="custom-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>
      <img src={item.image} alt={item.name} className="drink-image" />

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
          { name: "มุกบลาวซูก้า", price: 5 },
          { name: "มุกต้นตำหรับ", price: 5 },
          { name: "อโลเวร่า", price: 10 },
        ].map((option) => (
          <label key={option.name}>
            <input
              type="radio"
              name="pearl"
              value={option.name}
              checked={pearl === option.name}
              onChange={() => setPearl(option.name)}
            />
            {option.name} +{option.price}
          </label>
        ))}
      </div>

      <div className="custom-section">
        <h3>เลือก Topping</h3>
        {[
          { name: "วุ้นสตรอเบอร์รี่", price: 5 },
          { name: "วิปซีก", price: 10 },
          { name: "ครีมชีส", price: 20 },
          { name: "วุ้นคาราเมล", price: 5 },
        ].map((option) => (
          <label key={option.name}>
            <input
              type="radio"
              name="topping"
              value={option.name}
              checked={topping === option.name}
              onChange={() => setTopping(option.name)}
            />
            {option.name} +{option.price}
          </label>
        ))}
      </div>

      <button className="add-cart-button" onClick={handleAddToCart}>
        ADD CART
      </button>
    </div>
  );
}

export default CustomPage;
