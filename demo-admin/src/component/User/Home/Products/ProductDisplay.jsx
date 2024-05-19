import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDisplay.css';
import { CartProvider, useCart } from "react-use-cart";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Products from './Products';
import Footer from "../Footer/Footer"
import ProductCard from './ProductCard';

function ProductDisplay() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [isMobileCase, setIsMobileCase] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [formData, setFormData] = useState({
    productId: id,
    fullname: '',
    emailid: '',
    rating: '',
    review: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e) => {
    setFormData({ ...formData, rating: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.fullname === '') {
      toast.error('Enter fullname');
    } else if (formData.emailid === '') {
      toast.error('Enter email address');
    } else if (formData.rating === '') {
      toast.error('Select rating');
    } else if (formData.review === '') {
      toast.error('Enter review');
    } else {
      try {
        await axios.post('http://localhost:5000/api/review', formData);
        console.log(formData);
        toast.success('Review added successfully!');
        setFormData({
          productId: id,
          fullname: '',
          emailid: '',
          rating: '',
          review: ''
        });
        setShowReviewForm(false);
      } catch (error) {
        console.log(error);
        toast.error('Failed to submit review. Please try again.');
      }
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${id}`);
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleReviewButtonClick = () => {
    setShowReviewForm(!showReviewForm); // Toggle review form visibility
  };

  const { addItem } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/singleproductfetch/${id}`);
        setProductDetails(response.data);
        console.log(response.data);
        setSizes(response.data.sizes);
        setIsMobileCase(response.data.category === "mobile-cases");
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    // Check if the product quantity is 0
    if (productDetails.qty === 0) {
      setIsOutOfStock(true); // Set out of stock state to true
    } else {
      setIsOutOfStock(false); // Set out of stock state to false
    }
  }, [productDetails.qty]);

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const mobileCompanies = ['Apple', 'Samsung', 'Google', 'Huawei', 'Xiaomi', 'OnePlus', 'LG', 'Sony', 'Nokia', 'Motorola'];
  const mobileModels = {
    Apple: ['iPhone 12', 'iPhone 11', 'iPhone SE'],
    Samsung: ['Galaxy S21', 'Galaxy Note 20', 'Galaxy A52'],
    Google: ['Pixel 5', 'Pixel 4a', 'Pixel 4'],
    Huawei: ['Mate 40 Pro', 'P40 Pro', 'Nova 7i'],
    Xiaomi: ['Mi 11', 'Redmi Note 10 Pro', 'POCO X3'],
    OnePlus: ['OnePlus 9 Pro', 'OnePlus 8T', 'OnePlus Nord'],
    LG: ['LG Velvet', 'LG Wing', 'LG G8 ThinQ'],
    Sony: ['Xperia 1 II', 'Xperia 5 II', 'Xperia 10 II'],
    Nokia: ['Nokia 8.3 5G', 'Nokia 5.4', 'Nokia 3.4'],
    Motorola: ['Moto G Power', 'Moto G Stylus', 'Moto E7 Plus']
  };

  const handleSizeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSizes([...selectedSizes, value]);
    } else {
      setSelectedSizes(selectedSizes.filter((size) => size !== value));
    }
  };

  const handleCompanyChange = (event) => {
    const company = event.target.value;
    setSelectedCompany(company);
    setSelectedModels(mobileModels[company] || []);
  };

  const handleModelChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedModels([...selectedModels, value]);
    } else {
      setSelectedModels(selectedModels.filter((model) => model !== value));
    }
  };

  const addToCart = () => {
    if (isMobileCase && (!selectedCompany || selectedModels.length === 0)) {
      toast.error('Please select a company and model before adding to cart');
      return;
    }

    if (!isMobileCase && productDetails.category !== 'Mug' && productDetails.category !== "Badges" && productDetails.category!=="Calender" && selectedSizes.length === 0) {
      toast.error('Please select a size before adding to cart');
      return;
    }
    const productToAdd = {
      ...productDetails,
      id: productDetails._id,
      sizes: selectedSizes,
      models: selectedModels,
    };
    addItem(productToAdd);
    toast.success("Porduct addred to Cart");
    console.log("Product added to cart");
  };

  const renderStars = (rating) => {
    const starCount = Math.floor(rating); // Get the integer part of the rating
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          viewBox="0 0 30 30"
          fill="none"
          className="text-yellow-400 inline-block" // Change to inline-block
          style={{ marginRight: '2px' }} // Add margin between stars
        >
          <g clipPath="url(#clip0_13624_2090)">
            <path
              d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
              fill="#FBBF24"
            />
          </g>
          <defs>
            <clipPath id="clip0_13624_2090">
              <rect width={30} height={30} fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    }
    return <>{stars}</>; // Render all stars in a single line
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/random-products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const shopnow = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <>
      <div className="antialiased">
        <Navbar />
        <div className="main-wrapper ">
          <div className="container">
            <div className="product-div dark:bg-gray-900">
              <div className="product-div-left">
                <div className="img-container">
                  <img
                    src={`http://localhost:5000/Images/${productDetails.images && productDetails.images[activeIndex]}`}
                    alt="watch"
                  />
                </div>
                <div className="hover-container">
                  {productDetails.images &&
                    productDetails.images.map((image, index) => (
                      <div key={index} onMouseOver={() => handleMouseOver(index)}>
                        <img src={`http://localhost:5000/Images/${image}`} alt={`Watch ${index + 1}`} />
                      </div>
                    ))}
                </div>
              </div>
              <div className="product-div-right">
                <span className="product-name">{productDetails.name}</span>
                <span className="product-price">{`₹ ${productDetails.price}`}</span>
                <p className="product-description">{productDetails.description}</p>
                {productDetails.qty === 0 || (!isMobileCase && productDetails.qty === 0) ? (
                  <div className="out-of-stock text-2xl mt-[20px]">Out of Stock</div>
                ) : (
                  <>
                    {productDetails.category !== 'Badges' && productDetails.category !== 'Calender' && (
                      <div className="sizes-container">
                        <p>Select Size:</p>
                        {sizes.map((size, index) => (
                          <label key={index} className="size-label p-2">
                            <input
                              type="radio"
                              value={size}
                              onChange={handleSizeChange}
                              checked={selectedSizes === size} // Check if the current size is selected
                            /> {size}
                          </label>
                        ))}
                      </div>
                    )}
                    <div className="btn-groups">
                      <button type="button" className="add-cart-btn" onClick={addToCart}>
                        <i className="fas fa-shopping-cart" />
                        add to cart
                      </button>
                      {(selectedSizes.length > 0 || isMobileCase || productDetails.category === 'Badges' || productDetails.category === 'Calendar') ? (
                        <Link to={`/checkout/${productDetails._id}?sizes=${selectedSizes.join(',')}&company=${selectedCompany}&models=${selectedModels.join(',')}`}>
                          <button type="button" className="buy-now-btn">
                            <i className="fas fa-wallet" />
                            Buy Now
                          </button>
                        </Link>
                      ) : (
                        <button type="button" className="buy-now-btn" onClick={() => toast.error('Please select a size')}>
                          <i className="fas fa-wallet" />
                          Buy Now
                        </button>
                      )}
                    </div>
                  </>
                )}

                {/*                 
                <div className="sizes-container">
                  <p>Select Size:</p>
                  {sizes.map((size, index) => (
                    <label key={index} className="size-label p-2">
                      <input
                        type="radio"
                        value={size}
                        onChange={handleSizeChange}
                        checked={selectedSizes === size} // Check if the current size is selected
                      /> {size}
                    </label>
                  ))}
                </div>

                {isMobileCase && (
                  <div>
                    <h2>Select Mobile Company</h2>
                    <select value={selectedCompany} onChange={handleCompanyChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="">Select a company</option>
                      {mobileCompanies.map((company, index) => (
                        <option key={index} value={company}>{company}</option>
                      ))}
                    </select>
                    {selectedCompany && (
                      <div>
                        <h2>Select Mobile Models</h2>
                        <select value={selectedModels} onChange={handleModelChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="">Select a model</option>
                          {mobileModels[selectedCompany].map((model, index) => (
                            <option key={index} value={model}>{model}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* {!isMobileCase && <p>Product category is not mobile case.</p>} */}

              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            {showReviewForm ? (
              <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name='fullname'
                    value={formData.fullname}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required=""
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="emailid"
                    name='emailid'
                    value={formData.emailid}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Rating
                  </label>
                  <div className="rating">
                    <input type="radio" name="rating" value="1" onChange={handleRatingChange} className="mask mask-star" />
                    <input type="radio" name="rating" value="2" onChange={handleRatingChange} className="mask mask-star" />
                    <input type="radio" name="rating" value="3" onChange={handleRatingChange} className="mask mask-star" />
                    <input type="radio" name="rating" value="4" onChange={handleRatingChange} className="mask mask-star" />
                    <input type="radio" name="rating" value="5" onChange={handleRatingChange} className="mask mask-star" />
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Review
                  </label>
                  <textarea
                    type="text"
                    id="review"
                    name='review'
                    value={formData.review}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            ) : (
              <button className='bg-redprimary p-2 text-white ml-12 mb-5' onClick={handleReviewButtonClick}>Write a Review</button>
            )}
          </div>

          <div>

            <div class="flex flex-col">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table
                      class="min-w-full text-left text-sm font-light text-surface dark:text-white lg:mx-8">
                      <thead
                        class="border-b border-neutral-200 bg-white font-medium dark:border-white/10 dark:bg-body-dark">
                        <tr>
                          <th scope="col" class="px-6 py-4">Name</th>
                          <th scope="col" class="px-6 py-4">Review</th>
                          <th scope="col" class="px-6 py-4">Rating</th>
                        </tr>
                      </thead>
                      <tbody>

                        {reviews.map((review, index) => (
                          <tr key={index}>
                            <td class="whitespace-nowrap px-6 py-4">{review.fullname}</td>
                            <td class="whitespace-nowrap px-6 py-4">{review.review}</td>
                            <td class="whitespace-nowrap px-6 py-4">{renderStars(review.rating)}</td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-[150px]'>
            <Products/>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}
export default ProductDisplay;
