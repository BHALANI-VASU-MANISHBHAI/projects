import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { ProductContext } from "./ProductContext";

const ProductContextProvider = ({ children }) => {
  const { backendUrl, token } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);

  // Load cached products immediately (if present)
  useEffect(() => {
    getProductsData(); // Fetch fresh products in background
  }, []);

  // Fetch from backend and update state + cache
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  };

  const value = {
    products,
    setProducts,
    getProductsData,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
