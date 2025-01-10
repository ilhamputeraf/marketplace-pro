import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { useCart } from "../context/CartContext";  
import ProductDetailsPopup from "./ProductDetailsPopup";  

const ProductListingPage = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);  // State to manage selected product for popup
  const { addToCart } = useCart();  // Access addToCart function from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Group products by category
        const grouped = data.reduce((acc, product) => {
          const categoryName = product.category?.name || "Uncategorized";
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(product);
          return acc;
        }, {});

        setGroupedProducts(grouped);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  // Filter products based on the selected category
  const filteredProducts = categoryFilter === "All"
    ? groupedProducts
    : { [categoryFilter]: groupedProducts[categoryFilter] };

  // Handle product click to show popup
  const handleProductClick = (product) => {
    setSelectedProduct(product);  // Set the clicked product to be displayed in the popup
  };

  // Close the product details popup
  const handleClosePopup = () => {
    setSelectedProduct(null);  // Close the popup by clearing the selected product
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold mb-5 text-center text-pink-800">Product Listing</h1>

      {/* Category filter */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filter by Category: </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-pink-200 p-2 rounded-md"
        >
          <option value="All">All</option>
          {Object.keys(groupedProducts).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Render filtered products */}
      {Object.entries(filteredProducts).map(([categoryName, products]) => (
        <div key={categoryName} style={{ marginBottom: "40px" }}>
          <h2 style={{ marginBottom: "20px" }}>{categoryName}</h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            style={{ paddingBottom: "20px" }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div
                  className="border p-4 rounded-lg shadow hover:bg-pink-100 transition-all"
                  style={{
                    height: "380px",  // Fixed height for uniform card size
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-contain rounded mb-4 cursor-pointer"
                    onClick={() => handleProductClick(product)}  // Open the product details popup on image click
                  />
                  <h3 className="text-lg font-semibold text-pink-800">{product.title}</h3>
                  <p className="text-pink-600">${product.price}</p>
                  <button
                    onClick={() => addToCart(product)}  // Add product to cart
                    className="bg-primary text-white py-1 px-3 rounded mt-4 hover:bg-pink-400 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}

      {/* Show ProductDetailsPopup if selectedProduct is not null */}
      {selectedProduct && (
        <ProductDetailsPopup
          product={selectedProduct}
          onClose={handleClosePopup}  // Close the popup
        />
      )}
    </div>
  );
};

export default ProductListingPage;
