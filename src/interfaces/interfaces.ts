import { complaintPriority } from "@/enums/complaintPriority";
import { complaintStatus } from "@/enums/complaintStatus";
import { userRole } from "@/enums/userRole";
import { Types } from "mongoose";

//complaint registration interface
export interface IComplaintModels {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  designation?: string;
  department: string;
  complaint: string;
  assignedTo?: Types.ObjectId | null;
  priority?: complaintPriority;
  complaintStatus?: complaintStatus;
  registrationTime: Date;
  completionTime?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IComplaint {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  designation?: string;
  department: string;
  complaint: string;
  assignedTo?: string | null;
  priority?: complaintPriority;
  complaintStatus?: complaintStatus;
  registrationTime: string;
  completionTime?: string | null;
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: userRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITask {
  complaint: Types.ObjectId;
  assignedBy: Types.ObjectId;
  assignedTo: Types.ObjectId;
  status: complaintStatus;
  notes?: string;
  completedAt?: Date;
}

