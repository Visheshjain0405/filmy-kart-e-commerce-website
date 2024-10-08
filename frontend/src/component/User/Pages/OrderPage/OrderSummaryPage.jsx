import React, { useEffect, useState } from 'react';
import Navbar from '../../Home/Navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function OrderSummaryPage() {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const parsedUserData = JSON.parse(userData);
        const { _id: userId } = parsedUserData;
        setUserId(userId);
    }, []);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
                const reversedOrders = response.data.reverse();
                setOrders(reversedOrders);
                
            } catch (error) {
                console.error('Error fetching order details', error);
            }
        };

        fetchOrderDetails();
    }, [userId]);

    const [cancelledOrders, setCancelledOrders] = useState([]);
    const handleCancelOrder = async (orderId,userEmail) => {
        try {
          const response = await axios.put(`http://localhost:5000/cancel/${orderId}`,{userEmail});
          const cancelledOrder = response.data;
          console.log(cancelledOrder)
          setCancelledOrders([...cancelledOrders, cancelledOrder]); // Assuming cancelledOrders is a state variable
          toast.success("Your order is canceled");
        } catch (error) {
          console.error('Error cancelling order:', error);
          toast.error("Failed to cancel order"); // Notify user about the failure
        }
      };

    return (
        <div>
            <Navbar />
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
                        Our Orders
                    </h2>
                    <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
                        Thanks for making a purchase you can check our order summary from below
                    </p>
                    {orders.map((data, index) => (
                        <div key={index} className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full mt-[50px]">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                                <div className="data">
                                    <p className="font-semibold text-base leading-7 text-black">
                                        Order Id:{" "}
                                        <span className="text-indigo-600 font-medium">#{data._id}</span>
                                    </p>
                                    <p className="font-semibold text-base leading-7 text-black mt-4">
                                        Order Date :{" "}
                                        <span className="text-gray-400 font-medium"> {data.orderDate}</span>
                                    </p>
                                    <p className="font-semibold text-base leading-7 text-black mt-4">
                                        Email :{" "}
                                        <span className="text-gray-400 font-medium"> {data.userEmail}</span>
                                    </p>
                                    <p className="font-semibold text-base leading-7 text-black mt-4">
                                        Status :{" "}
                                        <span className="text-gray-400 font-medium"><strong> {data.status}</strong></span>
                                    </p>
                                </div>
                                <Link to={`/invoice/${data._id}`}>
                                    <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-redprimary max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-primary hover:shadow-indigo-400">
                                        Download Invoice
                                    </button>
                                </Link>
                            </div>
                            {data.products.map((product, index) => (
                                <div key={index} className="w-full px-3 min-[400px]:px-6">
                                    <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                                        <div className="img-box max-lg:w-full">
                                            <img
                                                src={`http://localhost:5000/Images/${product.images}`}
                                                alt="Product Image"
                                                className="aspect-square w-full lg:max-w-[140px]"
                                            />
                                        </div>
                                        <div className="flex flex-row items-center w-full">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                                <div className="flex items-center">
                                                    <div className="">
                                                        <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
                                                            {product.productName}
                                                        </h2>
                                                        <div className="flex items-center">
                                                            <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                                Size: <span className="text-gray-500">{product.size}</span>
                                                            </p>
                                                            <p className="font-medium text-base leading-7 text-black ">
                                                                Qty: <span className="text-gray-500">{product.qty}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-5 lg:ml-[100px]">
                                                    <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                        <div className="flex gap-3 lg:block">
                                                            <p className="font-medium text-sm leading-7 text-black">
                                                                Price
                                                            </p>
                                                            <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                                                {product.price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                            <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                                <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                                    <button className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600" onClick={()=>handleCancelOrder(data._id,data.userEmail)}>
                                        <svg
                                            className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={22}
                                            height={22}
                                            viewBox="0 0 22 22"
                                            fill="none"
                                        >
                                            <path
                                                d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                                                stroke=""
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        Cancel Order
                                    </button>
                                    <div className="flex items-center">
                                        <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                                            Payment Type{" "}
                                            <span className="text-gray-500">{data.paymentType}</span>
                                        </p>


                                    </div>
                                </div>
                                <p className="font-semibold text-lg text-black py-6">
                                    Total Price: <span className="text-indigo-600"> {data.totalPrice}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

export default OrderSummaryPage;
