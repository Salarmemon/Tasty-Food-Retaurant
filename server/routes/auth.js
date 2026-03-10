const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db'); 

router.post('/signup', async (req, res) => {
    // Handle user signup logic here
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const result = await pool.query(
            "INSERT INTO users(name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING name, email", 
            [name, email, hashedPassword]
        
        )
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
module.exports = router;