const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Loads your JWT_SECRET from the .env file

const app = express();
app.use(express.json()); // Allows your app to read JSON bodies

// 🛡️ THE SECURITY GUARD (Middleware Function)
function authenticateToken(req, res, next) {
    // Look for the token in the 'Authorization' header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If there is no token at all, block them immediately
    if (!token) {
        return res.status(401).json({ error: "Access Denied: No Token Provided!" });
    }

    // Verify if the token matches your secret key
    jwt.verify(token, process.env.JWT_SECRETE, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Access Denied: Invalid or Expired Token!" });
        }
        
        // Save the verified teacher details to the request
        req.user = user;
        next(); // Token is valid! Proceed to the route
    });
}

// 📌 1. Teacher post/enter marks (POST) - SECURED 🔒
app.post('/entermarks', authenticateToken, (req, res) => {
    res.send('<html><body>INSIDE ENTER MARKS API.. (Token Validated)</body></html>');
});

// 📌 2. View student submissions (GET) - SECURED 🔒
app.get('/viewsubmissions', authenticateToken, (req, res) => {
    res.send('<html><body>INSIDE VIEW SUBMISSIONS API.. (Token Validated)</body></html>');
});

// 📌 3. Teacher update profile (PUT) - SECURED 🔒
app.put('/teacherupdateprofile', authenticateToken, (req, res) => {
    res.send('<html><body>INSIDE UPDATE TEACHER PROFILE API.. (Token Validated)</body></html>');
});

// START THE EXPRESS SERVER. (Assuming Port 5002 for Teacher Service)
app.listen(5002, () => {
    console.log('EXPRESS Server started at Port No: 5002');
});