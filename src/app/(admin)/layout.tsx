import type { Metadata } from "next";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import PageTitle from "../components/ui/PageTitle";
import Container from "../components/ui/Container";
import Image from "next/image";
import SideBarComponent from "../components/Admin/SideBarComponent";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Panel | Ticket Management System",
  description: "this is admin panel used for Ticket managment system.",
  icons: {
    icon: "/favicon.ico"
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
        <div className="">{children}</div>
      </main>
    </div>
  );
}
