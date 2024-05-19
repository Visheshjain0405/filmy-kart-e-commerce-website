// Checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Home/Navbar/Navbar';
import { useParams, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from "date-fns"

function loadScript(src) {

  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const CheckOut = () => {

  // const { items, updateItemQuantity } = useCart();
  // console.log(items)


  const [quantity, setQuantity] = useState(1);
  const [isMobileCase, setIsMobileCase] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  const [couponCode, setCouponCode] = useState('');
  const [availableCoupons] = useState(['SAVE20', 'GET10', 'FREESHIP', 'HALFOFF', 'NEWUSER']);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [totalAmount, setTotalAmount] = useState(); // Initial total amount
  const [discountAmount, setDiscountAmount] = useState(0);
  const [orderData, setOrderData] = useState({
    fullname: '',
  });

  const [product, setProduct] = useState({

  });


  const [coupon, setCoupon] = useState('')

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coupons'); // Adjust the URL as per your backend route
        setCoupon(response.data);
        console.log("Response:", response.data); // Log the response data for debugging
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);


  
  const handleCouponChange = (e) => {
    setCouponCode(e.target.value.toUpperCase()); // Convert to uppercase
  };

  // Function to apply the coupon code and calculate the discount
  const applyCoupon = () => {
    // Define available coupons
    const availableCoupons = ['SAVE20', 'GET10', 'FREESHIP', 'HALFOFF', 'NEWUSER'];

    // Check if the entered coupon code is valid
    if (availableCoupons.includes(couponCode)) {
      let discountPercentage = 0;

      // Determine discount percentage based on the coupon code
      switch (couponCode) {
        case 'SAVE20':
          discountPercentage = 20;
          break;
        case 'GET10':
          discountPercentage = 10;
          break;
        // Add other coupon codes and their respective discount percentages
        default:
          break;
      }

      // Calculate the discount amount
      const discount = Math.round((totalAmount * discountPercentage) / 100);
      console.log(discount)
      setDiscountAmount(discount);
      setTotalAmount(totalAmount - discount);
      setDiscountApplied(true);
    } else {
      // Invalid coupon code
      setDiscountApplied(false);
      toast.error('Invalid coupon code');
    }
  };

  // useEffect hook to recalculate total amount whenever discount or total amount changes
  useEffect(() => {
    setTotalAmount(totalAmount - discountAmount);
  }, [discountAmount]);



  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('user');

    // If user data is not available, redirect the user to the login page

    // Parse user data from JSON format
    const parsedUserData = JSON.parse(userData);
    console.log("User Data:", userData);
    // Log userId and fullname separately
    const { userFullName, _id: userId, userEmail } = parsedUserData;
    console.log("Fullname:", userFullName);
    console.log("UserId:", userId);
    console.log("Email:", userEmail);
    setFullName(userFullName);
    setUserEmail(userEmail);
    setUserId(userId)
  }, []);

  console.log(`User Id :-${userId}`)




  const { id } = useParams();
  // const {sizes}=useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sizes = searchParams.get('sizes'); // Extracting sizes from query parameters
  const company = searchParams.get('models');
  console.log(company)

  console.log(id)
  console.log(sizes);
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: '',
    qty: '',
    images: [],
    sizes: [],
    category: '',
    status: 'pending'
  });

  const [fullname, setFullName] = useState('');
  // const [cardNumber, setCardNumber] = useState('');
  // const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState('Pending')
  const [mobileNumber, setMobileNumber] = useState('');


  // const fullname = (e) => {
  //   setFullName(e.target.value);
  // };




  

  const handlePlaceOrder = async () => {



    // console.log(orderData)
    const formData = new FormData();
    formData.append('productName', productDetails.name);
    console.log(formData)
    console.log(productDetails.name)
    console.log(productDetails.price)
    console.log(productDetails.qty)
    console.log(user.email)
    console.log(user.sub)
    console.log(orderData.fullname)


  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/singleproductfetch/${id}`);
        setProductDetails(response.data);
        setIsMobileCase(response.data.category === "mobile-cases"); // Check if the product category is "mobile cases"
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails && productDetails.price) {
      // Calculate discounted total amount
      const discountedTotal = (productDetails.price * quantity) - discountAmount;
      // Add shipping charges to the discounted total
      const finalTotal = discountedTotal + 49; // Assuming shipping charges are fixed at ₹49
      // Update the state with the final total amount
      setTotalAmount(finalTotal);
    }
  }, [quantity, productDetails, discountAmount]);
  const [user, setUser] = useState(null)



  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const [deliveryOption, setDeliveryOption] = useState('');

  // Function to handle change in the selected delivery option
  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !userEmail || !mobileNumber || !address1 || !city || !pincode) {
      toast.error('Please fill in all required fields.');
      return;
    }
  
    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(userEmail)) {
      toast.error('Invalid email format.');
      return;
    }
  
    // Validate mobile number format (assuming 10-digit Indian mobile numbers)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileNumber)) {
      toast.error('Invalid mobile number.');
      return;
    }
  
    // Validate pincode format (assuming 6-digit Indian pincode)
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) {
      toast.error('Invalid pincode.');
      return;
    }

    // if (!deliveryOption) {
    //   toast.error('Please select a delivery option.');
    //   return;
    // }
  
    try {
      // Proceed with order placement if validation passes
      const formattedDate = format(new Date(), 'dd-MM-yyyy');
      const products = [{
        productName: productDetails.name,
        size: sizes,
        qty: quantity,
        proid: id,
        images: productDetails.images[0],
        price: productDetails.price,
      }];
      const orderData = {
        products,
        userId,
        userEmail,
        fullname,
        address1,
        address2,
        landmark,
        state: selectedState,
        city,
        pincode,
        totalPrice: productDetails.price * quantity + 49,
        status,
        orderDate: formattedDate,
        mobileNumber,
      };
      await axios.post('http://localhost:5000/api/placeOrder', orderData);
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

      if (!res) {
        alert('Razropay failed to load!!')
        return
      }

      const data = await fetch('http://localhost:5000/verify', { method: 'POST' }).then((t) =>
        t.json()
      )

      console.log(data)
      const finalTotal = totalAmount
      const idid = id
      const options = {
        "key": "rzp_test_CqJpqDEEYWkBsk", // Enter the Key ID generated from the Dashboard
        "amount": finalTotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": productDetails.name,
        "description": "Test Transaction",
        "image": productDetails.images,
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          window.location.href = '/';
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    }
  }

  const [selectedState, setSelectedState] = useState('');

  // Function to handle change in the selected state
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };


  // const [quantity, setQuantity] = useState(0);

  // Function to handle incrementing the quantity
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decrementing the quantity
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        const response = await axios.post('http://localhost:5000/create/orderId', {
          amount: '50000'
        });
        setOrderId(response.data.orderId);
        console.log(response.data.orderId);
      } catch (error) {
        console.error('Error fetching order ID:', error);
      }
    };

    fetchOrderId();
  }, []);

  async function displayRazorpay() {


  }


  return (
    <div>
      <>
        <Navbar />
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white dark:bg-gray-900 px-2 py-4 sm:px-6">
              <div className="flex flex-col rounded-lg bg-white dark:bg-gray-900 sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={`http://localhost:5000/Images/${productDetails.images[0]}`}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    {productDetails.name}
                  </span>
                  <span className="float-right text-gray-400">Selected Size :- {sizes} {company}</span>
                  <p className="text-lg font-bold">₹{productDetails.price}</p>
                </div>
                {/* {isMobileCase && (
                  <div>
                    {company}
                  </div>
                )} */}
              </div>
              <div>
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                    className="bg-gray-50 dark:bg-gray-900 dark:text-white text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none border-2"
                    onClick={decrementQuantity}
                  >
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="number"
                    className="text-center w-full bg-gray-50 dark:bg-gray-900 dark:text-white font-semibold text-md hover:text-black focus:text-black border-2  md:text-basecursor-default flex items-center text-gray-700 outline-none"
                    name="custom-input-number"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="bg-gray-50 dark:bg-gray-900 dark:text-white text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer border-2"
                    onClick={incrementQuantity}
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>

              </div>
            </div>
            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  defaultChecked=""
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <img
                    className="w-14 object-contain"
                    src="/images/naorrAeygcJzX0SyNI4Y0.png"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Fast Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                  </div>
                </label>
              </div>

            </form>
          </div>
          <div className="mt-10 bg-gray-50 dark:bg-gray-900 dark:border-2 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div className="">
              <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={userEmail}
                  onChange={(e)=>setUserEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-200 dark:bg-gray-900 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}

                  className="w-full rounded-md border border-gray-200 dark:bg-gray-900 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="card-holder"
                  name="cardholdername"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}

                  className="w-full rounded-md border border-gray-200 dark:bg-gray-900 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your mobile number here"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>


              <label
                htmlFor="billing-address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="billing-address"
                    name="address1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className="w-full rounded-md border border-gray-200 dark:bg-gray-900 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="address1"
                  />

                </div>


                <input
                  type="text"
                  name="address2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="w-full rounded-md border border-gray-200 dark:bg-gray-900 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ml-2"
                  placeholder='address2'
                />



              </div>
              <div className="flex flex-col sm:flex-row mt-2">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="billing-address"
                    name="landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full rounded-md border border-gray-200 dark:bg-gray-900 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="landmark"
                  />

                </div>


                <select value={selectedState} onChange={handleStateChange} style={{ width: "100%" }} className='ml-2 rounded-md dark:bg-gray-900'>
                  <option value="">Select a state</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Puducherry">Puducherry</option>
                </select>

              </div>
              <div className="flex flex-col sm:flex-row mt-2">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="billing-address"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-md border border-gray-200 dark:bg-gray-900 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="City"
                  />

                </div>


                <input
                  type="number"
                  name="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder='pincode'
                  minLength={6}
                  maxLength={6}
                  className="w-full rounded-md border border-gray-200 dark:bg-gray-900 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                />

              </div>
              <div className="containermx-auto max-w-xl p-6">
                {/* Coupon Code Card Form */}
                <div className="bg-gray-100  p-6 rounded-lg shadow-lg">
                  <h1 className="text-2xl font-semibold mb-4">Apply Coupon Code</h1>
                  {/* Coupon Code Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="coupon"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Coupon Code:
                    </label>
                    <input
                      type="text"
                      id="coupon"
                      name="coupon"
                      value={couponCode}
                      onChange={handleCouponChange}
                      className=" px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your coupon code"
                    />
                    <button className='bg-primary text-white px-4 py-2 rounded-lg ml-2' onClick={applyCoupon}>Apply</button>
                  </div>
                  {discountApplied && (
                    <p>Coupon applied successfully! You've got a discount.</p>
                  )}
                  {/* Apply Button */}
                  <div className="text-center">

                  </div>
                  {/* Coupon Code Result */}
                  {/* <div className="mt-4 text-green-500">
                    Coupon code applied successfully! You saved $10.
                  </div> */}
                </div>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Subtotal</p>
                  <p className="font-semibold text-gray-900 dark:text-white">₹{productDetails.price * quantity}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Discount</p>
                  <p className="font-semibold text-red-500 dark:text-white">- ₹ {discountAmount}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Shipping</p>
                  <p className="font-semibold text-gray-900 dark:text-white">+ ₹ 49</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Total {totalAmount}</p>

                <p className="text-2xl font-semibold text-gray-900 dark:text-white">₹{totalAmount}</p>
              </div>
            </div>
            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 dark:bg-primary px-6 py-3 font-medium text-white" onClick={handleFormSubmit}>
              Place Order
            </button>
          </div>
        </div>
        <button id="rzp-button1" onClick={displayRazorpay}>Pay</button>
        <ToastContainer />
      </>
    </div>
  );
};

export default CheckOut;
