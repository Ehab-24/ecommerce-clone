'use client'

import Datatable from "@/components/products/Datatable";
import { apiUrl } from "@/lib/utils";
import { Product } from "@/types/product";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

// export const runtime = "edge";

export default function ProductsPage() {
  // const res = await fetch(apiUrl("/api/products"), {
  //   cache: "no-cache",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // });
  //
  // const products: Product[] = []

  const [products, setProducts] = React.useState<Product[]>([])
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("/api/products")
        console.log(data)
        setProducts(data)
      } catch (error) {
        console.log(error)
        toast.error('Could not load data!')
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className=" mb-8 w-full flex justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Products</h1>

        <div className=" flex gap-4">
          <button className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Export
          </button>
          <button className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Import
          </button>

          <Link href="/products/new">
            <p className="select-none rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Add Product
            </p>
          </Link>
        </div>
      </div>

      <Datatable products={products} />
    </div>
  );
}
