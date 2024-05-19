import './App.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import Home from "./component/User/Home/Home"
import Login from "./component/User/Pages/Login/Login"
import Signup from "./component/User/Pages/Signup/Signup"
import AddToCart from "./component/User/Pages/AddToCart/AddToCart"
import MovieCategory from "./component/User/Pages/DisplayPages/MovieCategory"
import ProductDisplay from "./component/User/Home/Products/ProductDisplay"
import Mug from './component/User/Home/Category/Mug';

// import Signup from './components/Pages/Signup/Signup';
// import Sidebar from './Admin/Component/Sidebar/Sidebar';
// import AddToCart from './components/User/Pages/AddToCart/AddToCart';
// import ProductDisplay from './components/User/Home/Products/ProductDisplay';
// 
// import OrderPage from './components/user/Pages/OrderPage/OrderPage';
 import CheckOut from './component/User/Pages/OrderPage/CheckOut';
//  import OrderDetails from './component/User/Home/OrderPage/OrderDetails'
import OrderSummaryPage from './component/User/Pages/OrderPage/OrderSummaryPage';
import CelebritiesWiseProducts from './component/User/Home/Products/CelebritiesWiseProducts';
import Invoice from './component/User/Pages/OrderPage/Invoice';
import ProductByType from './component/User/Home/Products/ProductByType';
import ContactUs from './component/User/Home/Services/ContactUs';
// import MovieCategory from './components/User/Pages/DisplayPages/MovieCategory';
import SearchProduct from './component/User/Home/Products/SearchProduct';
import Supercoin from './component/User/Pages/DisplayPages/Supercoin';
import ForgotPassword from './component/User/Pages/Login/ForgetPassword';
import Shop from './component/User/Pages/Shop/Shop';



import AdminLoginPage from "./component/Admin/Dashboard/AdminLoginPage"
import Dashboard from "./component/Admin/Dashboard/Dashboard"
import Category from "./component/Admin/Category/Category"
import UpdateCategory from "./component/Admin/Category/UpdateCategory"
import Product from "./component/Admin/Product/Product"
import UpdateProduct from "./component/Admin/Product/UpdateProduct"
import Addproduct from "./component/Admin/Product/Addproduct"
import Advertisement from "./component/Admin/ImageSlider/Advertisement"
import Order from "./component/Admin/OrderPage/Order"
import OrderUpdate from "./component/Admin/OrderPage/OrderUpdate"
import Review from "./component/Admin/Dashboard/Review"

function App() {
  return (
    <div className="App">
      <Routes>      
      <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/addtocart" element={<AddToCart />}></Route>
        <Route path="/checkout/:id" element={<CheckOut />}></Route>
        <Route path='/product/:id' element={<ProductDisplay />}></Route>
        <Route path='/category/:categoryName' element={<Mug />}></Route>
        <Route path='/orderdetails' element={<OrderSummaryPage />}></Route>
        <Route path='/celebrityproduct/:name' element={<CelebritiesWiseProducts />}></Route>
        <Route path='/invoice/:id' element={<Invoice />}></Route>
        <Route path='/productbytype/:producttype' element={<ProductByType />}></Route>
        <Route path='/contactus/' element={<ContactUs />}></Route>
        <Route path='/movieproduct' element={<MovieCategory />}></Route>
        <Route path='/moviecategory/:moviename' element={<Mug />}></Route>
        <Route path='/search/:searchQuery' element={<SearchProduct />}></Route>
        <Route path='/supercoin' element={<Supercoin />}></Route>
        <Route path='/forgetpassword' element={<ForgotPassword />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/admin' element={<AdminLoginPage />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/category' element={<Category />} />
        <Route path='/admin/categoryupdate/:id' element={<UpdateCategory />} />
        <Route path='/admin/product' element={<Product />} />
        <Route path='/admin/productupdate/:id' element={<UpdateProduct />} />
        <Route path='/admin/addproduct' element={<Addproduct />}></Route>
        <Route path='/admin/coupon' element={<Advertisement />}></Route>
        <Route path='/admin/order' element={<Order />} />
        <Route path='/admin/orderupdate/:id' element={<OrderUpdate />}></Route>
        <Route path='/admin/review' element={<Review />}></Route>
      </Routes>

    </div>
  );
}

export default App;
