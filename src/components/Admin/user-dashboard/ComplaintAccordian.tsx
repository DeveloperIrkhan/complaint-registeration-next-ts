"use client";
import { complaintStatus } from "@/enums/complaintStatus";
import { IComplaint, IMessages } from "@/interfaces/interfaces";
import React, { FormEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetAllMessagesQuery } from "@/features/ComplaijntAPI";
import { Send } from "lucide-react";
import Spinner from "@/components/Spinner/Spinner";
import Conversation from "@/components/Admin/Conversation";

const ComplaintAccordion = ({
  complaint,
  activeComplaintId,
  setActiveComplaintId,
  handleUpdate,
  handleSend,
  isLoading,
  inputComment,
  setInputComment,
  status,
  setStatus
}: {
  complaint: IComplaint;
  activeComplaintId: string | null;
  setActiveComplaintId: (id: string | null) => void;
  handleUpdate: (e: FormEvent, complaintId: string) => void;
  handleSend: (complaintId: string) => void;
  isLoading: boolean;
  inputComment: string;
  setInputComment: (val: string) => void;
  status: complaintStatus | "";
  setStatus: (val: complaintStatus | "") => void;
}) => {
  // ✅ Hook always runs
  const shouldFetch = activeComplaintId === complaint._id;
  const { data: fetchedMessages, isFetching } = useGetAllMessagesQuery(
    { complaintId: complaint._id },
    { skip: !shouldFetch } // safe toggle
  );

  const dateTime = new Date(complaint.registrationTime).toDateString();
  const time = new Date(complaint.registrationTime).toTimeString();

  return (
    <Accordion
      type="single"
      collapsible
      value={activeComplaintId === complaint._id ? complaint._id : undefined}
      onValueChange={(value) => setActiveComplaintId(value || null)}
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
        }`}
    >
      <AccordionItem value={complaint._id}>
        <AccordionTrigger>
          <div className="flex w-full justify-between">
            <span>{complaint.complaint}</span>
            <span>{complaint.complaintStatus}</span>
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
              {/* ... all your static info ... */}

              {/* ✅ Messages Section */}
              <div className="bg-white rounded-xl shadow-md w-full max-w-2xl mx-auto p-4 flex flex-col">
                <p className="text-xl font-semibold text-gray-800 mb-3">
                  Messages
                </p>

                {shouldFetch ? (
                  isFetching ? (
                    <Spinner />
                  ) : (
                    <Conversation
                      messages={
                        (fetchedMessages?.conversation as IMessages[]) || []
                      }
                    />
                  )
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Open this complaint to view messages.
                  </p>
                )}

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

              {/* Footer */}
              <div className="flex gap-4 text-gray-400 mt-2">
                <Label className="font-bold uppercase">
                  Registration Time:
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
};

export default ComplaintAccordion;
