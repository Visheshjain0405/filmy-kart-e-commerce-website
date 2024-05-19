import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
function ProductReview() {

    const [formData, setFormData] = useState({
        fullname: '',
        emailid: '',
        rating: '',
        review: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

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
              // You can redirect to another page or perform other actions here
            } catch (error) {
              console.log(error);
              toast.error('Failed to submit review. Please try again.');
            }
          }
    }
    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
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
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
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
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
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
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Reviw
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
            <ToastContainer />
        </div>
    )
}

export default ProductReview