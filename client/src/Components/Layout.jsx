import { Routes, Route, useLocation} from "react-router-dom";

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

function Layout() {
    const location = useLocation();
    const isSignupPage = location.pathname === "/" || location.pathname === "/retry" || location.pathname === "/login" || location.pathname === "/forgot-password";
    return (
        <div>
            {!isSignupPage && <Header />}
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/orderform" element={<OrderForm />} />
                <Route path="/retry" element={<Retry />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgetPassword/>} />
            </Routes>
            {!isSignupPage && <Contact />}
        </div>
    );
}
    
export default Layout;