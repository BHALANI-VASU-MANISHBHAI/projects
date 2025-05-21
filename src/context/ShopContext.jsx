import { createContext, useState, useEffect } from "react";
import { products } from "../assets/frontend_assets/assetss";
import cloneDeep from "lodash/cloneDeep";
import { toast } from "react-toastify";
import { set } from "lodash";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  
  const navigate = useNavigate();


// Card Functionality 
  const addToCart = (itemId, size) => {

    let cartData = cloneDeep(cartItems);
    // check if itemId is size is select or not
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
// structer  like 
// {
//   id :{
//     'M': 1,
//     'L': 2,
//     'XL': 3
//   }
// }
    if (cartData[itemId]) {

      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {}; // first we make empty object
      // then we add size and quantity
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
              // we add all size of the item
                // like M, L, XL
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

//using this we update the cart count and cart data
const updateQuantity =  async ({itemId,size,quantity})=>{
  console.log("itemId", itemId);
  let cartData = cloneDeep(cartItems);

  cartData[itemId][size] = quantity;

  setCartItems(cartData);
}

//get cart Amount

const getCartAmount =  () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const product = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
       try{
          if (cartItems[items][item]) {
            totalAmount +=
              product.price * cartItems[items][item] +
              delivery_fee * cartItems[items][item];
          }
       }catch(e){
        console.log("Error in cart amount", e);
       }
      }
    }
    return totalAmount;
};


  // this used for console log
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
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
