import { useState } from "react"

function OTPForm() {
    const [OTP, setOTP] = useState(null);

    const handleOTP = (e) => {
        e.preventDefault();
    }
     return ( 
        <div>
            <h1 className="text-base text-center">To reset your password Please type OTP sent to your email.</h1>
            <form onSubmit={handleOTP} className="forgot-form max-w-md w-full mx-auto ">
                
                <label htmlFor="otp">Enter your One Time Password</label>
                <input type="password" id="otp" name="otp" value={OTP} onChange={(e) => setOTP(e.target.value)}requiired minLength="6" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4 bg-gray-200 "/>
                 <button type="submit" className="w-full h-16 rounded-lg bg-gradient-to-t from-yellow-600 to bg-yellow-300 hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center">Submit</button>
            </form>
        </div>
    )
} 


export default OTPForm
