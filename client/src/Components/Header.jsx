import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#030793] p-4 flex justify-between font-text items-center shadow-md fixed w-full top-0 left-0 z-30 flex-wrap flex-col md:flex-row hover:bg-blue-700 transition-all ease-in">
        <div className="logo font-bold text-gray-100 ml-6 w-16 h-16  lg:w-24 lg:h-24 text-center hover:scale-110 bg-blue-400 rounded-2xl p-4 transition-all ease hover:bg-blue-500"><img src="src/assets/logo.png" className="w-full h-auto" alt="restaurant's logo"/></div>
        <ul className="nav-links flex space-x-6 mr-12">
            <li><Link to="./" className="link text-gray-200 inline-block hover:text-gray-900 font-bold hover:scale-110 transition-all duration-200 hover:animate-pulse text-sm sm:text-bas e md:text-lg hover:scale-125">Home</Link></li>
            <li>
              <Link to="./Menu" className="link text-gray-200 inline-block hover:text-gray-900 font-bold hover:scale-110 transition-all duration-200 hover:animate-pulse text-sm sm:text-base md:text-lg hover:scale-125 font-text">Menu</Link>
            </li>
            <li>
              <Link to="./About" className="link text-gray-200 inline-block hover:text-gray-900 font-bold hover:scale-110 transition-all duration-200 hover:animate-pulse text-sm sm:text-base md:text-lg hover:scale-125">About</Link>
            </li>
            <li>
              <Link to="./Contact" className="link text-gray-200 inline-block hover:text-gray-900 font-bold hover:scale-110 transition-all duration-200 hover:animate-pulse text-sm sm:text-base md:text-lg hover:scale-125">Contact</Link>
            </li>
        </ul>
    
    
    </nav>
  );
}


function Header() {
  return (
    <header className="font-text">  
      <Navbar />
      <div className="header-image mt-28 md:mt-32 relative w-full">

        <img src="src/assets/header-image.jpg" alt="restaurant's header image" className="w-full h-60 object-cover  rounded-lg shadow-md header-img"/>

        <div className="overlay w-full h-full opacity-50 absolute top-0 left-0 bg-black rounded-lg"></div>

        <h2 className="header-text absolute  left-1/2 top-4 transform -translate-x-1/2 mt-6 text-[#FF9B04] text-xl md:text-2xl lg:text-4xl sm:text-base font-bold font-heading">Tasty Food</h2>
        <h2 className="header-subtext absolute left-1/2 top-36 transform -translate-x-1/2 sm:text-medium text-[#ff9b04] text-xl  md:text-2xl lg:text-4xl font-medium font-heading">Good Food, Great Mood</h2>
      </div> 
    </header>
  );
}

export default Header;