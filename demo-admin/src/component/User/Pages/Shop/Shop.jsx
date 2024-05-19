import React, { useEffect, useState } from 'react';
import Navbar from '../../Home/Navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Shop() {
    const [categories, setCategories] = useState([]);

    const categoryName = "T-Shirt";
    const categoryMug = "Mug";
    const categoryMobileCases = "mobile-cases"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getcategories');
                setCategories(response.data);
                console.log(response.data);
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <h1 className="text-4xl my-5 mt-[100px] text-center">Shop By Categories</h1>
                <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {categories.map((category) => (
                        <div key={category._id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                            <Link to={`/category/${category.name}`}>
                                <img
                                    src={`http://localhost:5000/Images/${category.image}`} // Assuming category.images[0] exists
                                    alt="Product"
                                    className="h-80 w-72 object-cover rounded-t-xl"
                                />
                                <div className="px-4 py-3">
                                    <p className="text-lg font-bold text-black truncate block capitalize">{category.name}</p>

                                </div>
                            </Link>
                        </div>
                    ))}
                </section>
            </div>
            <div>
                <h1 className="text-4xl mt-[100px] mb-[50px] text-center">Shop By Movies</h1>
                <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'salaar'}`}>
                            <img
                                src="https://pbs.twimg.com/media/GA5FenxbUAA3Tts?format=jpg&name=4096x4096" // Assuming category.images[0] exists
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Salaar</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'rrr'}`}>
                            <img
                                src='https://chennaivision.com/tamil-movies/wp-content/uploads/2021/07/RRR_LYCA_Insta.jpg' // Assuming category.images[0] exists
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">RRR</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'bahubali'}`}>
                            <img
                                src="https://play-lh.googleusercontent.com/gwBnh1EkQ5Bjw6Ir4ZdlxRgVaVXRAAVShgNYBpkfZrTgUhbCALvqOxHuRHWGOEs2sBwE"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Bahubali</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'ps2'}`}>
                            <img
                                src="https://img.onmanorama.com/content/dam/mm/en/entertainment/entertainment-news/images/2023/4/28/ponniyin-selvan-2.jpg.transform/576x300/image.jpg"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">PS - 2</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'leo'}`}>
                            <img
                                src="https://i.pinimg.com/originals/46/37/db/4637dbeccdf457d9086f4e19e3737863.jpg"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Leo</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'maaveeran'}`}>
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BNzU3YmY5ZjAtMTIxYy00ODg2LWI0YzItMTVhNGM4YWIzNmYyXkEyXkFqcGdeQXVyMTQ4MTg3Njcx._V1_.jpg"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Maaveeran</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'jailer'}`}>
                            <img
                                 src="https://www.kerala9.com/wp-content/uploads/2023/08/Jailer-Movie-hd-posters-001.jpg"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Jailer</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'master'}`}>
                            <img
                               src="https://pbs.twimg.com/media/ENH_PGfU0AMIwYI.jpg:large"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Master</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'hanuman'}`}>
                            <img
                                 src="https://economictimes.indiatimes.com/thumb/height-450,width-600,imgsize-112166,msid-106888809/hanumandb.jpg?from=mdr"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Hanuman</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'vikram'}`}>
                            <img
                               src="https://assets.thehansindia.com/h-upload/2022/06/03/1295898-vikram-movie.webp"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Vikram</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'adipurush'}`}>
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BZThlY2M1MGYtZjA1MC00YTMzLTkzMTUtZWQyZjU5ODBmYmVjXkEyXkFqcGdeQXVyMTE0MTY2Mzk2._V1_.jpg"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Adipurush</p>

                            </div>
                        </Link>

                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/moviecategory/${'bahubali'}`}>
                            <img
                               src="https://m.media-amazon.com/images/I/71i8a-PnChL._AC_UF1000,1000_QL80_.jpg"
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                            />
                            <div className="px-4 py-3">
                                <p className="text-lg font-bold text-black truncate block capitalize">Bahubali 2</p>

                            </div>
                        </Link>

                    </div>
                </section>
            </div>
        </div>
    );
}

export default Shop;
