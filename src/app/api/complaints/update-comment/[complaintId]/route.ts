import ConnectDbAsync from "@/lib/DbConnection";
import Complaint from "@/models/complaint.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
    request: NextRequest,
    context: { params: Promise<{ complaintId: string }> }
) => {
    await ConnectDbAsync();
    try {
        const { complaintId } = await context.params;
        const { message, sender } = await request.json();
        console.log(complaintId, message, sender)
        const registeredComplaint = await Complaint.findById(complaintId);
        if (!registeredComplaint) {
            return NextResponse.json({
                success: false,
                message: "Complaint ID doesn't match",
            }, { status: 404 });
        }
        const updatedConversation = await Complaint.findOneAndUpdate(
            { _id: complaintId },
            {
                $push: {
                    complaintStatusMessage: { message, sender },
                },
            },
            { new: true }
        );

        return NextResponse.json({ success: true, complaint: updatedConversation });
    } catch (error) {
        console.error("Send message error:", error);
        return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
    }
}
