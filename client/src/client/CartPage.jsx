import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // นำเข้า useSelector
import "./CartPage.css";
import Axios from "axios";

function CartPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const name = useSelector((state) => state.name);
  const customerId = useSelector((state) => state.customerId); // ดึง customerId จาก Redux state
  const getCart = () => {

    // เรียก API โดยส่ง customer_id และ customer_name
    Axios.get(`http://localhost:3001/cart?customer_id=${customerId}&customer_name=${name}`)
      .then((response) => {
        setCartList(response.data);
        console.log(response.data); // แสดงข้อมูลที่ได้รับจาก API
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
};

useEffect(() => {
    getCart();
}, [name, customerId]); // เพิ่ม dependencies เพื่อให้ useEffect ทำงานใหม่เมื่อ name หรือ customerId เปลี่ยน


  // Calculate the total price
  const totalCart = cartList.reduce(
    (acc, item) => acc + item.total_price * item.quantity,
    0
  );

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cartList];
    const item = updatedCart[index];
    const newQuantity = Math.max(1, item.quantity + change);

    // Update quantity in app state
    updatedCart[index].quantity = newQuantity;
    setCartList(updatedCart);

    // Update quantity in database
    Axios.put("http://localhost:3001/cart/update-quantity", {
      id: item.id,
      quantity: newQuantity,
    })
      .then(() => {
        console.log("Quantity updated in database");
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  const handleRemoveItem = (index) => {
    const itemToRemove = cartList[index];

    // API call to remove item from database
    Axios.delete(`http://localhost:3001/cart/remove/${itemToRemove.id}`)
      .then(() => {
        console.log("Item removed from database");

        // Update state to remove item from cartList
        const updatedCart = cartList.filter((_, i) => i !== index);
        setCartList(updatedCart);
      })
      .catch((error) => {
        console.error("Error removing item from database:", error);
      });
  };

  const handleOrder = () => {
    // Navigate to QrcodePage with totalPrice as state
    navigate("/qrcode", { state: { totalCart } });
  };

  const handleEditItem = (item) => {
    // นำทางไปที่ CustomPage พร้อมข้อมูลที่ต้องการแก้ไข
    navigate("/custom", { state: { item, isEdit: true } });
  };

  return (
    <div className="cart-page">
      <button className="back-button" onClick={() => navigate("/menu")}>
        ←
      </button>

      <div className="cart-list">
        {cartList.length === 0 ? (
          <div className="empty-cart">Your cart is empty.</div>
        ) : (
          cartList.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.photo}
                alt={item.menu_name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3 className="item-name">{item.menu_name}</h3>
                <p className="item-price">{item.total_price} บาท</p>
                <p className="item-detail">หวาน {item.sweetness}</p>
                <p className="item-detail">{item.pearl}</p>
                <p className="item-detail">{item.topping}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>
                    +
                  </button>
                </div>

                {/* New Edit Details button */}
                <button
                  className="edit-button"
                  onClick={() => handleEditItem(item)}
                >
                  แก้ไขรายละเอียด
                </button>

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
        <div className="total-price">ยอดชำระ: {totalCart} บาท</div>
        <button
          className="order-button"
          onClick={handleOrder}
          disabled={cartList.length === 0}
        >
          สั่งรายการ
        </button>
      </div>
    </div>
  );
}

export default CartPage;


