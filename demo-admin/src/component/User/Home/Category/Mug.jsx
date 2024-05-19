import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Link, useParams, useLocation } from 'react-router-dom';
function Mug() {
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState(null); // State variable to manage sorting order

    // const [error, setError] = useState(null);
    // // const category="T-Shirt"
    const { categoryName } = useParams();

    const { product } = useParams();

    const { moviename } = useParams();
    console.log(moviename);


    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('search');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (categoryName) {
                    response = await axios.get(`http://localhost:5000/api/productsbycategory/${categoryName}`);
                } else if (moviename) {
                    response = await axios.get(`http://localhost:5000/api/productsbytype/${moviename}`);
                }
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [moviename, categoryName]);

    const sortProducts = (order) => {
        const sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setProducts(sortedProducts);
    };

    const handleSort = (order) => {
        setSortBy(order);
        sortProducts(order);
    };




    return (
        <div>
            <Navbar />

            <div className='mb-[100px]'>
                <div className=" float-start ml-5">
                    <div className="group relative cursor-pointer py-2">
                        <div className="flex items-center justify-between space-x-5 bg-white-500 px-4 border-2">
                            <a
                                className="menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4 dark:text-white"
                                onclick=""
                            >
                                Filter
                            </a>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </span>
                        </div>
                        <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                            <button className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2 btn" onClick={() => handleSort('asc')}>
                                Price Low To High
                            </button>
                            <button className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2 btn" onClick={() => handleSort('desc')}>
                                Price High To Low
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <>


                {/* <div>
                    <button className="btn" onClick={() => handleSort('asc')}>
                        Price Low to High
                    </button>
                    <button className="btn" onClick={() => handleSort('desc')}>
                        Price High to Low
                    </button>
                </div> */}
                {/* ✅ Grid Section - Starts Here 👇 */}
                <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {products.map((product) => (
                        <Link to={`/product/${product._id}`}>

                            <div key={product.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <a href="#">
                                    <img
                                        src={`http://localhost:5000/Images/${product.images[0]}`}
                                        alt="Product"
                                        className="h-80 w-72 object-cover rounded-t-xl"
                                    />
                                    <div className="px-4 py-3 w-72">
                                        <p className="text-lg font-bold text-black truncate block capitalize">
                                            {product.name}
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">
                                                ₹{product.price}
                                            </p>
                                            <div className="ml-auto">
                                                <Link to={`/product/${product._id}`}>

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={20}
                                                        height={20}
                                                        fill="currentColor"
                                                        className="bi bi-bag-plus dark:text-black"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                                                        />
                                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </Link>

                    ))}
                </section>

                {/* <h1>Category: {categoryName}</h1> */}

            </>

        </div>
    )
}

export default Mug