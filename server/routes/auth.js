const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db'); 
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})
router.post('/signup', async (req, res) => {
    // Handle user signup logic here
    
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const result = await pool.query(
            "INSERT INTO users(name, email, password, user_token, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING name, email", 
            [name, email, hashedPassword, verificationToken]
        
        )
        const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;
        
        try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify you email!",
            html: `<p> Click this link to verify <a href="${verificationLink}">Verify Email </a> </p>`
        })
            
    } catch (err) {
        console.log(err)
    }
        res.status(201).json({ message: "Signup successfully" }); 
    }
        catch (err) {
            if (err.code === '23505') { // Unique violation error code
                return res.status(400).json({ message: "Email already exists" });
            }
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }


})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });

    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const user = result.rows[0];
        if (!user.is_verified) {
            return res.status(403).json({message: "Please verify your email first:"})
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }

})

router.get("/verify/:token", async (req, res) => {
    const { token } = req.params;
    try {
    await pool.query("UPDATE users SET is_verified = True, user_token = NULL WHERE user_token = $1", [token])
    res.send("Verification Succesfull");
    } catch(err) {
        return res.status(500).json({message: "Internal server error"});
    }
})

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(500).json({message: "email is required"})
    }
    
})
module.exports = router;