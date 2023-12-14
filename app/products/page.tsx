"use client";

import FilledButton from "@/components/buttons/FilledButton";
import Datatable from "@/components/products/Datatable";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import { apiUrl } from "@/lib/utils";
import { Product } from "@/types/product";
import Link from "next/link";
import React from "react";

import { useState, useEffect } from "react";

// export const runtime = "edge";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className=" mb-8 w-full flex justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Products</h1>

        <div className=" flex gap-4">
          <ExportImportButtons />
          <FilledButton>
            <Link href="/products/new">Create Product</Link>
          </FilledButton>
        </div>
      </div>

      <Datatable products={products} />
    </div>
  );
}
