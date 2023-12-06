'use client'

import React from "react";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import Sidebar from "./Sidebar";

const ShopifyHeader = () => {

  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-[#1a1a1a] text-white h-12 flex items-center justify-between px-4">
      {/* Logo */}
      <div className="mr-6 hidden md:flex items-center gap-1">
        <Image
          src="/shopify-logo.svg"
          width={20}
          height={20}
          alt="Shopify Logo"
        />
        <Image
          src="/shopify-logo-text.svg"
          width={60}
          height={25}
          alt="Shopify Text Logo"
          className="self-end"
        />
      </div>
      <button onClick={() => setOpen(v => !v)}>
        {open ? <IoMdClose className="text-2xl md:hidden" /> : <IoMdMenu className="text-2xl md:hidden" />}
      </button>

      {/* Search */}
      <div className="flex px-2 border text-sm border-neutral-400 hover:border-white items-center w-[500px] gap-2 rounded-lg bg-[#303030]">
        <AiOutlineSearch className="text-neutral-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-[85%] py-[4px] placeholder-neutral-400 text-white bg-transparent focus:outline-none"
        />
        <span className="text-neutral-400">Ctrl K</span>
      </div>

      {/* Alerts & Admin */}
      <div className="flex items-center">
        <AiOutlineBell className="text-2xl" />
      </div>

      {
        open && (
          <div className="absolute h-screen w-full bg-black/20 z-50 top-12 left-0">
            <Sidebar />
          </div>
        )
      }
    </div>
  );
};

export default ShopifyHeader;
