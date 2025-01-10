import React from "react";
import { useCart } from "../context/CartContext";  

const ProductDetailsPopup = ({ product, onClose }) => {
  const { addToCart } = useCart();  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-pink-200 text-pink-900 p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <button onClick={onClose} className= "text-red-500 hover:text-pink-400 font-bold">X</button>
        </div>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-contain rounded mb-4"
        />
        <p>{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>
        <button
          onClick={() => addToCart(product)}  // Add to cart from the popup
          className="bg-pink-600 text-white py-1 px-3 rounded mt-4 hover:bg-pink-400"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;
