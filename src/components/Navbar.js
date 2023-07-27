import React from "react";
import Almabetterlogo from '../assets/Almabetterlogo.png';  
// Importing the image file 'Almabetterlogo.png' from the '../assets' directory


const Navbar = () => {
  return (
    <div>
      <div className="flex items-center justify-between bg-white p-2 shadow-lg">
        {/* Displaying the Almabetter logo image */}
        <img
          src={Almabetterlogo}
          alt="HeaderImage"
          className="w-22 h-9 ml-8 "
        />
        {/* Displaying the title of the Navbar */}
        <h1 className="text-xl mr-8 font-bold">FlashCard Generator</h1>
      </div>
      
    </div>
  );
};

export default Navbar;
