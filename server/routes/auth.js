const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db'); 
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { userInfo } = require('os');

;
// utlity functions

// check is some value is empty 
/*
const checkEmpty = (value1, value2="1", value3="1", message, status) => {
    if (!value1 || !value2 || !value3) {
        return res.status.(status).json({message: message});
    }
}
  */
const generateOtp = ()=> {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let otp = "";
    for (let i = 0; i < 6; i++) {
        otp += numbers[crypto.randomInt(numbers.length)];
    }
    return otp
}


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
            const verificationToken = crypto.randomBytes(32).toString("hex");
            await pool.query("UPDATE users SET user_token = $1 WHERE email = $2", [verificationToken, email]);
            const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "User verification link",
                html: `<p>Please click the following link to verify your email address.
                <br>
                <a href="${verificationLink}">Verify Email</a></p>`
            })         
            return res.status(403).json({message: "Please verify your email first: The verification link has been sent to your email address"});
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
    res.send("<p>Verification Succesfull</p>");
    } catch(err) {
        return res.status(500).json({message: "Internal server error"});
    }
})

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({message: "email is required"})
    }

    try {
        const userResult = await pool.query("SELECT user_id, email FROM users WHERE email = $1", [email])
        if (userResult.rows.length === 0) {
            return res.status(400).json({"message": "Email does not exist"});
        }
        const user = userResult.rows[0];
        const OTP = generateOtp();
        await pool.query("UPDATE users SET user_otp = $1, user_otp_expires = $2 WHERE email = $3", [OTP, new Date(Date.now() + 3000 * 60).toISOString(), user.email]);
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP",
            html: `<p>Use this OTP to reset your password</p>
            <p>Please do not share this code to anyone ${OTP}</p>`
        })

        return res.status(200).json({message: "OTP sent succesfully to your email."});
          
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }

    
})

router.post("/otp-verification", async (req, res) => {
    try {
    const {OTP, email} = req.body;
    
    if (!OTP) {
        return res.status(400).json({message: "otp is required for reset password process"});
    }
    const userResult = await pool.query("SELECT user_id, user_otp, user_otp_expires FROM users WHERE user_otp = $1 AND email = $2", [OTP, email]);

    if (userResult.rows.length === 0) {
        console.log(OTP);
        console.log(`email ${email}`)
        return res.status(400).json({message: "wrong otp try again later!"});
    }
    const user = userResult.rows[0];
    const isOTPExpired = new Date(user.user_otp_expires).getTime() <  Date.now();
    if(isOTPExpired) {
        console.log(isOTPExpired);
        console.log(new Date(user.user_otp_expires));
        console.log(Date.now());
        return res.status(400).json({message: "OTP has been expired"});
    } else {
    

            if (user.user_otp == OTP) {
                await pool.query("UPDATE users SET user_otp = null, user_otp_expires = null WHERE user_id = $1", [user.user_id]);
                return res.status(200).json({message: "Succes! reset your password"});
            } else {
                return res.status(400).json({message: "Wrong credentials"});
            }
            

        
        }  
    }  catch(err) {
            console.log(err);
            return res.status(500).json({message: "Internal server error"});
        }
})

router.post("/reset-password", async (req, res) => {
    try {
        console.log(req.body.confirmPassword)
    const {newPassword, confirmPassword, email} = req.body;
    if (!newPassword || !confirmPassword || !email) {
        console.log(`newPass: ${newPassword} confirmPass: ${confirmPassword} email: ${email}`)
        return res.status(400).json({message: "Please fill out required fields"});
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({message: "Password does not match"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const userResult = pool.query("UPDATE users SET password = $1 WHERE email = $2 RETURNING user_id", [hashedPassword, email]);

    if ((await userResult).rows.length === 0) {
        return res.status(400).json({message: "User not found"})
    }

    return res.status(200).json({message: "Password reset succesfull"});
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: "Internal server error"});
    }

})

router.post("resend-otp", (req, res) => {
    const {email} = req.body;

})
module.exports = {authRoute: router};