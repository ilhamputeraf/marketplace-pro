import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";  // Import the useCart hook

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();  // Access cart, removeFromCart, and updateQuantity from context
  const [total, setTotal] = useState(0);

  const handleRemove = (productId) => {
    removeFromCart(productId);  // Remove item from cart
  };

  const handleIncrease = (productId) => {
    updateQuantity(productId, 1);  // Increase quantity
  };

  const handleDecrease = (productId) => {
    updateQuantity(productId, -1);  // Decrease quantity (if greater than 1)
  };

  useEffect(() => {
    if (cart.length > 0) {
      let totalCart = 0;
      cart.forEach((item) => {
        totalCart += item.price * item.quantity;
      });
      setTotal(totalCart);
    }
  }, [cart]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5 text-center text-pink-800">Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">Your cart is empty</div>
      ) : (
        <div>
          <ul className="border p-2 rounded-xl border-pink-400">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h2>{item.title}</h2>
                    <p>${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="bg-pink-600 text-white py-1 px-2 rounded-full mr-2"
                  >
                    -
                  </button>
                  <span className="mr-4">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="bg-pink-600 text-white py-1 px-2 rounded-full mr-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-pink-800 border p-2 border-pink-400 rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4">
            <h2 className="text-xl font-semibold text-pink-800">Total: ${total}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
