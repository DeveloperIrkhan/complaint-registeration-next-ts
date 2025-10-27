import { IComplaint, IUser } from "@/interfaces/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IComplainstResponse {
  complaints: IComplaint[];
  success?: boolean;
  message?: string;
}

interface IComplaintByIdResponse {
  status: number;
  success: boolean;
  message: string;
  registeredComplaint: IComplaint;
}

export const createComplaintsAPI = createApi({
  reducerPath: "complaintsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["complaints"],
  endpoints: (_builder) => ({
    getAllComplaints: _builder.query<IComplainstResponse, void>({
      query: () => ({
        url: "/complaints/get-all-complaints",
        method: "GET"
      }),
      providesTags: ["complaints"]
    }),
    registerComplaint: _builder.mutation<IComplaint, { complaint: IComplaint }>(
      {
        query: ({ complaint }) => ({
          url: "/complaints/register",
          method: "POST",
          body: { complaint }
        }),
        invalidatesTags: ["complaints"]
      }
    ),
    getComplaintById: _builder.query<
      IComplaintByIdResponse,
      { trackingId: string }
    >({
      query: ({ trackingId }) => ({
        url: `/complaints/get-complaint/${trackingId}`,
        method: "GET"
      }),
      providesTags: ["complaints"]
    }),
    updateComplaint: _builder.mutation<
      IComplainstResponse,
      { complaintId: string; priority: string; assignedTo: string }
    >({
      query: ({ complaintId, priority, assignedTo }) => ({
        url: `/complaints/update-complaint/${complaintId}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority, assignedTo })
      }),
      invalidatesTags: ["complaints"]
    })
  })
});

export const {
  useGetAllComplaintsQuery,
  useRegisterComplaintMutation,
  useGetComplaintByIdQuery,
  useUpdateComplaintMutation
} = createComplaintsAPI;
