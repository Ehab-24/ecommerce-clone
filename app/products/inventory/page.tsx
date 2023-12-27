import Datatable, { VariantWithTitle } from "@/components/products/inventory/Datatable";
import { apiUrl } from "@/lib/utils";
import { Product } from "@/types/product";
import Link from "next/link";
import React from "react";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import FilledButton from "@/components/buttons/FilledButton";

export const runtime = "edge"

export default async function InventoryPage() {
  const res = await fetch(apiUrl("/api/products"), { cache: "no-cache" })
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const products: Product[] = await res.json()
  const variants: VariantWithTitle[] = products.flatMap(p => p.variants?.map(v => ({ ...v, title: p.title }) ?? [productToVariant(p)]))

  console.log(variants)

  return (
    <div className="bg-gray-100 min-h-screen md:px-8 py-8">
      <div className=" mb-8 w-full flex justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Inventory</h1>

        <div className=" flex gap-4">
          <ExportImportButtons />

          <FilledButton>
            <Link href="/products">View Products</Link>
          </FilledButton>
        </div>
      </div>

      <Datatable
        initialVariants={variants}
      />
    </div>
  );
}

function productToVariant(p: Product): VariantWithTitle {
  return {
    _id: p._id,
    title: p.title,
    name: p.title,
    values: {},
    trackQuantity: p.trackQuantity,
    continueSellingWhenOutOfStock: p.continueSellingWhenOutOfStock,
    quantity: p.quantity,
    image: p.media?.length > 0 ? p.media[0].url : undefined,
    status: p.status,
    inventoryLevels: p.inventoryLevels
  } as VariantWithTitle
}
