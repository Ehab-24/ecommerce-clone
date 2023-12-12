import Link from "next/link";
import Datatable from "@/components/products/collections/Datatable";
import FilledButton from "@/components/buttons/FilledButton";
import { apiUrl } from "@/lib/utils";
import { Collection } from "@/types/collection";

export default async function CollectionsPage() {
  const res = await fetch(apiUrl("/api/products/collections"), {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const collections: Collection[] = await res.json();

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className=" mb-8 w-full flex justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Collections</h1>

        <FilledButton>
          <Link href="/products/collections/new">Create Collection</Link>
        </FilledButton>
      </div>

      <Datatable collections={collections} />
    </div>
  );
}
