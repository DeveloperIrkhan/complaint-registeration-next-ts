"use client";
import { complaintPriority } from "@/enums/complaintPriority";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Spinner from "@/components/Spinner/Spinner";
import { toast } from "react-toastify";
import { images } from "@/app/Images";
import Image from "next/image";
const page = () => {
  const [name, setName] = useState<string>("");
  const [complaintId, setComplaintId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [designation, setDesgination] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [complaint, setComplaint] = useState<string>("");

  const priorities = Object.keys(complaintPriority).filter((key) =>
    isNaN(Number(key))
  );
  const handleSubmitChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    try {
      form.append("name", name);
      form.append("email", email);
      form.append("phone", phone);
      form.append("designation", designation);
      form.append("department", department);
      form.append("priority", priority);
      form.append("complaint", complaint);
      const response = await axios.post("/api/complaints/register", form);
      console.log("response", response.data);
      if (response.data.success === true) {
        console.log(response.data.complaintId);
        setComplaintId(response.data.complaintId._id);
        toast.success(
          response.data?.message || "complaint registered successfully! ✅"
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error!");
    } finally {
      setIsLoading(false);
      setName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setDesgination("");
      setComplaint("");
    }
  };
  return (
    <div className="h-screen">
      {isLoading && <Spinner />}
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full flex h-full">
          <div className="md:w-1/2 w-full bg-white flex justify-center items-center">
            <div className="p-3 max-w-sm  space-y-3 rounded-md bg-white">
              {complaintId === "" || complaint === undefined ? (
                <>
                  <form onSubmit={handleSubmitChanges}>
                    <p className="text-center text-xl font-Jost mt-3 mb-6 font-semibold tracking-wider">
                      Complaint Registeration Form
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3 justify-around">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter Your FUll Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-white custom-input"
                        />
                        <input
                          id="phone"
                          name="phone"
                          type="text"
                          placeholder="Your Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full custom-input  bg-white"
                        />
                      </div>
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

                      <div className="flex gap-3 justify-around">
                        <input
                          id="designation"
                          name="designation"
                          type="text"
                          placeholder="Enter Your designation Address"
                          value={designation}
                          onChange={(e) => setDesgination(e.target.value)}
                          required
                          className="w-full custom-input  bg-white"
                        />
                        <input
                          id="department"
                          name="department"
                          type="text"
                          placeholder="Enter Your Department Address"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                          className="w-full custom-input  bg-white"
                        />
                      </div>
                      <select
                        id="priority"
                        name="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full custom-input bg-white cursor-pointer"
                      >
                        <option value="">Select Priority</option>
                        {priorities.map((level) => (
                          <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </option>
                        ))}
                      </select>
                      <div className="flex">
                        <textarea
                          name="complaint"
                          placeholder="Pleae provide your issue in details"
                          value={complaint}
                          rows={5}
                          required
                          onChange={(e) => setComplaint(e.target.value)}
                          className={"w-full custom-input bg-white"}
                        />
                      </div>
                      <button
                        type="submit"
                        className="group relative w-full overflow-hidden h-10 px-4 py-1 
                      rounded-md text-white text-sm font-medium 
                      flex items-center justify-center gap-2 
                      bg-sky-600"
                      >
                        <span
                          className="absolute inset-0  transform -translate-x-full
                         group-hover:translate-x-0 transition-transform duration-500
                          ease-out z-0 bg-black"
                        ></span>
                        <span className="relative z-10 flex items-center gap-2">
                          Register Complaint
                        </span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="px-4 py-5">
                  <p className="font-semibold text-lg">
                    your complaint Id is{" "}
                    <span className="font-bold">{complaintId.toString()}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className={`md:w-1/2 w-full md:block hidden overflow-hidden`}>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 1, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
              className="relative w-full h-full bg-cover bg-center mx-auto"
            >
              <Image
                src={images.customerCarePNG}
                alt="shopping-cart"
                layout="fill"
                objectFit="contain"
                className="overflow-hidden"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
