import React from 'react'
import Navbar from './Navbar/Navbar'
import Hero from './Hero/Hero'
import Category2 from './Category/Category2'
import Category from './Category/Category'
import Services from './Services/Services'
import Banner from './Banner/Banner'
import TShirt from "../../assets/category/pawankalyantshirt.png"
import mobilecase from "../../assets/category/mobilecase.png"
import AOS from "aos";
import "aos/dist/aos.css";
import Products from './Products/Products'
import Blogs from './Blogs/Blogs'
import Footer from './Footer/Footer'
import CelebrityCategory from './Products/CelebrityCategory'
import MovieWiseProduct from './Products/MovieWiseProduct'


const BannerData = {
  discount: "30% OFF",
  title: "Movie T-Shirts",
  date: "for Movies Lovers",
  image: TShirt,
  title2: "Pawan Kalayn",
  title3: "Specail Edition T-Shirt",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#f42c37",
};

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "14 Jan to 28 Jan",
  image: mobilecase,
  title2: "Smart Solo",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#2dcc6f",
};

function Home() {

    React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  // const { loggedIn, logout } = useContext(UserContext);

  return (
    <div>
      
        <Navbar/>
        
        <Hero/>
        <Category/>
        <Category2/>
        <Services/>
        <Banner data={BannerData}/>
        <Products/>
        <Banner data={BannerData2}/>
        <CelebrityCategory/>
        <MovieWiseProduct/>
        {/* <Blogs/> */}
        <Footer/>
    </div>
  )
}

export default Home