"use client"

import { Product } from "@/types/product"
import Checkbox from "../Checkbox"
import Image from "next/image"
import { useState } from "react"
import StatusText from "./StatusText"
import { useRouter } from "next/navigation"

export default function Datatable({ products }: { products: Product[] }) {

  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useState<boolean[]>(new Array(products.length).fill(false))

  return (
    <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-[10px] text-gray-700 uppercase bg-gray-100 border-t-2 border-b-2 ">
          <tr>
            <th scope="col" className="p-4">
              <Checkbox id="select-all-products" label="" checked={selectedProducts.every(e => e)} onChange={e => setSelectedProducts(new Array(products.length).fill(e.target.checked))} />
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Inventory
            </th>
            <th scope="col" className="px-6 py-3">
              Sales Channel
            </th>
            <th scope="col" className="px-6 py-3">
              Markets
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Vendor
            </th>
          </tr>
        </thead>

        <tbody className="text-xs">
          {
            products.map((p, i) => (
              <tr key={p._id} onClick={() => router.push(`/products/${p._id}`)} className="bg-white border-b hover:bg-gray-50 cursor-pointer ">
                <td className="w-4 p-4">
                  <Checkbox id={"select-" + p._id} checked={selectedProducts[i]} label="" onChange={e => {
                    const newSelectProducts = [...selectedProducts]
                    newSelectProducts[i] = e.target.checked
                    setSelectedProducts(newSelectProducts)
                  }} />
                </td>

                <th scope="row" className="px-6 flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {
                    p.media.length > 0 && (p.media.map((m, i) =>
                      <div key={i} className=" aspect-square h-8 bg-gray-200 rounded-md overflow-hidden">
                        <Image width="32" height="32" src={m.url} alt={m.altText} className="w-full h-full object-cover" />
                      </div>
                    ))
                  }

                  <p className="ml-4">{p.title}</p>
                </th>

                <td className="px-6 py-4">
                  <StatusText status={p.status} />
                </td>
                <td className="px-6 py-4">
                  {p.quantity} in stock
                </td>
                <td className="px-6 py-4">
                  -
                </td>
                <td className="px-6 py-4">
                  -
                </td>
                <td className="px-6 py-4">
                  {p.productCategory}
                </td>
                <td className="px-6 py-4">
                  {p.vendor}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
