import type { Metadata } from "next";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import SideBarComponent from "@/components/Admin/SideBarComponent";
import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import { images } from "@/app/Images";

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
    <div className="flex min-h-screen">
      <ToastContainer autoClose={10} position="top-center" />
      <SideBarComponent />
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center py-1 px-4 shadow-md md:ml-0 ml-7">
          <div className="ml-3">
            <Image
              src={images.Logo}
              height={75}
              className="p-2"
              width={75}
              alt="logo"
            />
          </div>
          <div className="">
            <PageTitle className="text-center uppercase border-b md:block hidden text-main-brand-color tracking-wider text-shadow-2xs text-shadow-main-brand-color">
              Admin Section
            </PageTitle>
          </div>
          <div className="flex gap-2">
            <button className="custom-button bg-white border border-main-brand-color text-main-brand-color hover:text-white hover:bg-main-brand-color hover:border-white hover:shadow-xl hover:translate-y-0.5 flex gap-3">
              <User /> Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-3">
          <Container className="">{children}</Container>
        </main>
      </div>

      {/* Main Section */}
    </div>
  );
}
