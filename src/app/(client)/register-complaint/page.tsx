"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Spinner from "@/components/Spinner/Spinner";
import { toast } from "react-toastify";
import { images } from "@/app/Images";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  useRegisterComplaintMutation,
  useSendComplaintEmailMutation
} from "@/features/apiCalls";
import { ComplaintType } from "@/enums/ComplaintType/ComplaintType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
const page = () => {
  const [name, setName] = useState<string>("");
  const [complaintId, setComplaintId] = useState<string>("");
  const [complaintType, setComplaintType] = useState<ComplaintType | "">("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [designation, setDesgination] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [complaint, setComplaint] = useState<string>("");
  const [registerComplaint, { isLoading: registeringLoading }] =
    useRegisterComplaintMutation();
  const [sendComplaintEmail, { isLoading: emailSendingLoading }] =
    useSendComplaintEmailMutation();

  const handleSubmitChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    const registerFormData = new FormData();
    try {
      registerFormData.append("name", name);
      registerFormData.append("email", email);
      registerFormData.append("phone", phone);
      registerFormData.append("designation", designation);
      registerFormData.append("department", department);
      registerFormData.append("complaintType", complaintType);
      registerFormData.append("complaint", complaint);
      const response = await registerComplaint(registerFormData).unwrap();
      console.log("response", response);
      if (response.success === true) {
        toast.success(
          response.message || "complaint registered successfully! ✅"
        );

        const complaintId = response.complaint?._id;
        if (complaintId) {
          const emailResp = await sendComplaintEmail({
            userEmail: email,
            emailType: "Tracking",
            trackingId: complaintId
          }).unwrap();

          emailResp.success
            ? toast.success(emailResp.message || "Email sent successfully! 📧")
            : toast.error(emailResp.message || "Error sending email ❌");
          setComplaintId(complaintId);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error!");
    } finally {
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
      {(registeringLoading || emailSendingLoading) && <Spinner />}
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
                        <div className="flex gap-y-2 flex-col">
                          <Label>Enter Your Name</Label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="eg. irfan shah"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-white custom-input"
                          />
                        </div>
                        <div className="flex gap-y-2 flex-col">
                          <Label>Enter Your Phone</Label>
                          <input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="eg. 033312345678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full custom-input  bg-white"
                          />
                        </div>
                      </div>
                      <div className="flex gap-y-2 flex-col">
                        <Label>Enter Your Correct Email</Label>
                        <input
                          id="email"
                          name="email"
                          type="text"
                          placeholder="eg. abc@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full custom-input  bg-white"
                        />
                      </div>

                      <div className="flex gap-3 justify-around">
                        <div className="flex gap-y-2 flex-col">
                          <Label>Enter Your Designation</Label>
                          <input
                            id="designation"
                            name="designation"
                            type="text"
                            placeholder="eg. IT Officer"
                            value={designation}
                            onChange={(e) => setDesgination(e.target.value)}
                            required
                            className="w-full custom-input  bg-white"
                          />
                        </div>
                        <div className="flex gap-y-2 flex-col">
                          <Label>Enter Your Department</Label>
                          <input
                            id="department"
                            name="department"
                            type="text"
                            placeholder="eg. Accounts"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className="w-full custom-input bg-white"
                          />
                        </div>
                      </div>
                      <div className="flex gap-y-2 flex-col">
                        <Label>Please Select Your Compalint Type</Label>
                        <Select
                          value={complaintType}
                          onValueChange={(value: ComplaintType) =>
                            setComplaintType(value)
                          }
                        >
                          <SelectTrigger className="w-full bg-white mt-1">
                            <SelectValue placeholder="please select complaint type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ComplaintType).map(
                              (complaintTypeOption) => (
                                <SelectItem
                                  key={complaintTypeOption}
                                  value={complaintTypeOption}
                                >
                                  {complaintTypeOption}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex w-full">
                        <div className="flex gap-y-1 flex-col w-full">
                          <Label>Enter Your Complaint</Label>
                          <textarea
                            name="complaint"
                            placeholder="Please provide your issue in details"
                            value={complaint}
                            rows={5}
                            required
                            onChange={(e) => setComplaint(e.target.value)}
                            className="w-full custom-input bg-white"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="group relative w-full overflow-hidden h-10 px-4 py-1 
                      rounded-md text-white text-sm font-medium 
                      flex items-center justify-center gap-2 
                      bg-red-300"
                      >
                        <span
                          className="absolute inset-0  transform -translate-x-full
                         group-hover:translate-x-0 transition-transform duration-500
                          ease-out z-0 bg-red-800"
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
                  <p className="font-semibold italic text-[14px]">
                    Please remember this Tracking Id for Tracking Your Complaint
                  </p>
                  <p className="font-semibold italic text-[14px]">
                    We have also send you a link in Email to track your
                    complaint
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className={`md:w-1/2 w-full md:block hidden overflow-hidden`}>
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 1, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "easeInOut"
              }}
              className="relative w-full h-full bg-cover bg-center mx-auto"
            >
              <Image
                src={images.customerCarePNG}
                alt="shopping-cart"
                fill
                className="object-contain overflow-hidden"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
