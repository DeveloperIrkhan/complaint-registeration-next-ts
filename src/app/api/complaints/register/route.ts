import ConnectDbAsync from "@/lib/DbConnection";
import Complaint from "@/models/complaint.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  await ConnectDbAsync();

  try {
    const requestbody = await request.formData();
    const name = requestbody.get("name") as string;
    const email = requestbody.get("email") as string;
    const phone = requestbody.get("phone") as string;
    const designation = requestbody.get("designation") as string;
    const department = requestbody.get("department") as string;
    const complaint = requestbody.get("complaint") as string;

    const newComplaint = await Complaint.create({
      name: name,
      email: email,
      phone: phone,
      designation: designation,
      department: department,
      complaint: complaint
    });
    if (!newComplaint) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "error while registering compalint"
      });
    }

    const complaintId = await Complaint.findById(newComplaint._id).select(
      "-name -email -phone -designation -department -complaint -assignedTo -priority -complaintStatus -registrationTime -completionTime"
    );
    return NextResponse.json({
      status: 201,
      success: true,
      message: "complaint registered",
      complaintId: complaintId
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error while posting data",
      error
    });
  }
};
