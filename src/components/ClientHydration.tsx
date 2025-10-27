"use client";
import { useGetAllComplaintsQuery } from "@/features/apiCalls";
import { useComplaintStore } from "@/features/store";
import React, { useEffect } from "react";
import Spinner from "./Spinner/Spinner";
import { useGetAllUserQuery } from "@/features/UserAPI";
import { useUserStore } from "@/features/UserStore";

const ClientHydration = () => {
  const { complaints, setComplaints } = useComplaintStore();
  const { users, setUsers } = useUserStore();
  const {
    data,
    isLoading: isComplaintsLoading,
    isFetching: isComplaintsFetching
  } = useGetAllComplaintsQuery(undefined, {
    skip: complaints.length > 0
  });
  const {
    data: usersData,
    isLoading: isUserLoading,
    isFetching: isUserFetching
  } = useGetAllUserQuery(undefined, { skip: users.length > 0 });
  useEffect(() => {
    if (data?.complaints) {
      setComplaints(
        [...data?.complaints].sort(
          (a, b) =>
            new Date(b.registrationTime).getTime() -
            new Date(a.registrationTime).getTime()
        )
      );
      console.log("complaints", data?.complaints);
      console.log("sorted complaints", complaints);
    }
  }, [data]);
  useEffect(() => {
    if (usersData?.users) {
      setUsers(usersData.users);
    }
  }, [usersData]);

  const isLoading =
    isUserLoading ||
    isComplaintsLoading ||
    isUserFetching ||
    isComplaintsFetching;
  return <div>{isLoading && <Spinner />}</div>;
};

export default ClientHydration;
