import React,{useState} from "react";
import Image1 from "../../../assets/category/mug.png";
import Image2 from "../../../assets/category/mobilecase.png";
import Image3 from "../../../assets/category/pawankalyantshirt.png";
import Button from "../Shared/Button";
import { Link, useNavigate } from "react-router-dom";
import Mug from "./Mug";
const Category = () => {

  const categoryName = "T-Shirt";
  const categoryMug="Mug";
  const categoryMobileCases="mobile-cases"


  
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Mug
                </p>
                
                <Link to={`/category/${categoryMug}`}>
                  <Button
                    text="Shop Now"
                    bgColor={"bg-redprimary"}
                    textColor={"text-white"}
                    
                  />
                </Link>
              </div>
            </div>
            <img src={Image1} alt="" className="w-[240px] ml-[80px] absolute bottom-0" />
          </div>
          {/* second col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-brandYellow to-brandYellow/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Mobile <br /> Cases
                </p>
                <Link to={`/category/${categoryMobileCases}`}>

                  <Button
                    text="Shop Now"
                    bgColor={"bg-white"}
                    textColor={"text-brandYellow"}
                  />
                  </Link>
              </div>
            </div>
            <img
              src={Image2}
              alt=""
              className="w-[280px] absolute -right-10 lg:top-[40px]"
            />
          </div>
          {/* third col */}
          <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-redprimary to-redprimary/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Movie T-Shirt
                </p>
                <Link to={`/category/${categoryName}`}>

                <Button
                  text="Shop Now"
                  bgColor={"bg-white"}
                  textColor={"text-redprimary"}
                />
                </Link>
              </div>
            </div>
            <img
              src={Image3}
              alt=""
              className="w-[250px] absolute top-1/2 -translate-y-1/2 -right-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
