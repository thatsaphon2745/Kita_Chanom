const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host:"localhost",
    password: "12345678",
    database: "crud_kita"
})



db.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err);
    } else {
        console.log("Connected to the database!");
    }
});
