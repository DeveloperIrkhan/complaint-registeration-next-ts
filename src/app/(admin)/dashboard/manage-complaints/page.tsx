"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import SectionHeading from "@/components/ui/SectionHeading";
import { complaintPriority } from "@/enums/complaintPriority";
import { complaintStatus } from "@/enums/complaintStatus";
import { useComplaintStore } from "@/features/store";
import { Eye } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useUserStore } from "@/features/UserStore";

const Page = () => {
  const { complaints } = useComplaintStore();
  const { users } = useUserStore();

  useEffect(() => {
    console.log(complaints);
  }, [complaints]);
  useEffect(() => {}, [users]);

  return (
    <div className="px-4 h-full w-full flex flex-col">
      <SectionHeading
        title="Manage Complaints"
        lineColor="bg-gray-500"
        subtitle="Admin can manage complaints"
        subtitleColor="text-gray-700"
        textColor="text-gray-500"
      />

      <Table className="">
        <TableCaption>All Complaint register up to date</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {[
              "Name",
              "Assigned To",
              "Status",
              "Priority",
              "Registered",
              "Action"
            ].map((heading) => (
              <TableHead
                key={heading}
                className="w-[100px] font-semibold text-gray-700"
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {complaints.length > 0 ? (
            complaints.map((item, index) => {
              const date = new Date(item.registrationTime).toDateString();
              const assignedUser = users.find((x) => x._id === item.assignedTo);
              return (
                <TableRow key={item._id}>
                  <TableCell className="font-medium max-w-[180px] truncate">
                    {item.name}
                  </TableCell>
                  {/* <TableCell className="max-w-[200px] truncate">
                      {item.complaint}
                    </TableCell> */}
                  <TableCell className="max-w-[160px] truncate">
                    {assignedUser?.name ?? ""}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        item.complaintStatus === complaintStatus.closed ||
                        item.complaintStatus === complaintStatus.resolved
                          ? "bg-green-100 text-green-700"
                          : item.complaintStatus === complaintStatus.in_progress
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.complaintStatus}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        item.priority === complaintPriority.critical
                          ? "bg-red-200 text-red-800"
                          : item.priority === complaintPriority.medium
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </TableCell>

                  <TableCell>{date}</TableCell>

                  <TableCell className="flex justify-center items-center">
                    <Link href={`/dashboard/view-complaint/${item._id}`}>
                      <span className="flex justify-center items-center p-1 rounded-full bg-blue-50 border border-blue-400 hover:bg-blue-600 text-blue-400 hover:text-white w-6 h-6 transition">
                        <Eye size={20} />
                      </span>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No complaints found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
