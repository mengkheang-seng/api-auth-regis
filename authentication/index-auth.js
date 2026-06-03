const express = require('express');
const app = express();

const jwt = require('jsonwebtoken')
require('dotenv').config();

app.use(express.json());

const JWT_SECRETE = process.env.JWT_SECRETE;

const PersonModel = require('./schema.js');
const dbconnect = require('./DBconnect.js');

/*
In the postman use the following URL
localhost:5002/login

{
  "email":"a@gmail.com",
  "password":"abc",
  "role":"student"
}

*/
// const users = [
//     { username: 'joe', password: '123', role: 'student' },
//     { username: 'chandan', password: '123', role: 'teacher' }
// ];
// LOGIN API
app.post("/login", async (req, res) => {
  const {name, pass } = req.body;
  // Example using your PersonModel database schema
  const foundUser = await PersonModel.findOne({ name, pass });
      if (foundUser) {
        const token = jwt.sign({ 
          name: foundUser.name, role: foundUser.role }, JWT_SECRETE, { expiresIn: '24h' })
        return res.json({ token })
      }
      else {
        res.status(400).send("Invalid user")
      }
    }) //CLOSE THEN
//CLOSE CALLBACK FUNCTION BODY
//CLOSE Post METHOD

app.listen(5004, () => {
    console.log('Authentication Service Server is running on PORT NO: 5002')
})