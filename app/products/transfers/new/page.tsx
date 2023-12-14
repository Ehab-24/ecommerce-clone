"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import CreateTransferForm from "@/components/products/transfers/CreateTransferForm";
import { apiUrl } from "@/lib/utils";
import { Location } from "@/types/location";

export default function CreateTransferPage() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(apiUrl("/api/settings/locations"));
      const data = await res.json();
      setLocations(data);
    };

    fetchLocations();
  }, []);

  return (
    <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
      <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
        <div className="flex gap-3 items-center ">
          <Link
            href="/products/transfers"
            className="p-2 rounded-md hover:bg-black/10 transition-all"
          >
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-[#1a1a1a]">Create Transfer</h1>
        </div>

        <CreateTransferForm locations={locations} />
      </div>
    </div>
  );
}
