import  {  useState } from 'react';
import { assets } from "../assets/admin_assets/assets";
import { assetss } from "../assets/frontend_assets/assetss";
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
import { GlobalContext } from "../context/GlobalContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { useLocation } from 'react-router-dom';



const Navbar = () => {
  const location = useLocation();
  //setShowSearch ,getCartCount , navigate , setToken , setCartItems,token,userData,setUserData
  const {setShowSearch, setToken, token,navigate} = useContext(GlobalContext);
  const { getCartCount, setCartItems } = useContext(CartContext);
  const { userData, setUserData } = useContext(UserContext);
    
  const [visible, setVisible] = useState(false);
const  logout = () => {
  setToken('');
  localStorage.removeItem('token');
  setCartItems({});
  setUserData({});
  navigate('/login');
}
 


  return (
    <div className='flex justify-between items-center py-4'>
<Link to='/'>
  <div className="w-32 aspect-[16/5] relative">
    <img 
      src={assetss.logo} 
      alt="logo" 
      className="absolute inset-0 w-full h-full object-contain"
    />
  </div>
</Link>


      {/* Desktop Navigation Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none hidden h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none hidden h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none hidden h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none hidden h-[1.5px] bg-gray-700" />
        </NavLink>
      </ul>

      {/* Icons Section */}
      <div className='flex gap-5 items-center'>

        <img  onClick={(e)=>
        location.pathname !== '/collection' ? setShowSearch(false) :
        setShowSearch(true)
        }  src={assetss.search_icon} alt="search" className='w-5 h-5 cursor-pointer' />

        {/* Profile Dropdown */}
        <div className='group relative'>
    
  <img 
  onClick={() => token ? null : navigate('/login')} 
  src={
    userData.profilePhoto
      ? userData.profilePhoto
      : "https://res.cloudinary.com/drezv2fgf/image/upload/v1748439973/Profile_avatar_placeholder_large_px5gio.png"
  } 
  alt="profile" 
  className={`cursor-pointer rounded-full ${userData.profilePhoto ? 'w-7 h-7' : 'w-5 h-5'}`} 
/>

     { token &&
          <div className='group-hover:block hidden absolute right-0 pt-4'>
            <div className='flex flex-col bg-white shadow-lg rounded-lg p-4 gap-2 w-40'>
              <p onClick={()=>navigate('/profile-view')}   className='text-sm text-gray-700 hover:text-black cursor-pointer'>My Profile</p>
              <p  onClick={()=>navigate('/orders')}  className='text-sm text-gray-700 hover:text-black cursor-pointer'>Orders</p>
              <p onClick={logout}  className='text-sm text-gray-700 hover:text-black cursor-pointer'>Logout</p>
            </div>
          </div>
}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
     <img src={assetss.cart_icon} alt="cart" className='w-5 h-5 cursor-pointer' />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black aspect-square rounded-full text-[8px] text-white">
            {getCartCount()}
          </p>
        </Link>

          
        <img
          onClick={() => setVisible(true)}
          src={assetss.menu_icon}
          alt="menu"
          className='w-5 cursor-pointer sm:hidden'
        />
      </div>

      {/* Mobile Sidebar Menu */}
      <div
  className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out ${
    visible ? 'w-full' : 'w-0'
  }`}
>
  <div className="flex flex-col gap-5 p-4">
    <div
      className="flex items-center gap-4 p-3 cursor-pointer"
      onClick={() => setVisible(false)}
    >
      <img src={assetss.dropdown_icon} alt="back" className="h-4 rotate-180" />
      <p>Back</p>
    </div>

    <NavLink
      className="py-2 pl-6 border"
      to="/"
      onClick={() => setVisible(false)}
    >
      HOME
    </NavLink>

    <NavLink
      className="py-2 pl-6 border"
      to="/collection"
      onClick={() => setVisible(false)}
    >
      COLLECTION
    </NavLink>

    <NavLink
      className="py-2 pl-6 border"
      to="/about"
      onClick={() => setVisible(false)}
    >
      ABOUT
    </NavLink>

    <NavLink
      className="py-2 pl-6 border"
      to="/contact"
      onClick={() => setVisible(false)}
    >
      CONTACT
    </NavLink>
  </div>
</div>

    </div>
  );
};

export default Navbar;
