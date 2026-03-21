import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({email, setEmail}) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.message);
            setEmail("");
            setPassword("");
            navigate("/home");
        } else {
            alert(data.message);
        }

    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Login</h1>
            <p className="text-lg text-gray-600 mb-8">Welcome back! Please enter your credentials to access your account and continue enjoying our delicious menu and exclusive offers.</p>

            <form onSubmit={handleSubmit} className="max-w-md w-full">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4" required />

                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-6" required />
                <button type="submit" className="w-full h-16 rounded-lg bg-gradient-to-t from-yellow-600 to bg-yellow-300 hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center">Login</button>
            </form>
            
            <Link  to="/forgot-password" className="btn w-32 h-18 bg-gradient-to-t from-blue-200 to-blue-400 cursor-pointer hover:from-blue-400 hover:to-blue-200 hover:scale-105 mt-7  rounded-3xl text-center font-bold">Forgot Passsword</Link>

            <Link to="/" className="px-6 py-3 bg-gradient-to-t from-yellow-600 to-yellow-300 rounded-lg hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center mt-8">Go to Signup</Link>
        </div>
    );
}

export default Login;