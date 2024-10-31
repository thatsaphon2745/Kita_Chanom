import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CartPage.css";

function CartPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Initialize cartItems from state or empty list
  const [cartItems, setCartItems] = useState(() => {
    const existingOrders = state?.existingOrders || [];
    return state?.newOrder ? [...existingOrders, state.newOrder] : existingOrders;
  });

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const handleOrder = () => {
    // Navigate to QrcodePage with totalPrice as state
    navigate("/qrcode", { state: { totalPrice } });
  };

  return (
    <div className="cart-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>

      <div className="cart-list">
        {cartItems.length === 0 ? (
          <div className="empty-cart">Your cart is empty.</div>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">{item.price} บาท</p>
                <p className="item-detail">หวาน {item.sweetness}</p>
                <p className="item-detail">{item.pearl}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                </div>

                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(index)}
                >
                  ลบรายการ
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="total-price">ยอดชำระ: {totalPrice} บาท</div>
        <button className="order-button" onClick={handleOrder} disabled={cartItems.length === 0}>
          สั่งรายการ
        </button>
      </div>
    </div>
  );
}

export default CartPage;
