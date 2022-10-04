import express from "express";
import mysql from "mysql";

const app = express(); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!Hanukkahw/2k",
    database: "test"
})


app.get("/", (req,res) => {
res.json("hello this is the backend")
})

app.get("/books", (req,res) => {
    const q = " SELECT * FROM books"
    db.query(q, (error, data) => {
        if (error) return res.json(error)
        return res.json(data)
    })
})

app.post('/books', (req,res) => {
    const q = "INSERT INTO books (`title`. `desc`, `cover`) VALUES (?)"
    const values = [
        "title from backend",
        "desc from backend",
        "cover pic from backend"
    ];

    db.query(q, [values], (error, data) => {
        if (error) return res.json(error)
        return res.json(data)
    })

})

app.listen(8800, () => {
console.log("connected to backend!")
})