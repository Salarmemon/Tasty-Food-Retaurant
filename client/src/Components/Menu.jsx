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
            <section className="menu-items mt-8 mb-8 grid gap-6 lg:grid-cols-2">
              {menuItems.map((item) => (
                <div key={item.id}
                className="menu-item">  
                  <p className="item-name">
                    {item.name}
                  </p>
                  <p className="item-description">
                    {item.description}
                  </p>
                  <img src={item.image} alt={item.name} className="item-image w-40 m-auto" />
                  <p className="item-price">{`$${item.price}`}</p>
                  <button onClick={(e) => handleOrderNow(item)}className="p-5 premium-btn block mx-auto bg-gradient-to-t from-green-300 to-green-400 hover:scale-105 hover:from-green-400 hover:to-green-200 w-1/2 text-center rounded-3xl">Order Now!</button>
                </div>
              ))}
            </section>
        </div>
    );
}

export default Menu;