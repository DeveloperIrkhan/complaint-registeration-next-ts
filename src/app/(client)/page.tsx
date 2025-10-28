"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { images } from "../Images";
import Link from "next/link";

const page = () => {
  useEffect(() => {
    toast.success("Welcome to PRCS Complaint Registeration!", 
      {autoClose:5000});
  }, []);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center bg-linear-30 to-red-100 from-orange-200 md:bg-white px-6 md:px-12">
        <div className="w-full max-w-sm">
          <div className="text-center my-10">
            <div className="flex items-center group justify-center gap-4">
              <div className="h-0.5 w-10 bg-black"></div>
              <h2
                className={
                  "text-black text-xl md:text-xl font-semibold uppercase tracking-wide"
                }
              >
                Welcome! Valued User
              </h2>
              <div className="h-0.5 w-10 bg-black"></div>
            </div>

            {/* Subtitle */}
            <p className={`text-lg italic text-gray-500 mt-1`}>
              Register Your Online Complaint.
            </p>
          </div>
          <div className="cursor-pointer flex justify-center items-center gap-3">
            <Link href={"/register-complaint"}>
              {" "}
              <div
                className="flex flex-col justify-center items-center
             border-2 border-gray-300 text-gray-700 
             bg-gray-50 shadow-md space-y-3 p-4 h-44 w-44 rounded-2xl
              duration-300 hover:translate-y-2
              hover:bg-gray-200 hover:shadow-[0_0_25px_rgba(255,180,0,0.7)] "
              >
                <Image
                  src={images.registeringComplaint}
                  alt=""
                  height={80}
                  width={80}
                />
                <p className="font-bold text-sm">Register Complaint</p>
              </div>
            </Link>
            <Link href={"complaint-tracking"}>
              <div
                className="cursor-pointer flex flex-col justify-center items-center
              border-2 border-gray-300 text-gray-700 
              bg-gray-50 shadow-md space-y-3 p-4 h-44 w-44 rounded-2xl hover:translate-y-2
              duration-300 hover:bg-gray-200 hover:shadow-[0_0_25px_rgba(255,180,0,0.7)] "
              >
                <Image
                  src={images.trackingComplaint}
                  alt=""
                  height={80}
                  width={80}
                />
                <p className="font-bold text-sm">Track Complaint</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="hidden flex-1 
      bg-radial from-40% to-red-500 from-amber-500 md:flex items-center justify-center p-6 relative"
      >
        <div className="z-10 text-center h-full flex items-center">
          <Image
            src={images.customerPng}
            alt="Auth illustrations"
            width={400}
            height={350}
            className="mx-auto h-9/12 shadow-2xl rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
