import React from 'react'
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import  {useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const [currentState, setCurrentState] = React.useState('Login');
  const {token ,setToken , navigate,backendUrl} = React.useContext(ShopContext);

  const[name ,setName] = useState('');
  const[email ,setEmail] = useState('');
  const[password ,setPassword] = useState('');
  
  const onSubmitHandler =async (e) => {
    e.preventDefault();

    try{
        if(currentState=='Sign up'){
          const response = await axios.post(backendUrl+'/api/user/register', { name, email, password });
          
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            toast.success('Successfully signed up');
          }else{
             toast.error(response.data.message || 'Failed to sign up');
          }
        }else{
           
          const response = await axios.post(backendUrl+'/api/user/login', { email, password });
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            toast.success('Successfully logged in'); 
          }else{
            toast.error(response.data.message || 'Failed to log in');
          }
        }
    }catch(e){
      console.log("Error in login/signup", e);
      toast.error(e.message);
    }
  }

  // Redirect to home page after successful login/signup
  React.useEffect(() => {
    if(token){
      navigate('/');
    }
  }, [token]);

  return (
    <form  onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 trxt-gray-800'   action="">
       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800 mt-2 '/>
       </div>
       {currentState=='Login'?'' : <input type="text" onChange={(e)=>setName(e.target.value)}  value={name} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' name="" id="Name"  required/>}
       <input type="Email"  onChange={(e)=>setEmail(e.target.value)}  value={email}  className='w-full px-3 py-2 border border-gray-800' placeholder='Email' name="" id="Email" required/>
       <input type="password" onChange={(e)=>setPassword(e.target.value)}  value={password}  className='w-full px-3 py-2 border border-gray-800' placeholder='Password' name="" id="" required/>
       <div className='w-full flex  justify-between text-sm mt-[-8px]'>
          <p className=' cursor-pointer'>Forget Your Password?</p>
          {
            currentState=='Login' ? <p onClick={()=>setCurrentState('Sign up')} className='cursor-pointer'>Create an Account</p> : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login here</p>
          }
       </div>
           <button className='bg-black text-white font-light px-8 py-2 mt-4'>{
            currentState=='Login'? 'Login' :'Sign up'
            }</button>
    </form>
  )
}

export default Login