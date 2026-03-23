import { useState } from "react";
import { useNavigate } from "react-router-dom";

function resetPassword({email, setEmail}) {
    setEmail(localStorage.getItem("email"));
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            alert("Please fill out the required fields");
            return
        }

        const res = await fetch("http://localhost:3000/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newPassword, confirmPassword, email})
        });
        const data = await res.json();
        if(res.ok) {
            setNewPassword("");
            setConfirmPassword("");
            alert(data.message);
            navigate("/login");
        } else {
            alert(data.message); 
            return;
        }
    }
     return ( 
        <div>
            <h1 className="text-base text-center">Type your new password</h1>
            <form onSubmit={handleReset} className="forgot-form max-w-md w-full mx-auto ">
                
                <label htmlFor="new-password">New password</label>
                <input type="password" id="new-password" name="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}required minLength="8" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4 bg-gray-200 "/>
            
                <label htmlFor="confirm-password">Retype password</label>
                <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}required minLength="8" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4 bg-gray-200 "/>
            
                 <button type="submit" className="w-full h-16 rounded-lg bg-gradient-to-t from-yellow-600 to bg-yellow-300 hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center">Reset</button>
            </form>
        </div>
    )
} 


export default resetPassword;
