function OrderForm() {
      
      const handleSubmit = (e) => {
  e.preventDefault();

  const selectedDish = JSON.parse(localStorage.getItem("selectedDish"));
  const dishName = selectedDish.name;
  const price = selectedDish.price
  const name = e.target.name.value;
  const phone = e.target.phone.value;
  const address = e.target.address.value;
  const quantity = e.target.quantity.value;

  const message = `Hello, I want to order: ${dishName}
Name: ${name}
Phone: ${phone}
Address: ${address}
Quantity: ${quantity}
totalCost: $${quantity * price}`;

  const url = `https://wa.me/923228765876?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};
    return (
        <div className="container mx-auto px-4 py-8 font-text font-medium">
        
            <p className="text-center">Please fill out the form below to place an order</p>
            <form onSubmit={handleSubmit}className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" className="w-3/4 p-2 sm:w-full border border-gray-300 rounded mb-4" required />
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" className="w-3/4 p-2 sm:w-full border border-gray-300 rounded mb-4" required />
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" className="w-3/4 p-2 sm:w-full border border-gray-300 rounded mb-4" required />
                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" className="w-3/4 p-2 sm:w-full border border-gray-300 rounded mb-4" required />
                <button type="submit" className="bg-gradient-to-r  from-fuchsia-400 to-fuchsia-600 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300 m-auto animate-bounce">Submit Order</button>
             </form>
             </div>
       


    
        )

}

export default OrderForm