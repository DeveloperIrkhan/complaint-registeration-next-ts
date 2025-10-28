import { IComplaint, IUser } from "@/interfaces/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IComplainstResponse {
  complaints: IComplaint[];
  success?: boolean;
  message?: string;
}
interface IUpdateComplaintResponse {
  complaint: IComplaint;
  success?: boolean;
  message?: string;
}
interface IComplaintResponse {
  message: string;
  success?: boolean;
  registeredComplaint?: IComplaint;
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
    registerComplaint: _builder.mutation<
      {
        success: boolean,
        message: string
        complaint: IComplaint
      },
      FormData>
      ({
        query: (formData) => ({
          url: "/complaints/register",
          method: "POST",
          body: formData
        }),
        invalidatesTags: ["complaints"]
      }
      ),
    sendComplaintEmail: _builder.mutation<
      { success: boolean; message: string },
      { userEmail: string; emailType: string; trackingId: string }
    >({
      query: ({ userEmail, emailType, trackingId }) => ({
        url: "/complaints/email",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, emailType, trackingId })
      })
    }),
    getComplaintById: _builder.query<
      IComplaintResponse,
      { trackingId: string }
    >({
      query: ({ trackingId }) => ({
        url: `/complaints/get-complaint/${trackingId}`,
        method: "GET"
      }),
      providesTags: ["complaints"]
    }),
    updateComplaint: _builder.mutation<
      IUpdateComplaintResponse,
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
  useUpdateComplaintMutation,
  useSendComplaintEmailMutation
} = createComplaintsAPI;
