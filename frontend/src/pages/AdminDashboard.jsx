import React from "react";

const GamingHero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1"
        alt="bg"
        className="absolute w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-orange-500/20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6">

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-wide">
          GAMING <span className="text-blue-500">ARENA</span>
        </h1>

        <p className="max-w-xl text-gray-300 mb-8">
          Enter the next level of gaming experience with powerful tools, stunning visuals, and pro-level performance.
        </p>

        <div className="flex gap-4">
          <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>

          <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>

      </div>

      {/* Bottom Gradient Glow */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>

    </div>
  );
};

export default GamingHero;