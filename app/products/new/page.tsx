import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Heading from "@/components/Heading";
import CreateProductForm from "@/components/products/CreateProductForm";
import { apiUrl } from "@/lib/utils";
import { Location } from "@/types/location";

export const runtime = "edge"

export default async function NewProductPage() {

  const res = await fetch(apiUrl("/api/settings/locations"), { cache: "no-cache" })
  if (!res.ok) throw new Error("Failed to fetch locations")
  const locations: Location[] = await res.json()

  return (
    <div className=" w-full bg-gray-100 items-center mt-6 md:mt-0 flex flex-col">
      <div className="flex-col max-w-4xl w-full flex gap-6 md:p-8 ">
        <div className="flex flex-col md:flex-row gap-3 items-start  px-4 md:px-0">
          <Link
            href="/products"
            className="p-2 rounded-md hover:bg-black/10 transition-all"
          >
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <Heading>Add Product</Heading>
        </div>

        <CreateProductForm locations={locations} />

      </div>

    </div>
  );
}
