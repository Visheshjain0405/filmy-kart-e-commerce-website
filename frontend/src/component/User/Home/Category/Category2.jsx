import React from "react";
import Image1 from "../../../assets/category/calender.png";
import Image2 from "../../../assets/category/badges.png";
import Image3 from "../../../assets/category/poster.jpg";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";

const Category = () => {
  const categoryCalender = "Calender";
  const categoryBadges="Badges";
  const categoryPosters="Posters";
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First col */}
          <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-gray-400/90 to-gray-100 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Customized Calender
                </p>
                <Link to={`/category/${categoryCalender}`}>

                <Button
                  text="shop Now"
                  bgColor={"bg-redprimary"}
                  textColor={"text-white"}
                />
                </Link>
              </div>
            </div>
            <img
              src={Image1}
              alt=""
              className="w-[320px] absolute top-1/2 -translate-y-1/2 -right-0"
            />
          </div>
          {/* Second col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-brandGreen/90 to-brandGreen/90 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Badges
                </p>
                <Link to={`/category/${categoryBadges}`}>
                <Button
                  text="Shop Now"
                  bgColor={"bg-white"}
                  textColor={"text-brandGreen"}
                />
                </Link>
              </div>
            </div>
            <img src={Image2} alt="" className="w-[200px] ml-[120px] absolute bottom-0" />
          </div>
          {/* Third col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-brandBlue to-brandBlue/90 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Posters
                </p>
                <Link to={`/category/${categoryPosters}`}>
                <Button
                  text="Shop Now"
                  bgColor={"bg-white"}
                  textColor={"text-brandBlue"}
                />
                </Link>
              </div>
            </div>
            <img
              src={Image3}
              alt=""
              className="w-[150px] absolute bottom-5 right-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
