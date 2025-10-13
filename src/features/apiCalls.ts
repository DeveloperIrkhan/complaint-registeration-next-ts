import { IComplaint } from "@/interfaces/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IComplainstResponse {
  complaints: IComplaint[];
}

export const createComplaintsAPI = createApi({
  reducerPath: "",
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
    registerComplaint: _builder.mutation({
      query: ({ complaint }) => ({
        url: "/complaints/register",
        method: "POST",
        body: { complaint }
      }),
      invalidatesTags: ["complaints"]
    }),
    getComplaintById: _builder.query({
      query: (trackingId) => ({
        url: `/complaints/get-complaint/${trackingId}`,
        method: "GET"
      }),
      providesTags: ["complaints"]
    })
  })
});

export const {
  useGetAllComplaintsQuery,
  useRegisterComplaintMutation,
  useGetComplaintByIdQuery
} = createComplaintsAPI;
