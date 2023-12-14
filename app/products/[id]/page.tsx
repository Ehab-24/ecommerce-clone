import React from "react";
import EditProductForm from "@/components/products/EditProductForm";
import { apiUrl } from "@/lib/utils";
import { Product } from "@/types/product";

export default async function ProductPage({ params }: { params: { id: string } }) {

  const res = await fetch(apiUrl(`/api/products/${params.id}`), { cache: "no-cache" })
  if (!res.ok) {
    throw new Error("Failed to load product")
  }
  const product: Product = await res.json()

  return (
    <div className=" w-full bg-gray-100 items-center flex flex-col">
      <EditProductForm initialProduct={product} />
    </div>
  )
}
