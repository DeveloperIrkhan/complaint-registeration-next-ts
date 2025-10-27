import { images } from "@/app/Images";
import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center 
                 bg-darkColor/70 backdrop-blur-sm"
    >
      <div className="flex flex-col justify-center items-center text-2xl">
        <Image
          src={images.Spinner}
          width={100}
          height={100}
          alt="Loading Spinner"
          className="w-36 h-36 animate-spin"
        />
      </div>
    </div>
  );
};

export default Spinner;
