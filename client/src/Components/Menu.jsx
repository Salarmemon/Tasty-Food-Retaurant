import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Menu() {
   const [menuItems, setMenuItems] = useState([])
   const navigate = useNavigate();
    const handleOrderNow = (item) => {
      localStorage.setItem("selectedDish", JSON.stringify({
        name: item.name, price: item.price
      }))
      navigate("/orderForm")
    }
    useEffect(() => {
        fetch("http://localhost:3000/menu")
        .then((response) =>response.json())
        .then((data) => setMenuItems(data))
        .catch((error) => console.log("Error fetching menu items:", error));
    }, [])
    return (
        <div className="container mx-auto px-4 py-8 ">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-6xl font-heading">Our Menu</h2>
            <p className="text-lg text-gray-600 mb-4 text-bold"> Explore our delicious menu filled with a variety of dishes to satisfy every craving. From hearty burgers and sandwiches to fresh salads and sides, we have something for everyone. Don't forget to check out our refreshing beverages to complement your meal!</p>
            <section className="menu-items mt-8 mb-8 grid gap-20 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {menuItems.map((item) => (
                <div key={item.id}
                className="menu-item bg-gradient-to-tr from-orange-400 to-orange-600 rounded-lg shadow-md overflow-hidden font-extrabold hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-200 text-center flex flex-col justify-between p-6">  
                  <p className="item-name text-xl font-bold mb-2 lg:2xl font-text">
                    {item.name}
                  </p>
                  <p className="item-description">
                    {item.description}
                  </p>
                  <img src={item.image} alt={item.name} className="item-image w-40 m-auto" />
                  <p className="item-price">{`$${item.price}`}</p>
                  <button onClick={(e) => handleOrderNow(item)}className="font-extrabold p-5 premium-btn block mx-auto text-gray-100 bg-gradient-to-r from-orange-600 to-orange-700 to-orange-800 hover:scale-110 hover:from-orange-800 hover:to-orange-700 w-1/2 text-center rounded-3xl active:scale-85 ">Order Now!</button>
                </div>
              ))}
            </section>
        </div>
    );
}

export default Menu;