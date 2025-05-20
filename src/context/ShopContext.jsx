import { createContext, useState, useEffect } from "react";
import { products } from "../assets/frontend_assets/assetss";
import cloneDeep from "lodash/cloneDeep";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
// Card Functionality 
  const addToCart = (itemId, size) => {
    let allsizes = ["M", "L", "XL"];
    let cartData = cloneDeep(cartItems);
    console.log(cartData);
    console.log("itemId", itemId);
    console.log("size", size);

    if (!allsizes.includes(size)) {
      toast.error("Select Product Size");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };
  //--------------------GET CART COUNT--------------
  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems) {
        for(const item in cartItems[items]) {
            try{
                if(cartItems[items][item]) {
                    totalCount += cartItems[items][item];
                }

            }catch(e) {
                console.log("Error in cart count", e);
            }
        }
    }
    return totalCount;
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
