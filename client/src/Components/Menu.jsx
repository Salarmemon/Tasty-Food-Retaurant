import { useState, useEffect } from "react";

function Menu() {
    const [menuItems, setMenuItems] = useState([]);

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
                </div>
              ))}
            </section>
        </div>
    );
}

export default Menu;