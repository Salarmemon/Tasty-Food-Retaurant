import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-orange-900 p-4 flex justify-between font-text items-center shadow-md fixed w-full top-0 left-0 z-30 flex-wrap flex-col md:flex-row hover:bg-orange-700 transition-all ease-in ">
        <div className="logo font-bold text-gray-100 ml-6 w-24 h-16  lg:w-32 lg:h-28 text-center shadow-lg  hover:scale-110  hover:rotate-3 bg-orange-900 rounded-2xl p-4 transition-all ease hover:bg-orange-700">
         <svg viewBox="0 0 140 140" className="w-full h-full mx-auto transition-all hover:scale-110" fill="none">
  
  {/* Plate */}
  <circle 
    className="draw"
    cx="70" cy="70" r="50"
    stroke="white"
    strokeWidth="2"
    
  />

  {/* Steam lines */}
  <path 
    className="draw delay1 plate"
    d="M40 30 Q45 20 50 30"
    stroke="white"
    strokeWidth="2"
    fill="none"
  />

  <path 
    className="draw delay2"
    d="M50 30 Q55 20 60 30"
    stroke="white"
    strokeWidth="2"
    fill="none"
  />
<svg viewBox="0 0 120 120" className="w-full h-full mx-auto" fill="none">

<text
    x="60"
    y="10"
    textAnchor="middle"
    className="text-fade"
    fontSize="14"
    fill="white"
    stroke="white"
    strokeWidth="0.2"
  >
    Tasty Restaurant
  </text>



</svg>
</svg>
          </div>

        <ul className="nav-links flex space-x-6 mr-12">
            <li><Link to="/home" className="link text-gray-200 inline-block hover:text-gray-900 font-bold hover:scale-110 transition-all duration-200 hover:animate-pulse text-sm sm:text-bas e md:text-lg hover:scale-125">Home</Link></li>
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