"use client";

import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Datatable from "@/components/products/inventory/Datatable";
import { apiUrl } from "@/lib/utils";
import { Product } from "@/types/product";
import Link from "next/link";
import React from "react";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import FilledButton from "@/components/buttons/FilledButton";

// export const runtime = "edge";

export default function ProductsPage() {
  // const res = await fetch(apiUrl("/api/products"), { cache: "no-cache" });
  // const products: Product[] = await res.json();

  const [products, setProducts] = React.useState<Product[]>([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
        toast.error("Could not load data!");
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className=" mb-8 w-full flex justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Inventory</h1>

        <div className=" flex gap-4">
          <ExportImportButtons />

          <FilledButton>
            <Link href="/products/new">Add Product</Link>
          </FilledButton>
        </div>
      </div>

      {products.length > 0 ? (
        <Datatable products={products} />
      ) : (
        <div className="w-full flex justify-center items-center">
          <p className="text-xl font-bold text-[#1a1a1a]">Loading...</p>
        </div>
      )}
    </div>
  );
}
