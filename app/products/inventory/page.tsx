"use client";

import Datatable from "@/components/products/inventory/Datatable";
import { apiUrl } from "@/lib/utils";
import { Product } from "@/types/product";
import Link from "next/link";
import React from "react";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import FilledButton from "@/components/buttons/FilledButton";

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
        <h1 className="text-xl font-bold text-[#1a1a1a]">Inventory</h1>

        <div className=" flex gap-4">
          <ExportImportButtons />

          <FilledButton>
            <Link href="/products/new">View Products</Link>
          </FilledButton>
        </div>
      </div>

      <Datatable products={products} />
    </div>
  );
}
