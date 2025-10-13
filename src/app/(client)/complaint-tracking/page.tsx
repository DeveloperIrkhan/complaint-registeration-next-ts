"use client";
import Spinner from "@/components/Spinner/Spinner";
import { complaintStatus } from "@/enums/complaintStatus";
import { useGetComplaintByIdQuery } from "@/features/apiCalls";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [trackingId, setTrackingId] = useState("");
  const [complaint, setComplaint] = useState<any>(null);
  const { data, isLoading, isFetching, refetch } =
    useGetComplaintByIdQuery(trackingId);
  const fetchComplaint = async () => {
    if (!trackingId) return toast.error("Enter a valid tracking ID");
    const result = await refetch();
    console.log(result.data);
    try {
      if (result.data?.success === true) {
        setComplaint(result.data?.registeredComplaint);
        toast.success(result.data?.message);
      } else {
        toast.error(result.data?.message);
        setComplaint(null);
      }
    } catch (error: any) {
      toast.error(result?.data?.message || "Complaint not found!");
      setComplaint(null);
      console.log("complaint", complaint);
    }
  };
  const statuses = [
    complaintStatus.incomplete,
    complaintStatus.pending,
    complaintStatus.in_progress,
    complaintStatus.resolved,
    complaintStatus.closed
  ];
  const currentStatusIndex = complaint?.complaintStatus
    ? statuses.findIndex(
        (s) => s.toLowerCase() === complaint.complaintStatus?.toLowerCase()
      )
    : -1;
  useEffect(() => {}, [complaint]);
  return (
    <div className="h-screen">
      {(isLoading || isFetching) && <Spinner />}
      <div className="w-full h-full flex justify-center items-center bg-gradient-to-tl to-sky-200 from-indigo-500">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
            Complaint Tracking
          </h1>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your tracking ID..."
              className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={fetchComplaint}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isLoading ? "Checking..." : "Track"}
            </button>
          </div>

          {complaint != null ? (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Status:{" "}
                <span className="text-blue-600 capitalize">
                  {complaint.complaintStatus}
                </span>
              </h2>
              {/* Progress Tracker */}
              <div className="relative flex justify-between items-center mb-8 px-2">
                {/* Base Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gray-300 -translate-y-1/2 z-0 rounded-full"></div>

                {/* Filled Line */}
                <div
                  className="absolute top-1/2 left-0 h-[3px] bg-red-600 -translate-y-1/2 z-10 rounded-full transition-all duration-700"
                  style={{
                    width: `${
                      ((currentStatusIndex + 1) / statuses.length) * 100
                    }%`
                  }}
                ></div>

                {statuses.map((status, index) => {
                  const isActive = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;
                  return (
                    <div
                      key={status}
                      className="flex flex-col items-center text-center w-full"
                    >
                      {/* Bullet */}
                      <div
                        className={`z-20 flex justify-center items-center w-6 h-6 rounded-full border-[3px] transition-all duration-500
            ${
              isActive
                ? "bg-red-600 border-red-600"
                : "bg-white border-gray-300"
            }
            ${isCurrent ? "scale-110 ring-4 ring-red-200" : ""}
          `}
                        style={{ transform: "translateY(18px)" }}
                      ></div>

                      {/* Label */}
                      <p
                        className={`text-xs mt-6 capitalize ${
                          isActive
                            ? "text-red-600 font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {status.replace("_", " ")}
                      </p>
                    </div>
                  );
                })}
              </div>
              <hr className="my-3" />
              <p className="text-lg">Complaint details</p>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {complaint.name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {complaint.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Description:</strong> {complaint.complaint}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Last Updated:</strong>{" "}
                  {new Date(complaint.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-red-600 bg-red-300 rounded-lg w-full p-4">
              no record found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
