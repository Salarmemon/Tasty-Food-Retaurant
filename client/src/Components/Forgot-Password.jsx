import { useState } from "react"
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email) {
            alert("Email is required for password reset process.")
        }
        const res = await fetch("http://localhost:3000/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
        });

        const data = await res.json();
        if(res.ok) {
            alert(data.message);
            setEmail("");
            navigate("/OTPForm");
        } else {
            alert(data.message);
        }
    
}
    return ( 
        <div>
            <h1 className="text-base text-center">To reset your password please Type your email address below.</h1>
            <form onSubmit={handleSubmit} className="forgot-form max-w-md w-full mx-auto ">
                
                <label htmlFor="email">Enter your email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}requiired className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4 bg-gray-200 "/>
                 <button type="submit" className="w-full h-16 rounded-lg bg-gradient-to-t from-yellow-600 to bg-yellow-300 hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center">Submit</button>
            </form>
        </div>
    )
} 


export default ForgotPassword;

