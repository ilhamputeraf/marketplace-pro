import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext"; 
import { useCart } from "../context/CartContext";  
import ProductDetailsPopup from "./ProductDetailsPopup";
import Footer from "./Footer"; 

const HomePage = () => {
  const { products } = useProducts();  
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);  
  const [selectedProduct, setSelectedProduct] = useState(null);  
  const { addToCart } = useCart();  

  // Limit to 12 products
  const displayedProducts = products.slice(0, 12); // Only show the first 12 products

  // Filter products based on search query
  const filteredProducts = displayedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);  // Show popup on product click
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto py-10 bg-white">
      <h1 className="text-2xl font-bold mb-5 text-center text-pink-800">Best Selling Items</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 border border-pink-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-3 text-center">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded  border-pink-200 shadow hover:bg-pink-100">
              <img
                src={product.image}  // Use the image URL from product data
                alt={product.title}
                className="w-full h-48 object-contain rounded mb-4"
                onClick={() => handleProductClick(product)}  // Trigger popup on image click
              />
              <h2 className="text-lg font-semibold text-pink-800">{product.title}</h2>
              <p className="text-pink-600">${product.price}</p>
              <button
                onClick={() => addToCart(product)}  // Add to cart directly from homepage
                className="bg-primary text-white py-1 px-3 rounded mt-4 hover:bg-pink-400"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Show Popup if Product is Selected */}
      {showPopup && selectedProduct && (
        <ProductDetailsPopup
          product={selectedProduct}
          onClose={handleClosePopup}  // Close the popup
          onAddToCart={addToCart}  // Add to cart from popup
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
