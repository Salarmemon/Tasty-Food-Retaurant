import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const navigate = useNavigate();
    const handleSubmit = async (e) => {
      
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to the server)
        if (!email || !password || !name) {
            alert("Please fill in all fields.");
            return;
        }
        const res = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
            
        });
        const data = await res.json();
        
        if (res.ok) {
            alert(data.message);
            setName("");
            setEmail("");
            setPassword("");
            navigate("/login");
        } else {
            navigate("/retry");
    }

}
    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-6xl font-heading">Sign Up</h2>
            <p className="text-lg text-gray-600 mb-4 text-bold">Create an account to enjoy our delicious menu and exclusive offers. Sign up now to start your culinary journey with us!</p>
            <Link to="/home" className="skip w-36 cursor-pointer h-16 rounded-lg bg-gradient-to-t mt-8 from-yellow-600 to-yellow-300 mx-auto flex justify-center items-center hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center">Skip For Now</Link>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 foc us:ring-yellow-500" required />
                
        
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            
            
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value) }name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" required/>
        
                <button type="submit" className="w-full h-16 rounded-lg bg-gradient-to-t from-yellow-600 to bg-yellow-300 hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center mt-12">Sign Up</button>
            </form>
            <div className="text-center"> <h3 className="mx-auto text-center inline font-extralight mt-8">Already have an account?</h3>
             <Link to="/login" className="login w-28 cursor-pointer h-16 rounded-lg bg-gradient-to-t mt-8 from-yellow-600 to-yellow-300 mx-auto  justify-center items-center hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center inline">Login</Link>
</div>

        </>

    );
}

export default Signup;