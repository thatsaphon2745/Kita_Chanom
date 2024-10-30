import { useNavigate } from "react-router-dom";
import "./StartPage.css";

export default function StartPage() {
    const navigate = useNavigate();
    return (
        <div className="start-page">
            <header className="header-container">
                <img src="/src/photo/brand.png" alt="brand_kitashanom" className="brand-image" />
                <h1 className="title">Kita Chanom</h1>
                <p className="subtitle">สั่งง่ายใน 3 ขั้นตอน</p>
            </header>
            
            <main className="main-content">
                <input type="text" placeholder="กรุณาป้อนชื่อ..." className="input-name" />
                
                <div className="order-button" onClick={() => navigate("/menu")}>
                    <img src="/src/photo/menu-icon.png" alt="สั่งอาหาร" className="order-image" /><br />
                    <span>สั่งอาหาร</span>
                </div>
            </main>
            
            <footer className="footer">
                <strong>สนใจซื้อเฟรนไซน์ : @manariya</strong>
            </footer>
        </div>
    );
}
