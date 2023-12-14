import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Heading from "@/components/Heading";
import CreateCollectionForm from "@/components/products/collections/CreateCollectionForm";

export default function NewCollectionPage() {
  return (
    <div className=" w-full bg-gray-100 min-h-screen items-center flex flex-col">
      <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
        <div className="flex gap-3 items-center ">
          <Link
            href="/products"
            className="p-2 rounded-md hover:bg-black/10 transition-all"
          >
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <Heading>Create collection</Heading>
        </div>

        <CreateCollectionForm />
      </div>
    </div>
  );
}
