"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import Datatable from "@/components/products/collections/Datatable";
import FilledButton from "@/components/buttons/FilledButton";
import { apiUrl } from "@/lib/utils";
import { Collection } from "@/types/collection";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const res = await fetch(`/api/collections`);
      const data = await res.json();
      setCollections(data);
    };

    fetchCollections();
  }, []);

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
