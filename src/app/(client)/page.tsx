"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { images } from "../Images";
import MainPageButtons from "@/components/MainPageButtons";

const page = () => {
  useEffect(() => {
    toast.success("Welcome to PRCS User!", {
      autoClose: 5000
    });
  }, []);
  return (
    <div className="min-h-screen flex flex-col md:flex-row  bg-custom-linear md:p-0">
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-sm">
          <div className="text-center my-10">
            <div className="flex items-center group justify-center gap-4">
              <div className="h-0.5 w-10 bg-red-500"></div>
              <h2
                className={
                  "text-red-500 text-[14px] md:text-xl font-semibold uppercase tracking-normal md:tracking-wide"
                }
              >
                Welcome! Valued User
              </h2>
              <div className="h-0.5 w-10 bg-red-500"></div>
            </div>

            {/* Subtitle */}
            <p className={`italic text-[11px] md:text-lg text-red-500 mt-1`}>
              Register Your Online Complaint.
            </p>
          </div>
          <div className="cursor-pointer flex justify-center items-center gap-3">
            <MainPageButtons
              label="register complaint"
              hrefTo="/register-complaint"
              ImageSrc={images.registeringComplaint}
            />
            <MainPageButtons
              label="complaint tracking"
              hrefTo="/complaint-tracking"
              ImageSrc={images.trackingComplaint}
            />
          </div>
        </div>
      </div>

      <div className="hidden flex-1 bg-custom-radial md:flex items-center justify-center p-6 relative">
        <div className="z-10 text-center h-full flex items-center">
          <Image
            src={images.customerCarePNG}
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
