import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTPForm({email, setEmail}) {
    const navigate = useNavigate();
    const [OTP, setOTP] = useState("");


    const handleOTP = async (e) => {
        e.preventDefault();

        if (!OTP) {
            alert("Please enter your OTP");
            return
        }

        const res = await fetch("http://localhost:3000/auth/otp-verification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ OTP, email })
        });
        const data = await res.json();
        if(res.ok) {
            setOTP("");
            alert(data.message);
            navigate("/resetPassword");
        } else {
            alert(data.message); 
        }
    }
    const resendOTP = async () => {
        const data = await fetch("http://localhost:300/auth/resendOTP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                
            }
        })
    }
     return ( 
        <div>
            <h1 className="text-base text-center">To reset your password Please type OTP sent to your email.</h1>
            <form onSubmit={handleOTP} className="forgot-form max-w-md w-full mx-auto ">
                
                <label htmlFor="otp">Enter your One Time Password</label>
                <input type="password" id="otp" name="otp" value={OTP} onChange={(e) => setOTP(e.target.value)}required minLength="6" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4 bg-gray-200 "/>
                 <button type="submit" className="w-full h-16 rounded-lg bg-gradient-to-t from-yellow-600 to bg-yellow-300 hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center">Submit</button>
                 
            </form>
            <button type="button" id="resend-btn" className="w-1/2 h-16 rounded-lg bg-gradient-to-tr from bg-green-50 to-green-200 hover:from-green-200 hover:to-green-50 hover:scale:105 font-bold text-center" onClick={resendOTP}>Resend OTP</button>
        </div>
    )
} 


export default OTPForm
