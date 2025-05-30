import { createContext, useState, useEffect, use } from "react";
import { products } from "../assets/frontend_assets/assetss";
import cloneDeep from "lodash/cloneDeep";
import { toast } from "react-toastify";
import { get, set } from "lodash";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState({});
  const[isSubcriber, setIsSubscriber] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token ,setToken] = useState('');
  
  const navigate = useNavigate();


// Card Functionality 
  const addToCart =async (itemId, size) => {

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
      // This is Create new item
      cartData[itemId] = {}; // first we make empty object
      // then we add size and quantity
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if(token){
        try{
              await axios.post(backendUrl+"/api/cart/add", {itemId,size},{headers:{token}});
        }catch(e){
          console.log("Error in add to cart", e);
          toast.error("Failed to add item to cart");
        }
    }

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

  if(token){
    try{
      await axios.post(backendUrl+"/api/cart/update", {itemId,size,quantity},{headers:{token}});

    }catch(e){
      console.log(e);
      toast.error("Failed to update cart");
    }
  }

}

//get cart Amount

const getCartAmount =  () => {
    if (!products.length) {
      return 0;
    }
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

const getUserCart = async(token)=>{
   try{
     const response = await axios.post(backendUrl+"/api/cart/get", {userId:token},{headers:{token}});

     if(response.data.success){
        setCartItems(response.data.cartData);
     }
   }catch(e){
      console.log("Error in get cart items", e);
      toast.error("Failed to load cart items");
   }
}



  // Fetch products from backend
   const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl+"/api/product/list")  
      if(response.data.success){
        setProducts(response.data.products);
      }else{
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  }
  const getUserData = async (token) => {
    if(!token) {
      return;
    }
    try{
      console.log("Token in getUserData:", token);
    const response = await axios.post(
  backendUrl + "/api/user/getdataofuser",
  { someKey: "someValue" },  // <-- Pass as plain JS object
  { headers: { token } }
);

      console.log("User Data Response:", response.data);
      if(response.data.success){
        setUserData(response.data.user);
      }else{
        toast.error("Failed to load user data");
      }
    }catch(e){
      console.log("Error in get user data", e);
      toast.error("Failed to load user data");
    }

  } 
useEffect(() => {
    getProductsData();
  }, []);
    

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
     getUserCart(localStorage.getItem('token'));

      getUserData(localStorage.getItem('token'));
    
    }
  },[])



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
    backendUrl,
    token,
    setToken,
    getUserCart,
    getProductsData,
    getUserData,
    userData,
    setUserData,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
