import React from "react";
import map from "../../assets/map1.png";

const ConnectivitySection = () => {
  return (
    <section className=" py-20 mt-10">
      <div className="container mx-auto px-6 flex flex-col items-center text-center gap-12">

        {/* Text Section */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <h1 className="text-6xl font-extrabold leading-tight">
            <span className=" bg-clip-text text-transparent">
              Remote Connectivity
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700">
            Break free from traditional boundaries. Work from anywhere, at the comfort of your own space. Perfect for students to get the ideal internships and gain hands-on experience.
          </p>
        </div>

        {/* World Map Image */}
        <div className="flex justify-center w-full h-full">
          <img
            src={map}
            alt="World map connectivity"
            className="w-full max-w-6xl object-cover rounded-xl "
          />
        </div>
      </div>
    </section>
  );
};

export default ConnectivitySection;
