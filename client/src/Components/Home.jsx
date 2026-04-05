import { Link } from "react-router-dom";

const dishes = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and our special sauce.",
    price: "$8.99",
    image: "/images/classic-burger.png"
    },
    {
    id: 2,
    name: "Grilled Chicken",
    description: "Tender grilled chicken breast served with a side of veggies.",
    price: "$10.99",
    image: "/images/grilled-chicken.png"
    },
    {
    id: 3,
    name: "Veggie Wrap",
    description: "A healthy wrap filled with fresh vegetables and hummus.", 
    price: "$7.99",
    image: "/images/veggie-wrap.png"
    },
    {
    id: 4,
    name: "Chicken Briyani",
    description: "Aromatic basmati rice cooked with tender chicken and spices.",
    price: "$6.99",
    image: "/images/chicken-briyani.png"
    }
];

function Home() {
  return (
      <div className="container mx-auto px-4 py-8 font-text font-medium">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-2xl lg:text-4xl font-heading">Tasty Restaurant</h1>
      <p className=" text-gray-600 mb-4">
        At Tasty Food Restaurant we believe that good food is the key to a great mood. Our menu is crafted with love and care, using only the freshest ingredients to create delicious dishes that will satisfy your cravings.
      </p>
      <p className="text-gray-600 mb-4">
        Whether you're in the mood for a hearty meal or a light snack, we have something for everyone. From our signature burgers and sandwiches to our fresh salads and sides, there's something for every palate.
      </p>
      <p className=" text-gray-600 mb-4">
        We also offer a variety of beverages, including refreshing soft drinks, cold drinks, and juices. So come on in, grab a seat, and let us take care of the rest. Your taste buds will thank you!
      </p>

      <section className="dishes mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 md:text-4xl text-center font-heading">Our Dishes</h2>
        <div className="grid">
         {dishes.map((dish) => (
          <div key={dish.id} className="dish bg-gradient-to-tr from-orange-500 to-orange-600 rounded-lg shadow-md overflow-hidden font-extrabold hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-200  text-center ">
            <p className="description p-4 text-gray-900">{dish.description}</p>
            <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover"/>
            <p className="price p-4 text-gray-800 font-bold">{dish.price}</p>
            <Link to="./OrderForm" className="bg-gradient-to-tr from-orange-700 to bg-orange-800 text-gray-100 w-1/3 h-8 rounded-3xl hover:from-orange-700 hover:to-orange-500 hover:scale-105 inline-block premium-btn" >Order Now!</Link>
          </div>
         ))}

        </div>
        </section>
      </div>
  );
}

export default Home;