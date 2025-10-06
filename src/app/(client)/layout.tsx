import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import PageTitle from "../components/ui/PageTitle";
import Container from "../components/ui/Container";

export const metadata: Metadata = {
  title: "Ticket Management System",
  description: "this is webapp used for Ticket managment system.",
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
    <div className="flex w-full flex-col min-h-screen">
      <main className="flex-1">
        <ToastContainer position="top-center" autoClose={3000} />
        {children}
      </main>
    </div>
  );
}
