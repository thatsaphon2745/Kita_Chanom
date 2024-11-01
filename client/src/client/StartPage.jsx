import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../nameSlice"; // นำเข้า setName action จาก nameSlice
import { setCustomerId } from "../customerIdSlice"; // นำเข้า setCustomerId action
import "./StartPage.css";
import Axios from "axios"; // นำเข้า Axios สำหรับการเชื่อมต่อ API
import { v4 as uuidv4 } from 'uuid';

export default function StartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useSelector((state) => state.name); // ดึงค่า name จาก global state
    const customer_id = useSelector((state) => state.customerId); // ดึงค่า name จาก global state
    const handleNameChange = (event) => {
        dispatch(setName(event.target.value)); // อัปเดต global state
    };

    const handleOrderStart = () => {
        if (name.trim()) {
            const customerId = uuidv4(); // สร้าง UUID สำหรับ customer_id
            dispatch(setCustomerId(customerId));
            // ส่งข้อมูล customer_name และ customer_id ไปที่ API
            console.log("New customer_id:", customer_id);
            Axios.post("http://localhost:3001/customers/add", {
                customer_id: customerId, // ใช้ customer_id ที่สร้างขึ้น
                customer_name: name
            })
            .then((response) => {
                console.log("Customer added successfully:", response.data);
                navigate("/menu"); // เปลี่ยนหน้าไปที่ /menu
            })
            .catch((error) => {
                console.error("Error adding customer:", error);
            });
        } else {
            alert("กรุณาป้อนชื่อก่อนเริ่มสั่งอาหาร");
        }
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
                
                <div className="order-button" onClick={handleOrderStart}>
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
