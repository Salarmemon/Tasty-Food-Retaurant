import { Routes, Route, useLocation} from "react-router-dom";
import { useState } from "react";

import Header from "./Header";
import Home from "./Home";
import Menu from "./Menu";
import About from "./About";
import Contact from "./Contact";
import OrderForm from "./OrderForm";
import Signup from "./Signup";
import Retry from "./Retry";
import Login from "./Login";
import ForgetPassword from "./Forgot-Password";
import OTPForm from "./OTPForm";
import resetPassword from "./ResetPassword";
function Layout() {
    const [email, setEmail] = useState("");
    const location = useLocation();
    const isSignupPage = location.pathname === "/" || location.pathname === "/retry" || location.pathname === "/login" || location.pathname === "/forgot-password" || location.pathname === "/OTPForm" || pathname === "/resetPassword";
    return (
        <div>
            {!isSignupPage && <Header />}
            <Routes>
                <Route path="/" element={<Signup email={email} setEmail={setEmail} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/orderform" element={<OrderForm />} />
                <Route path="/retry" element={<Retry />} />
                <Route path="/login" element={<Login email={email} setEmail={setEmail}/>} />
                <Route path="/forgot-password" element={<ForgetPassword email={email} setEmail={setEmail}/>} />
                <Route path="/OTPForm" element={<OTPForm email={email} setEmail={setEmail}/>}></Route>
                <Route path="/resetPassword" element={<resetPassword email={email} setEmail={setEmail}/>}></Route>
            </Routes>
            {!isSignupPage && <Contact />}
        </div>
    );
}
    
export default Layout;