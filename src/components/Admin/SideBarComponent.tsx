"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import CollapsibleButton from "./CollapsibleButton";
import Link from "next/link";
import { Menu } from "lucide-react";
import { images } from "@/app/Images";
import Icon from "./Icon";
const SideBarComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {/* ==================== MOBILE SIDEBAR ==================== */}
      <div className="block md:hidden">
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: isOpen ? 0 : -260 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed md:static top-0 left-0 h-full w-64 
          bg-gray-100 z-50 shadow-lg md:shadow-none"
        >
          <header
            className="bg-bg-Neutral-color 
          flex justify-around items-center"
          >
            <div className="flex items-center gap-3">
              <Image
                src={images.Logo}
                height={75}
                className="p-2"
                width={75}
                alt="logo"
              />
              <h2 className="flex uppercase text-lg font-bold font-Jost text-main-brand-color tracking-[5px]">
                Menu
              </h2>
            </div>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <IoClose className="w-6 h-6 text-gray-600" />
            </button>
          </header>
          <div className="m-0 p-0">
            <CollapsibleButton title="Manage Complaints">
              <Link
                href="/products/add-product"
                className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
              >
                <Icon iconName={images.complainticon} /> Show All Complaints
              </Link>
              <Link
                href="/products/edit-product"
                className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
              >
                <Icon iconName={images.workingicon} /> Edit Coompaint
              </Link>
            </CollapsibleButton>
            <CollapsibleButton title="Manage Team">
              <Link
                href="/products/add-product"
                className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
              >
                <Icon iconName={images.addnewicon} /> Add New Member
              </Link>
              <Link
                href="/products/edit-product"
                className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
              >
                <Icon iconName={images.complainticon} /> Edit Member
              </Link>
              <Link
                href="/products"
                className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
              >
                <Icon iconName={images.mangetemicon} /> Show Members
              </Link>
            </CollapsibleButton>
          </div>
        </motion.div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <button
          className="md:hidden absolute top-6 left-6 bg-white hover:shadow-xl rounded-full p-2 shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <Menu className={`${!isOpen ? "w-6 h-6" : "hidden"}`} />
        </button>
      </div>

      {/* ==================== DESKTOP SIDEBAR ==================== */}
      <div className="hidden md:block w-72 border md:border-l-2">
        <header className="bg-white border-b shadow-md flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src={images.Logo}
              height={75}
              className="p-2"
              width={75}
              alt="logo"
            />
            <h2 className="hidden md:flex text-xl font-extrabold font-Jost text-main-brand-color tracking-[2px]">
              PRCS
            </h2>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <IoClose className="w-6 h-6" />
          </button>
        </header>

        <div className="">
          <CollapsibleButton title="Manage Complaints">
            <Link
              href="/products/add-product"
              className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
            >
              <Icon iconName={images.complainticon} /> Show All Complaints
            </Link>
            <Link
              href="/products/edit-product"
              className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
            >
              <Icon iconName={images.workingicon} /> Edit Coompaint
            </Link>
          </CollapsibleButton>
          <CollapsibleButton title="Manage Team">
            <Link
              href="/products/add-product"
              className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
            >
              <Icon iconName={images.addnewicon} /> Add New Member
            </Link>
            <Link
              href="/products/edit-product"
              className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
            >
              <Icon iconName={images.complainticon} /> Edit Member
            </Link>
            <Link
              href="/products"
              className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-accent-color/20"
            >
              <Icon iconName={images.mangetemicon} /> Show Members
            </Link>
          </CollapsibleButton>
        </div>
      </div>
    </>
  );
};

export default SideBarComponent;
