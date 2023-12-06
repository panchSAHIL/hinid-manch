const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs')

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"root123",
  database:"lang"
})

app.post('/login', (req,res) => {
  // const sql = "SELECT * FROM login";
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  console.log("REQ", req.body);

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if(err) return res.json({status: "error"});
    console.log("data", data);

    if(data.length > 0){
      return res.json({status: "success"})
    } else {
      return res.json({status: "not found"})
    }
  })
})

app.get("/getfile", (req, res) => {
  const fileName = req.query.file;

  fs.readFile(`./data/${fileName}.json`, 'utf8', (err, data) => {
    if (err) {
      console.log("Cannot find file: " + fileName);
      res.json({
        error: "File not found"
      });
    } else {
      // Send the content of the file in the response
      res.json({
        name: fileName,
        file: JSON.parse(data)  // Assuming the content is JSON
      });
    }
  });
})

app.post("/signup", (req, res) => {
  const sql = "Insert into login(email, password, name) values(?, ?, ?)";
  console.log("REQ", req.body);

  db.query(sql, [req.body.email, req.body.password, req.body.name], (err, data) => {
    if(err) return res.json({status: "error"});
    console.log("data", data);

    if(data.length > 0){
      return res.json({status: "success"})
    } else {
      return res.json({status: "not added"})
    }
  })
})

app.listen(5500, () =>{
  console.log("Listening on port 5500....");
})