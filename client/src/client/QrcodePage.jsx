import { useLocation, useNavigate } from "react-router-dom";
import "./QrcodePage.css";

function QrcodePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Get the total price from the state passed from CartPage
  const totalCart = state?.totalCart || 0;

  return (
    <div className="qrcode-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>
      
      <div className="qrcode-container">
        {/* Replace this src with the URL or component that generates the QR code */}
        <img src="/src/photo/qrcode.png" alt="QR Code" className="qrcode-image" />
      </div>

      <div className="payment-info">
        <div className="total-price">ยอดชำระ: {totalCart} บาท</div>
        <p>กรุณาชำระเงินผ่าน QR Code</p>
      </div>
    </div>
  );
}

export default QrcodePage;
