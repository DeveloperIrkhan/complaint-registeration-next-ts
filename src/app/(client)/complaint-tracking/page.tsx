"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [trackingId, setTrackingId] = useState("");
  return (
    <div className="h-screen">
      <div className="w-full h-full flex justify-center items-center bg-custom-radial p-2">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-red-500 mb-4">
            Complaint Tracking
          </h1>

          <div className="flex flex-col gap-2 mb-6">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your tracking ID..."
              className="flex-1 px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <Link
              href={`complaint-tracking/${trackingId}`}
              className="bg-amber-600 flex items-center gap-1 justify-center w-24 
              hoverEffect text-white px-2 py-1.5 rounded-lg hover:translate-y-0.5 hover:bg-red-500 transition"
            >
              <Search size={20}/> Track
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
