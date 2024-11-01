const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const morgan = require('morgan')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host:"localhost",
    password: "12345678",
    database: "crud_kita"
})

// middleware
app.use(morgan('dev'))

db.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err);
    } else {
        console.log("Connected to the database!");
    }
});


//cart
app.get('/cart', (req,res) => {
    db.query("SELECT * FROM cart", (err,result) =>{
        if (err){
            console.log.apply(err);
        } else{
            res.send(result);
        }
    })
})

app.put('/cart/update-quantity', (req, res) => {
    const { id, quantity } = req.body; // รับ id และ quantity ใหม่จาก body ของ request
    const query = "UPDATE cart SET quantity = ? WHERE id = ?";

    db.query(query, [quantity, id], (err, result) => {
        if (err) {
            console.log("Error updating quantity:", err);
            res.status(500).send("Failed to update quantity");
        } else {
            res.send("Quantity updated successfully");
        }
    });
});

// อัปเดตข้อมูลของรายการในตะกร้า
app.put('/cart/update/:id', (req, res) => {
    const id = req.params.id; // ดึง ID จาก URL
    const { quantity, sweetness, topping, pearl } = req.body; // รับข้อมูลใหม่จาก body ของ request

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!id || !quantity || quantity < 1) {
        return res.status(400).send("Invalid input data");
    }

    const query = "UPDATE cart SET quantity = ?, sweetness = ?, topping = ?, pearl = ? WHERE id = ?";
    db.query(query, [quantity, sweetness, topping, pearl, id], (err, result) => {
        if (err) {
            console.log("Error updating item in cart:", err);
            return res.status(500).send("Failed to update item");
        } else if (result.affectedRows === 0) {
            return res.status(404).send("Item not found");
        } else {
            res.send({ message: "Item updated successfully", id, quantity, sweetness, topping, pearl });
        }
    });
});

// ตัวอย่างการลบรายการใน Express.js
app.delete('/cart/remove/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM cart WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send({ message: 'Item removed successfully' });
    });
  });
  

//custom
// เพิ่มข้อมูลใหม่ใน cart โดยเช็ค id สูงสุดและเพิ่ม 1
app.post("/cart/add", (req, res) => {
    const { customer_name, menu_name, price, quantity, photo, sweetness, topping, pearl, total_price} = req.body;
  
    // Step 1: ดึง id สูงสุดจาก cart
    const getMaxIdQuery = "SELECT MAX(id) AS maxId FROM cart";
  
    db.query(getMaxIdQuery, (err, result) => {
      if (err) {
        console.error("Error fetching max id:", err);
        return res.status(500).send("Error fetching max id");
      }
  
      // Step 2: กำหนดค่า id ใหม่จาก maxId + 1
      const newId = result[0].maxId ? result[0].maxId + 1 : 1; // เริ่มจาก 1 หาก maxId เป็น null
  
      // Step 3: เพิ่มข้อมูลใหม่พร้อมกับ id ที่เพิ่มขึ้น
      const sqlInsert = `
        INSERT INTO cart (id, customer_name, menu_name, price, quantity, photo, sweetness, topping, pearl, total_price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(sqlInsert, [newId, customer_name, menu_name, price, quantity, photo, sweetness, topping, pearl, total_price], (error, result) => {
        if (error) {
          console.error("Error inserting item:", error);
          return res.status(500).send("Error adding item to cart");
        }
        res.status(200).send("Item added to cart successfully");
      });
    });
  });
  


// app.post('/api', (req,res) =>{
//     const { username , password } = req.body
//     console.log(username,password)
//     res.send('Jukkru555+')
// })

app.listen('3001', () => {
    console.log('Server is running on port 3001')
})