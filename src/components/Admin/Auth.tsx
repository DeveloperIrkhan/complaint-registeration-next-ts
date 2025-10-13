"use client";
import React, { useState } from "react";
import CustomButton from "../CustomButton";
import SectionHeading from "../ui/SectionHeading";
import Image from "next/image";
import { images } from "@/app/Images";

const Auth = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");
  const [currentState, setCurrentState] = useState("login");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-t to-sky-100 from-indigo-200 md:bg-white px-6 md:px-12">
        <div className="w-full max-w-sm">
          <SectionHeading
            title={`Admin ${currentState === "signup" ? "Signup" : "Login"}`}
            subtitle="admin auth section"
            lineColor="bg-black"
            textColor="text-gary-500"
            subtitleColor="text-gray-900"
          />
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-y-4 justify-center items-center">
              {currentState === "signup" && (
                <div className="flex gap-3 justify-around w-full">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter Your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-white custom-input"
                  />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter Your Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full custom-input  bg-white"
                  />
                </div>
              )}
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full custom-input  bg-white"
              />
              <input
                id="password"
                name="password"
                type="text"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full custom-input  bg-white"
              />
              {currentState === "signup" && (
                <input
                  id="againPassword"
                  name="againPassword"
                  type="text"
                  placeholder="Enter Your Password Again"
                  value={againPassword}
                  onChange={(e) => setAgainPassword(e.target.value)}
                  required
                  className="w-full custom-input  bg-white"
                />
              )}
            </div>

            <CustomButton
             buttonColor="bg-sky-500"
             buttonHoverColor="bg-indigo-600"
              className="w-full text-white rounded-lg font-semibold transition"
              onClickFunction={() => console.log("hi")}
              buttonText={currentState === "signup" ? "Sign up" : "Login"}
            />
          </form>
          {/* button section */}
          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {/* text section */}
          <div className="w-full flex justify-between text-gray-600">
            {currentState === "Log in" && (
              <p className="text-sm pb-1 cursor-pointer transition-colors duration-200 hover:text-gray-300">
                Forgot password?
              </p>
            )}
            {currentState === "signup" ? (
              <p
                onClick={() => setCurrentState("login")}
                className="text-sm pb-1 cursor-pointer transition-colors duration-200 hover:text-gray-300"
              >
                I have account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("signup")}
                className="text-sm pb-1 cursor-pointer transition-colors duration-200 hover:text-gray-300"
              >
                can't have account
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className="hidden flex-1 
      bg-gradient-to-tl to-indigo-500 from-sky-300 md:flex items-center justify-center p-6 relative"
      >
        <div className="z-10 text-center h-full flex items-center">
          <Image
            src={currentState === "login" ? images.login : images.auth}
            alt="Auth illustrations"
            width={350}
            height={350}
            className="mx-auto h-9/12 shadow-2xl rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
