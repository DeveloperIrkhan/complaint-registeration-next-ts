import type { Metadata } from "next";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import { images } from "../Images";
import React from "react";
import ClientHydration from "@/components/ClientHydration";
export const metadata: Metadata = {
  title: "Admin Panel | Complaint Registeration System",
  description: "this is admin panel used for Complaint Registeration System",
  icons: {
    icon: `${images.Logo}`
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ToastContainer autoClose={10} position="top-center" />
      <main className="">
        <ClientHydration />
        <div className="">{children}</div>
      </main>
    </div>
  );
}
