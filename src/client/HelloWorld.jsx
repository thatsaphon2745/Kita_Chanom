import { useState, useEffect, useRef } from "react";

export default function HelloWorld() {
    const fullname = (firstName, lastName) => `${firstName} ${lastName}`;

    return (
        <>
            <header className="header-container">
                <img src="/src/photo/brand.png" alt="brand_kitashanom" />
                <h1>Kita Chanom</h1>
                <p>สั่งง่ายใน 3 ขั้นตอน</p>
            </header>
            <main>
                <input type="text" placeholder="กรุณาป้อนชื่อ..." className="input-name" />
                {/* <button onClick={() => alert(fullname('ariya', 'chakot'))}>Click</button> */}
                <div>
                    <a href="/src/client/menu.html">
                        <img src="/src/photo/image 1.png" alt="" /><br />สั่งอาหาร
                    </a>
                </div>
            </main>
            <footer>
                <strong>สนใจซื้อเฟรนไซน์ : @manariya</strong>
            </footer>
        </>
    );
}
