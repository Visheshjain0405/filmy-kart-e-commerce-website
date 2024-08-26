import React, { useState, useEffect } from 'react'
import { useCart } from 'react-use-cart';
import Navbar from '../../Home/Navbar/Navbar';
import axios from 'axios';
import { format } from "date-fns"
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
function AddToCart() {

  const { items, updateItemQuantity, removeItem, emptyCart } = useCart();
  console.log(items)


  const handleRemoveItem = (itemId) => {
    removeItem(itemId); // Call the removeItem function with the itemId to remove the item from the cart
  };



  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    qty: '',
    images: [],
    sizes: [],
    category: '',
    status: 'pending'
  });

  const [totalPoints, setTotalPoints] = useState(0);

  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState('Pending')
  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentType, setPaymentType] = useState('');

  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [useCoins, setUseCoins] = useState(false); // State to track if user wants to use coins
  const [availableCoins, setAvailableCoins] = useState(''); // State to store available coins


  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('user');

    // If user data is not available, redirect the user to the login page
    if (!userData) {
      toast.error("Please login first");
      return;
    }

    // Parse user data from JSON format
    const user = JSON.parse(userData);

    // Check if user data is not null
    if (user) {
      const { userFullName, _id: userId, userEmail } = user;

      if (!userFullName || !userId || !userEmail) {
        toast.error("You cannot order products without logging in!");
        return;
      }

      console.log("Fullname:", userFullName);
      console.log("UserId:", userId);
      console.log("Email:", userEmail);
      setFullName(userFullName);
      setUserEmail(userEmail);
      setUserId(userId);
    }
  }, []);

  const handleIncrement = (itemId) => {
    const itemToUpdate = items.find(item => item.id === itemId);
    if (itemToUpdate && itemToUpdate.quantity < 10) {
      updateItemQuantity(itemId, itemToUpdate.quantity + 1);
    } else {
      alert('Maximum quantity limit reached for this item!');
    }
  };


  const handleDecrement = (itemId) => {
    const itemToUpdate = items.find(item => item.id === itemId);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      updateItemQuantity(itemId, itemToUpdate.quantity - 1);
    }
  };


  const [selectedState, setSelectedState] = useState('');


  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };


  const pointValues = {
    TShirt: 20,
    MobileCases: 10,
    Mug: 25
  };


  const calculateTotalPoints = () => {
    let points = 0;
    items.forEach(item => {
      const category = item.category.replace('-', ''); // Remove hyphen from category name
      const categoryPoints = pointValues[category];
      if (categoryPoints) {
        points += categoryPoints * item.quantity;
      }
    });
    if (useCoins) {
      points = Math.max(0, points - availableCoins); // Subtract available coins if checkbox is checked
    }
    setTotalPoints(points);
    return points; // Return total points
  };



  const [couponCode, setCouponCode] = useState('');
  const [availableCoupons] = useState(['SAVE20', 'GET10', 'FREESHIP', 'HALFOFF', 'NEWUSER']);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [totalAmount, setTotalAmount] = useState(); // Initial total amount
  const [discountAmount, setDiscountAmount] = useState(0);



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


  const totalPrices = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);;

  console.log(totalPrices)

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value.toUpperCase()); // Convert to uppercase
  };


  const applyCoupon = () => {
    if (availableCoupons.includes(couponCode)) {
      let discountPercentage = 0;
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

      // Convert total price to an integer
      const totalAmountInt = parseInt(totalPrices);

      // Calculate discount amount based on original total amount
      const discountAmount = Math.round((totalAmountInt * discountPercentage) / 100);

      // Calculate final total after applying discount
      const finalTotal = totalAmountInt - discountAmount + 49;
      console.log(finalTotal);
      // Update states
      setDiscountApplied(true);
      setDiscountAmount(discountAmount);
      setTotalAmount(finalTotal);
    } else {
      setDiscountApplied(false);
      alert('Invalid coupon code');
    }
  };


  const [address1Error, setAddress1Error] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');

  const validateAddress = () => {
    let isValid = true;
    if (!address1.trim()) {
      setAddress1Error('Address is required');
      isValid = false;
    } else {
      setAddress1Error('');
    }
    if (!pincode.trim()) {
      setPincodeError('Pincode is required');
      isValid = false;
    } else {
      setPincodeError('');
    }
    if (!mobileNumber.trim()) {
      setMobileNumberError('Mobile number is required');
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setMobileNumberError('Invalid mobile number');
      isValid = false;
    } else {
      setMobileNumberError('');
    }
    return isValid;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (userId === "") {
      toast.error("login first");
      return;
    }
    calculateTotalPoints();
    const formattedDate = format(new Date(), 'dd-MM-yyyy');

    if (address1 === "") {
      toast.error("address 1 is required");
    } else if (address2 === "") {
      toast.error("address 2 is required");
    } else if (landmark === "") {
      toast.error("landmark is required");
    } else if (city === "") {
      toast.error("city is required");
    } else if (pincode === "") {
      toast.error("pincode is required")
    } else if (pincode.length !== 6 || isNaN(pincode)) {
      toast.error("pincode must be 6 digits")
    }
    else {
      try {
        const products = items.map(item => ({
          productName: item.name,
          size: item.sizes,
          qty: item.quantity,
          proid: item.id,
          images: item.images[0],
          price: item.price,
        }));

        const totalPrice = discountApplied ? totalAmount : totalPrices + 49; // Convert to paise
        console.log("total price on button: " + totalPrice)

        const orderData = {
          products,
          address1,
          address2,
          landmark,
          state: selectedState,
          city,
          pincode,
          status,
          mobileNumber,
          userEmail: userEmail,
          userId: userId,
          paymentType: paymentType,
          totalPrice,
          orderDate: formattedDate,
        };
        console.log(orderData)
        await axios.post('http://localhost:5000/api/placeOrder', orderData);
        const totalPoints = calculateTotalPoints();
        if (totalPoints > 0) {
          await axios.post('http://localhost:5000/api/savePoints', {
            userId: userId,
            points: totalPoints
          });
        }

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
          alert('Razropay failed to load!!');
          return;
        }

        const finalTotal = discountApplied ? totalAmount * 100 : totalPrices * 100 + 4900; // Convert to paise
        const options = {
          key: "rzp_test_CqJpqDEEYWkBsk",
          amount: finalTotal,
          currency: "INR",
          name: "Filmy Kart",
          description: "Test Transaction",
          image: "/your_logo.png",
          handler: function (response) {
            window.location.href = '/';
          },
          notes: {
            address: "Razorpay Corporate Office"
          },
          theme: {
            color: "#3399cc"
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        alert('Order placed successfully!');
        emptyCart();

      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again later.');
      }
    }
  }



  return (
    <div>
      <Navbar />


      {items.length === 0 ? (
        <div className='text-center mt-[250px]'>
          <h2 className='text-xl font-semibold'>No items in the cart</h2>
        </div>
      ) : (
        <>

          <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
              <p className="text-xl font-medium">Order Summary</p>
              <p className="text-gray-400">
                Check your items. And select a suitable shipping method.
              </p>
              <div className="mt-8 space-y-3 rounded-lg border bg-white dark:bg-gray-900 px-2 py-4 sm:px-6">
                {items.map(item => (
                  <div className="flex flex-col rounded-lg bg-white dark:bg-gray-900 sm:flex-row">
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={`http://localhost:5000/Images/${item.images[0]}`}
                      alt={item.name}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {item.name}
                      </span>
                      <span className="float-right text-gray-400">
                        {item.sizes && `Size: ${item.sizes}`}
                        {item.sizes && item.models && ' | '}
                        {item.models && `Model: ${item.models}`}
                      </span>
                      <p className="text-lg font-bold">₹ {item.price}</p>
                    </div>
                    <br /><br />
                    <div>
                      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button
                          className="bg-gray-50 dark:bg-gray-900 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none border-2"
                          onClick={() => handleDecrement(item.id)}
                        >
                          <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                          type="number"
                          className="text-center w-full bg-gray-5 dark:bg-gray-900 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 dark:text-white dark:border-2"
                          name="custom-input-number"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="bg-gray-50 dark:bg-gray-900 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer border-2"
                          onClick={() => handleIncrement(item.id)}
                        >
                          <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                        <button onClick={() => handleRemoveItem(item.id)} className='ml-5'><i class="fa-solid fa-trash" style={{ color: "red" }}></i></button>
                      </div>

                    </div>
                  </div>
                ))}

              </div>
             

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
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full rounded-md border dark:bg-gray-900 border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
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
                    value={fullName}
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
                    name="mobilenumber"
                    mask="+91 99999 99999"
                    className="w-full rounded-md border dark:bg-gray-900 border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+91"
                    value={mobileNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 0) {
                        setMobileNumber(value);
                      } else {
                        // Display an error message or handle the case where pincode is negative
                        // For example:
                        toast.error("Mobile Number cannot be negative");
                        // You can choose how to handle this case based on your application logic
                      }
                    }}

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
                  htmlFor="card-no"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Address
                </label>
                <div className="flex">
                  <div className="relative w-7/12 flex-shrink-0">
                    <input
                      type="text"
                      id="card-no"
                      name="address1"
                      className="w-full rounded-md border dark:bg-gray-900 border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Address 1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />

                  </div>
                  <input
                    type="text"
                    name="address2"
                    className="w-full rounded-md border dark:bg-gray-900 border-gray-200 px-2 py-3 ml-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Address 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />

                </div>
                {/* <label
    htmlFor="billing-address"
    className="mt-4 mb-2 block text-sm font-medium"
  >
    Billing Address
  </label> */}
                <div className="flex flex-col sm:flex-row mt-5">
                  <div className="relative flex-shrink-0 sm:w-7/12">
                    <input
                      type="text"
                      id="billing-address"
                      name="landmark"
                      className="w-full rounded-md border dark:bg-gray-900 border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
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
                <br />
                <div className="flex">
                  <div className="relative w-7/12 flex-shrink-0">
                    <input
                      type="text"
                      id="card-no"
                      name="city"
                      className="w-full rounded-md border dark:bg-gray-900 border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />

                  </div>
                  <input
                    type="number"
                    name="pincode"
                    className="w-full rounded-md border dark:bg-gray-900 border-gray-200 px-2 py-3 ml-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 0) {
                        setPincode(value);
                      } else {
                        // Display an error message or handle the case where pincode is negative
                        // For example:
                        toast.error("Pincode cannot be negative");
                        // You can choose how to handle this case based on your application logic
                      }
                    }}
                    min="0"
                  />

                </div>

                <div className="containermx-auto max-w-xl p-6">
                  {/* Coupon Code Card Form */}
                  <div className="bg-gray-100 dark:bg-gray-900  p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold mb-4">Apply Coupon Code</h1>
                    {/* Coupon Code Input */}
                    <div className="mb-4">
                      <label
                        htmlFor="coupon"
                        className="block text-gray-700 dark:text-white font-semibold mb-2"
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
                {/* Total */}
                {/* <p className="mt-8 text-lg font-medium">Payments Methods</p>
                <br />
                <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    defaultValue=""
                    name="paymenttype"
                    value="razorpay"
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Rozarpay
                  </label>
                </div>
                <br />
                <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    defaultChecked=""
                    id="bordered-radio-2"
                    type="radio"
                    defaultValue=""
                    name="paymenttype"
                    value="cash on delivery"
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Cash On Delivery
                  </label>
                </div> */}


                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Subtotal</p>
                    <p className="font-semibold text-gray-900 dark:text-white">₹ {totalPrices}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-red-900">Discount</p>
                    <p className="font-semibold text-red-900">- ₹ {discountAmount}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Shipping</p>
                    <p className="font-semibold text-gray-900 dark:text-white"> ₹ 49</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Total</p>

                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">₹ {discountApplied ? totalAmount : totalPrices + 49}</p>


                </div>
              </div>
              <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 dark:bg-redprimary px-6 py-3 font-medium text-white" onClick={handlesubmit}>
                Place Order
              </button>
            </div>
          </div>
        </>
      )}

      <ToastContainer />

    </div>
  )
}

export default AddToCart