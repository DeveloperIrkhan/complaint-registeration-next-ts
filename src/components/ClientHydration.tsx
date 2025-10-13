"use client"
import { useGetAllComplaintsQuery } from "@/features/apiCalls";
import { useComplaintStore } from "@/features/store";
import React, { useEffect } from "react";
import Spinner from "./Spinner/Spinner";

const ClientHydration = () => {
  const { complaints, setComplaints } = useComplaintStore();

  const { data, isLoading } = useGetAllComplaintsQuery(undefined, {
    skip: complaints.length > 0
  });
  useEffect(() => {
    if (data?.complaints) {
      setComplaints(data?.complaints);
    }
  }, [data]);

  return <div>{isLoading && <Spinner />}</div>;
};

export default ClientHydration;
