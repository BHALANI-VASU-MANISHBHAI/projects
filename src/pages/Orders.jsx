import React from 'react'
import { useContext } from 'react'
import Title from '../components/Title'
import { useEffect } from 'react'
import axios from 'axios'
import { GlobalContext } from "../context/GlobalContext.jsx";




const Orders = () => {
  const { backendUrl,token, currency } = useContext(GlobalContext);
  
  const [orderData, setOrderData] = React.useState([]);
 
  const loadOrderData = async () => {
    try{
      if(!token) {
        return null;
      }

    const  responce = await  axios.post(backendUrl+"/api/order/userorders",{},{headers:{token}})   

      console.log("Response from loadOrderData:", responce.data);

    if(responce.data.success){
      let allOrdersItem =[]
      responce.data.orders.map((order)=>{
        order.items.map((item)=>{
           item['orderId'] = order._id;
           item['status'] = order.status;
           item['payment'] = order.payment;
           item['paymentMethod'] = order.paymentMethod;
           item['date'] = order.date;
           allOrdersItem.push(item);
        })
      })
      setOrderData(allOrdersItem.reverse());
      console.log("Order data loaded successfully:", allOrdersItem);
    }
    }catch(err){
      console.error("Error loading order data:", err);
      setOrderData([]);
    }
  }

  const CancelOrder = async (orderId,size, itemId) => {
      console.log("Cancelling order with ID:", orderId);
    try {
      console.log("Cancelling order with ID:", orderId, "Size:", size, "Item ID:", itemId);
      const response = await axios.post(
        backendUrl + "/api/order/cancel",
        { orderId 
          ,size,
          itemId
        },
        { headers: { token } }
      );

      if (response.data.success) {
        console.log("Order cancelled successfully");
        loadOrderData(); // Reload order data after cancellation
      } else {
        console.error("Failed to cancel order:", response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  }

  useEffect(() => {
      loadOrderData();
  }, [token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl  ">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-black flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />

              <div className="flex-1">
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency} {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(item.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                 <p className='text-sm text-gray-500 mt-2'>
                  Payment : <span className='text-gray-700'> {item.paymentMethod}</span>
                 </p>
              
              </div>

              {/* This column stays fixed width and aligns vertically with others */}
              <div className="w-40 flex items-center gap-2 self-start sm:self-center">
                <p className="w-2 h-2 rounded-full bg-green-500"></p> 
                <p className="text-sm md:text-base">{item.status}</p>
              </div>

              <button  onClick={()=>  loadOrderData()} className="border py-4 px-2 text-sm font-medium rounded-sm cursor-pointer ">
                Track Order
              </button>
              <button  onClick={()=>  CancelOrder(item.orderId,item.size,item._id)} className="border py-4 px-2 text-sm font-medium rounded-sm cursor-pointer ">
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders