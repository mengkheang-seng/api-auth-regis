const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Loads your JWT_SECRET from the .env file

const app = express();
app.use(express.json()); // Allows your app to read JSON bodies if needed

// 🛡️ THE SECURITY GUARD (Middleware Function)
function authenticateToken(req, res, next) {
    // Look for the token in the 'Authorization' header
    const authHeader = req.headers['authorization'];
    // Headers usually look like: "Bearer TOKEN_STRING", so we split it to get just the token
    const token = authHeader && authHeader.split(' ')[1];

    // If there is no token at all, block them immediately
    if (!token) {
        return res.status(401).json({ error: "Access Denied: No Token Provided!" });
    }

    // Verify if the token is authentic using your secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Access Denied: Invalid or Expired Token!" });
        }
        
        // Save the verified user data into the request object so routes can use it
        req.user = user;
        next(); // Token is good! Pass the request to the actual route handler
    });
}

// 📌 1. Student submit assignment (POST) - SECURED 🔒
app.post('/submitassignment', authenticateToken, (req, res) => {
    res.send('<html><body>INSIDE SUBMIT ASSIGNMENT API.. (Token Validated)</body></html>');
});

// 📌 2. View assignment (GET) - SECURED 🔒
app.get('/viewassignment', authenticateToken, (req, res) => {
    res.send('<html><body>INSIDE VIEW ASSIGNMENT API.. (Token Validated)</body></html>');
});

// 📌 3. Student update profile (PUT) - SECURED 🔒
app.put('/studentupdateprofile', authenticateToken, (req, res) => {
    res.send('<html><body>INSIDE UPDATE PROFILE API.. (Token Validated)</body></html>');
});

// START THE EXPRESS SERVER
app.listen(5001, () => {
    console.log('EXPRESS Server started at Port No: 5001');
});