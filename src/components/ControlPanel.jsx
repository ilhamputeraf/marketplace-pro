import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';  // Import useProducts hook

const ControlPanel = () => {
  const { products, addProduct, removeProduct } = useProducts();  // Access products and methods
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    image: '',
  });
  const [recentlyAdded, setRecentlyAdded] = useState([]);  // Track recently added products
  const [recentlyRemoved, setRecentlyRemoved] = useState([]);  // Track recently removed products

  const handleAddProduct = () => {
    if (newProduct.title && newProduct.price && newProduct.image) {
      addProduct(newProduct);  // Add product via context
      setRecentlyAdded([newProduct, ...recentlyAdded]);  // Track added product
      setNewProduct({ title: '', price: '', image: '' });  // Clear input fields
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleRemoveProduct = (productId) => {
    // Find the product that was removed to track it
    const productToRemove = products.find((product) => product.id === productId);
    if (productToRemove) {
      removeProduct(productId);  // Remove the product from context by its ID
      setRecentlyRemoved([productToRemove, ...recentlyRemoved]);  // Track the removed product
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5 text-center text-pink-800">Control Panel</h1>

      {/* Add Product Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-pink-800">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="w-full mb-2 p-2 border border-pink-200 rounded"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="w-full mb-2 p-2 border border-pink-200 rounded"
        />
        <input
          type="text"
          placeholder="Product Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="w-full mb-4 p-2 border border-pink-200 rounded"
        />
        <button
          onClick={handleAddProduct}
          className="bg-primary text-white py-1 px-3 rounded mt-4 hover:bg-pink-400"
        >
          Add Product
        </button>
      </div>

      {/* Recently Added Products */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-pink-800">Recently Added Products</h2>
        {recentlyAdded.length === 0 ? (
          <p>No products added recently.</p>
        ) : (
          <ul>
            {recentlyAdded.map((product, index) => (
              <li key={index} className="mb-2">
                {product.title} - ${product.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Products List with Remove Option */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-pink-800">Products List</h2>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id} className="flex justify-between mb-4">
                <div>
                  {product.title} - ${product.price}
                </div>
                <button
                  onClick={() => handleRemoveProduct(product.id)}  // Pass the product ID to remove only that product
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recently Removed Products */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-pink-800">Recently Removed Products</h2>
        {recentlyRemoved.length === 0 ? (
          <p>No products removed recently.</p>
        ) : (
          <ul>
            {recentlyRemoved.map((product, index) => (
              <li key={index} className="mb-2">
                {product.title} - ${product.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
