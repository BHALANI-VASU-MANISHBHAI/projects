import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assetss } from "../assets/frontend_assets/assetss";
import CartTotal from "./../components/CartTotal";
import cloneDeep from "lodash/cloneDeep";
import axios from "axios";
import { toast } from "react-toastify";
import Indian_Cities_In_States_JSON from "../assets/Indian_Cities_In_States_JSON.json";
import { set } from "lodash";
const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    AllSubscribers,
    userData,
    Subscriber
  } = useContext(ShopContext);
  console.log("AllSubscribers", AllSubscribers,  "Subscriber", Subscriber);
  const [actualAmount, setActualAmount] = React.useState(0);



  const [method, setMethod] = React.useState("cod");
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  

React.useEffect(() => {
  const checkSubscription = () => {
    const email = userData?.email;
    const isSubscriber = AllSubscribers.find(
      (subscriber) => subscriber.email === email
    );
    setIsSubscriberorNot(!!isSubscriber);
  };

}, [userData, AllSubscribers]);

 
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const item in cartItems) {
        for (const size in cartItems[item]) {
          if (cartItems[item][size] > 0) {
            const itemInfo = cloneDeep(
              products.find((product) => product._id === item)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[item][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee  - (Subscriber ? getCartAmount() * 0.2 : 0),

      };
      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "razorpay":
          console.log("orderData", orderData);
          const razorpayResponse = await axios.post(
            backendUrl + "/api/order/razorpay",
            {
              amount: orderData.amount,
              currency: "INR",
              orderData: orderData,
            },
            { headers: { token } }
          );

          if (razorpayResponse.data.success) {
            const options = {
              key: razorpayKey,
              amount: razorpayResponse.data.razorpayOrder.amount,
              currency: razorpayResponse.data.razorpayOrder.currency,
              name: "Vasu Store",
              description: "Order Payment",
              order_id: razorpayResponse.data.razorpayOrder.id,
              handler: async (response) => {
                try {
                  const verifyResponse = await axios.post(
                    backendUrl + "/api/order/verify-order-razorpay",
                    {
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                      orderData: orderData,
                    },
                    { headers: { token } }
                  );

                  if (verifyResponse.data.success) {
                    setCartItems({});
                    navigate("/orders");
                  } else {
                    toast.error(verifyResponse.data.message);
                  }
                } catch (error) {
                  console.error("Error verifying payment:", error);
                  toast.error("Payment verification failed");
                }
              },
              prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone,
              },
              theme: {
                color: "#F37254",
              },
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
          } else {
            toast.error(razorpayResponse.data.message);
          }

          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col  sm:flex-row  justify-between  gap-4 pt-5 sm:pt-15 min-h-[80vh] border-t "
    >
      {/* Left SIde */}
      <div className="flex flex-col gap-4  w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"}></Title>
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First name"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last name"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="ZipCode"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 py-1.5 px-3.5 rounded-md w-full"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal IsSubcriberornot={Subscriber} />

        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"}></Title>
          {/* Payment Method Selection*/}
          <div className="flex gap-2 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border  p-1 px-3 cursor pointer"
            >
              <p
                className={`min-w-3.5 h-3.5  rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }  `}
              ></p>
              <img
                src={assetss.razorpay_logo}
                alt="card"
                className="h-5 mx-4"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-1 px-3 cursor pointer"
            >
              <p
                className={`min-w-3.5 h-3.5  rounded-full } ${
                  method === "cod" ? "bg-green-400" : ""
                }   `}
              ></p>
              <p className="text-gray-500 text-sm font-medium m-4 ">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full flex justify-end mt-8 ">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm "
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
