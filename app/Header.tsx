import React from "react";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";

const ShopifyHeader = () => {
  return (
    <div className="bg-[#1a1a1a] text-white py-3 flex items-center justify-between px-4">
      {/* Logo */}
      <div className="mr-6 flex items-center gap-1">
        <img src="/shopify-logo.svg" className="w-5" alt="Shopify Logo" />
        <Image
          src="/shopify-logo-text.svg"
          width={60}
          height={25}
          alt="Shopify Text Logo"
          className="self-end"
        />
      </div>

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
    </div>
  );
};

export default ShopifyHeader;
