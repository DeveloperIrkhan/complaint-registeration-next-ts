"use client";
import PieChart from "@/components/Charts/PieChart";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { complaintStatus } from "@/enums/complaintStatus";
import { useComplaintStore } from "@/features/store";
import { getWithExpirys } from "@/helpers/storageHelper";
import { IComplaint } from "@/interfaces/interfaces";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { complaintPriority } from "@/enums/complaintPriority";
import { Button } from "@/components/ui/button";
import { useUpdateComplaintStatusMutation } from "@/features/apiCalls";
import { toast } from "react-toastify";
import { SenderType } from "@/enums/SenderType";
import axios from "axios";
import { Send } from "lucide-react";
import Spinner from "@/components/Spinner/Spinner";

const page = () => {
  interface IUserLoginProps {
    _id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
  }
  const { complaints } = useComplaintStore();
  const [relatedComplaints, setRelatedComplaints] = useState<IComplaint[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [inputComment, setInputComment] = useState<string>("");
  const [priority, setPriority] = useState<complaintPriority | "">("");
  const [status, setStatus] = useState<complaintStatus | "">("");
  const [updateComplaintStatus] = useUpdateComplaintStatusMutation();
  useEffect(() => {
    const loggedInUser = getWithExpirys<IUserLoginProps>("userLogin");
    const myComplaints = complaints
      .filter((item) => item.assignedTo === loggedInUser?._id)
      .sort(
        (a, b) =>
          new Date(b.updatedAt ?? "").getDate() -
          new Date(a.updatedAt ?? "").getDate()
      );
    setRelatedComplaints(myComplaints ?? []);
    console.log("myComplaints", myComplaints);
  }, [complaints]);
  const totalAssignComplaints = relatedComplaints?.length;
  const totalPendingComplaints = relatedComplaints?.filter(
    (complaint) => complaint.complaintStatus === complaintStatus.pending
  ).length;
  const totalInProgressComplaints = relatedComplaints?.filter(
    (complaint) => complaint.complaintStatus === complaintStatus.in_progress
  ).length;
  const incompleteComplaints = relatedComplaints?.filter(
    (complaint) => complaint.complaintStatus === complaintStatus.incomplete
  ).length;

  const completedComplaints = relatedComplaints?.filter(
    (complaint) =>
      complaint.complaintStatus === complaintStatus.resolved ||
      complaint.complaintStatus === complaintStatus.closed
  ).length;

  useEffect(() => {}, [
    incompleteComplaints,
    totalAssignComplaints,
    totalInProgressComplaints,
    totalPendingComplaints
  ]);
  const handleUpdate = async (e: FormEvent, complaintId: string) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("hi values change", complaintId, status);
      var response = await updateComplaintStatus({
        complaintId,
        complaintStatus: status
      }).unwrap();
      if (response?.success) {
        toast.success(response.message, { autoClose: 2000 });
      } else {
        toast.error(response.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (complaintId: string) => {
    if (!inputComment.trim()) return;

    const sendingResponse = {
      message: inputComment, // use a clear field name for backend
      sender: SenderType.isTechnician,
      complaintId
    };

    try {
      setIsLoading(true);
      const response = await axios.put(
        `/api/complaints/update-comment/${complaintId}`,
        sendingResponse
      );
      console.log(response.data.complaint.complaintStatusMessage);

      setInputComment(""); // clear input after sending
    } catch (error) {
      console.error("Error sending comment:", error);
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <Container className="">
      {isLoading && <Spinner/>}
      <div className="my-3">
        <SectionHeading
          title="Dashboard"
          subtitle="Complaints related to technical Team Member"
          subtitleColor="text-gray-700"
          lineColor="bg-gray-600"
          textColor="text-gray-700"
        />
      </div>
      <div className="bg-gray-100 rounded-xl p-4 gap-2 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 justify-center items-center">
        <PieChart
          insideTitle="Your Toatal Tasks"
          chartTitle="Assigned / Total"
          totalValue={complaints.length ?? 0}
          calculatedValue={totalAssignComplaints ?? 0}
        />
        <PieChart
          insideTitle="In-Progress Task"
          chartTitle="In-Progress"
          totalValue={totalAssignComplaints ?? 0}
          calculatedValue={totalInProgressComplaints ?? 0}
        />
        <PieChart
          insideTitle="Incomplete Tasks"
          chartTitle="Incomplete"
          totalValue={totalAssignComplaints ?? 0}
          calculatedValue={incompleteComplaints ?? 0}
        />
        <PieChart
          insideTitle="Pending Tasks"
          chartTitle="pending"
          totalValue={totalAssignComplaints ?? 0}
          calculatedValue={totalPendingComplaints ?? 0}
        />
        <PieChart
          insideTitle="Completed Tasks"
          chartTitle="completed"
          totalValue={totalAssignComplaints ?? 0}
          calculatedValue={completedComplaints ?? 0}
        />
      </div>
      <div className="flex space-y-3 my-4 flex-col w-full rounded-xl p-4 bg-gray-100">
        {relatedComplaints &&
          relatedComplaints.map((complaint, index) => {
            const dateTime = new Date(
              complaint.registrationTime
            ).toDateString();
            const time = new Date(complaint.registrationTime).toTimeString();
            return (
              <Accordion
                key={index}
                type="single"
                collapsible
                className={`p-4 border rounded-md hover:shadow-lg duration-300
  ${
    complaint.complaintStatus === complaintStatus.closed ||
    complaint.complaintStatus === complaintStatus.resolved
      ? "bg-green-100 border-green-200 hover:border-green-400 hover:bg-green-200"
      : complaint.complaintStatus === complaintStatus.incomplete
      ? "bg-red-100 border-red-200 hover:border-red-400 hover:bg-red-200"
      : complaint.complaintStatus === complaintStatus.in_progress
      ? "bg-yellow-100 border-yellow-200 hover:border-yellow-400 hover:bg-yellow-200"
      : complaint.complaintStatus === complaintStatus.pending
      ? "bg-blue-100 border-blue-200 hover:border-blue-400 hover:bg-blue-200"
      : ""
  }
`}
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex w-full justify-between">
                      <span>{complaint.complaint}</span>
                      <span className="text-end">
                        {complaint.complaintStatus}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="shadow-md border border-gray-200 rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800">
                          Complaint Details
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="bg-gray-100 rounded-md shadow-lg p-2 w-full">
                          <p className="text-gray-600 font-medium text-lg">
                            User Information
                          </p>
                          <div className="flex flex-col md:flex-row gap-3 justify-around w-full mt-3">
                            <div>
                              <Label className="text-gray-600">
                                Name of Applicant
                              </Label>
                              <p className="font-medium">
                                {complaint.name || "No Name provided"}
                              </p>
                            </div>

                            <div>
                              <Label className="text-gray-600">
                                Department
                              </Label>
                              <p className="text-gray-700">
                                {complaint.department ||
                                  "No Department available"}
                              </p>
                            </div>
                            <div>
                              <Label className="text-gray-600">
                                Designation
                              </Label>
                              <p className="text-gray-700">
                                {complaint.designation ||
                                  "No Designation available"}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 mt-10 font-medium text-lg">
                            Complaint Information
                          </p>
                          <div className="flex md:flex-row flex-col gap-3 justify-around w-full mt-3">
                            <div className="w-1/3">
                              <Label className="text-gray-600">
                                Complaint ID
                              </Label>
                              <p className="font-medium">{complaint._id}</p>
                            </div>

                            <div className="w-2/3">
                              <Label className="text-gray-600">
                                Description
                              </Label>
                              <p className="text-gray-700">
                                {complaint.complaint ||
                                  "No description available"}
                              </p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 mt-4 gap-4">
                            <div>
                              <Label className="my-2">Status</Label>
                              <Select
                                value={status}
                                onValueChange={(value: complaintStatus) => {
                                  setStatus(value);
                                }}
                              >
                                <SelectTrigger className="w-full bg-white mt-1">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values(complaintStatus).map(
                                    (statusOption) => (
                                      <SelectItem
                                        key={statusOption}
                                        value={statusOption}
                                      >
                                        {statusOption.replace("_", " ")}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="my-2">Priority</Label>
                              <Select
                                value={complaint.priority}
                                onValueChange={(value: complaintPriority) =>
                                  setPriority(value)
                                }
                              >
                                <SelectTrigger
                                  disabled
                                  className="w-full bg-white border mt-1"
                                >
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values(complaintPriority).map(
                                    (priorityOption) => (
                                      <SelectItem
                                        key={priorityOption}
                                        value={priorityOption}
                                      >
                                        {priorityOption}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md w-full max-w-2xl mx-auto p-4 flex flex-col">
                          {/* Header */}
                          <div className="pb-2 mb-3">
                            <p className="text-xl font-semibold text-gray-800">
                              Messages
                            </p>
                          </div>

                          {/* Messages container */}
                          <div className="flex flex-col gap-3 overflow-y-auto max-h-80 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            {complaint.complaintStatusMessage &&
                            complaint.complaintStatusMessage.length > 0 ? (
                              complaint.complaintStatusMessage.map(
                                (comment, index) => {
                                  const time =
                                    comment.createdAt &&
                                    new Date(
                                      comment.createdAt
                                    ).toLocaleString();
                                  return comment.sender ===
                                    SenderType.isAdmin ? (
                                    // Admin Message (left side)
                                    <div
                                      key={index}
                                      className="flex justify-end items-start"
                                    >
                                      <div className="bg-red-500 text-white px-4 py-2 rounded-tr-2xl rounded-bl-2xl 
                                      shadow-sm max-w-[70%]">
                                        <p className="text-sm font-medium">
                                          {comment.message}
                                        </p>
                                        <span className="text-xs text-gray-200 block mt-1 text-right">
                                          {time}
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    // User Message (right side)
                                    <div
                                      key={index}
                                      className="flex items-start"
                                    >
                                      <div className="bg-blue-600 text-white px-4 py-2 rounded-tl-2xl rounded-br-2xl shadow-sm max-w-[70%]">
                                        <p className="text-sm font-medium">
                                          {comment.message}
                                        </p>
                                        <span className="text-xs text-gray-200 block mt-1 text-right">
                                          {time}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <p className="text-gray-500 text-center py-6 italic">
                                No messages yet. Start the conversation!
                              </p>
                            )}
                          </div>

                          {/* Input section */}
                          <div className="mt-4 flex items-center gap-3 pt-3">
                            <input
                              value={inputComment}
                              type="text"
                              onChange={(e) => setInputComment(e.target.value)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleSend(complaint._id)
                              }
                              className="flex-1 border border-gray-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                              placeholder="Type your message..."
                            />
                            <button
                              disabled={!inputComment.trim() || isLoading}
                              onClick={() => handleSend(complaint._id)}
                              className={`p-3 rounded-full text-white transition-all duration-200 ${
                                inputComment.trim()
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-gray-300 cursor-not-allowed"
                              }`}
                            >
                              <Send size={20} />
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-4 text-gray-400">
                          <Label className="font-bold uppercase">
                            Registeration Time
                          </Label>
                          <p className="font-normal">{dateTime}</p>
                          <p className="font-normal">{time}</p>
                        </div>
                        <div className="flex justify-end pt-4">
                          <Button
                            onClick={(e) => handleUpdate(e, complaint._id)}
                            disabled={isLoading}
                            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                          >
                            {isLoading ? "Updating..." : "Update Changes"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
      </div>
    </Container>
  );
};

export default page;
