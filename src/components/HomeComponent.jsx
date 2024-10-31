import React from "react";
import { Link } from "react-router-dom";
import devicesImg from "../assets/images/homeDevices.png"
const HomeComponent = () => {
  return (
    <div className="landingImg h-screen w-screen pb-3">
      <div className="w-ful h-full flex flex-col lg:flex-row items-center justify-around overflow-x-hidden lg:overflow-hidden">
        <div className="pt-[100px]">
          <img
            src={devicesImg}
            className=""
            width={350}
            height={500}
            alt=""
          />
        </div>

        <div className="text-center lg:text-left">
          <h1 className="text-[70px] font-bold text-primary">Learn English</h1>
          
          <h1 className="text-[70px] font-extrabold text-secondary">With AI</h1>
          <br />
          <br />
          <Link to={"/chat"} className="bg-secondary px-5 py-3 text-dark font-bold rounded-md text-3xl">Start Learning</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
