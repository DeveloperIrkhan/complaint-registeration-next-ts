"use client";

import { useComplaintStore } from "@/features/store";
import { IComplaint } from "@/interfaces/interfaces";
import { complaintPriority } from "@/enums/complaintPriority";
import { complaintStatus } from "@/enums/complaintStatus";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useUserStore } from "@/features/UserStore";
import Spinner from "@/components/Spinner/Spinner";

const Page = () => {
  const params = useParams();
  const Id = params?.complaintId as string;
  const { complaints } = useComplaintStore();
  const { users } = useUserStore();
  const [singleComplaint, setSingleComplaint] = useState<IComplaint | null>(
    null
  );
  const [status, setStatus] = useState<complaintStatus | "">("");
  const [priority, setPriority] = useState<complaintPriority | "">("");
  const [assignTo, setAssignTo] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (complaints.length > 0 && Id) {
      const found = complaints.find((item) => item._id === Id);
      if (found) {
        setSingleComplaint(found);
        setStatus(found.complaintStatus ?? "");
        setPriority(found.priority ?? "");
      }
    }
  }, [complaints, Id]);

  useEffect(() => {
    console.log("users from store updated:", users);
  }, [users]);

  const handleUpdate = async () => {
    if (!singleComplaint) return;
    setLoading(true);

    try {
      // Example PUT API request
      const res = await fetch(`/api/complaints/${singleComplaint._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, priority })
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Complaint updated successfully");
    } catch (error) {
      toast.error("Something went wrong while updating");
    } finally {
      setLoading(false);
    }
  };

  if (!singleComplaint) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No complaint found with ID: {Id}
      </p>
    );
  }
  const dateTime = new Date(singleComplaint.registrationTime).toDateString();
  const time = new Date(singleComplaint.registrationTime).toTimeString();
  return (
    <div className="max-w-3xl mx-auto mt-10">
      {loading && <Spinner />}
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
            <div className="flex gap-3 justify-around w-full mt-3">
              <div>
                <Label className="text-gray-600">Name of Applicant</Label>
                <p className="font-medium">
                  {singleComplaint.name || "No Name provided"}
                </p>
              </div>

              <div>
                <Label className="text-gray-600">Department</Label>
                <p className="text-gray-700">
                  {singleComplaint.department || "No Department available"}
                </p>
              </div>
              <div>
                <Label className="text-gray-600">Designation</Label>
                <p className="text-gray-700">
                  {singleComplaint.designation || "No Designation available"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-md shadow-lg p-2 w-full">
            <p className="text-gray-600 font-medium text-lg">
              Complaint Information
            </p>
            <div className="flex gap-3 justify-around w-full mt-3">
              <div className="w-1/3">
                <Label className="text-gray-600">Complaint ID</Label>
                <p className="font-medium">{singleComplaint._id}</p>
              </div>

              <div className="w-2/3">
                <Label className="text-gray-600">Description</Label>
                <p className="text-gray-700">
                  {singleComplaint.complaint || "No description available"}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 mt-4 gap-4">
              <div>
                <Label>Status</Label>
                <Select
                  value={status}
                  disabled
                  onValueChange={(value: complaintStatus) => setStatus(value)}
                >
                  <SelectTrigger className="w-full bg-white mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(complaintStatus).map((statusOption) => (
                      <SelectItem key={statusOption} value={statusOption}>
                        {statusOption.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(value: complaintPriority) =>
                    setPriority(value)
                  }
                >
                  <SelectTrigger className="w-full bg-white border mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(complaintPriority).map((priorityOption) => (
                      <SelectItem key={priorityOption} value={priorityOption}>
                        {priorityOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Task Assign To</Label>
                <Select
                  value={assignTo}
                  onValueChange={(value) => setAssignTo(value)}
                >
                  <SelectTrigger className="w-full bg-white border mt-1">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((item) => (
                      <SelectItem
                        key={item._id ?? item.name}
                        value={item._id ?? ""}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-gray-400">
            <Label className="font-bold uppercase">Registeration Time</Label>
            <p className="font-normal">{dateTime}</p>
            <p className="font-normal">{time}</p>
          </div>
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
