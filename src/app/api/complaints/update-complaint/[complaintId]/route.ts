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
    const complaintsId = complaintId.trim();
    const body = await request.json();
    const { priority, assignedTo } = body;
    console.log("complaintsId", complaintsId);
    console.log("priority, assignedTo", priority, assignedTo);
    const registeredComplaint = await Complaint.findById(complaintsId);
    console.log(registeredComplaint);
    if (!registeredComplaint) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Complaint id dosen't matched"
      });
    }
    const updateComplaint = await Complaint.findByIdAndUpdate(
      complaintsId,
      { priority, assignedTo },
      { new: true }
    );
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Complaint updated successfully!",
      complaint: updateComplaint
    });
  } catch (error) {
    console.error("Error fetching complaint:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error while fetching complaint",
      error: (error as Error).message
    });
  }
};
