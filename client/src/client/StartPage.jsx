import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../nameSlice"; // นำเข้า setName action จาก nameSlice
import "./StartPage.css";

export default function StartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useSelector((state) => state.name); // ดึงค่า name จาก global state

    const handleNameChange = (event) => {
        dispatch(setName(event.target.value)); // อัปเดต global state
    };

    return (
        <div className="start-page">
            <header className="header-container">
                <img src="/src/photo/brand.png" alt="brand_kitashanom" className="brand-image" />
                <h1 className="title">Kita Chanom</h1>
                <p className="subtitle">สั่งง่ายใน 3 ขั้นตอน</p>
            </header>
            
            <main className="main-content">
                <input
                    type="text"
                    placeholder="กรุณาป้อนชื่อ..."
                    className="input-name"
                    value={name}
                    onChange={handleNameChange} // อัปเดต state เมื่อพิมพ์ชื่อ
                />
                
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

