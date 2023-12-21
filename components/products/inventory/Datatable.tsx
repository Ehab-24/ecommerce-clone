"use client"

import { PiImageThin } from 'react-icons/pi'
import Checkbox from "@/components/Checkbox"
import Image from "next/image"
import { Product, Variant } from "@/types/product"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Text from '@/components/Text'

type VariantWithProductTitle = Variant & { productTitle: string }

export default function Datatable({ products, variants }: { products: Product[], variants: VariantWithProductTitle[] }) {

  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useState<boolean[]>(new Array(products.length).fill(false))

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              SKU
            </th>
            <th scope="col" className="px-6 py-3">
              Unavailable
            </th>
            <th scope="col" className="px-6 py-3">
              Committed
            </th>
            <th scope="col" className="px-6 py-3">
              Available
            </th>
            <th scope="col" className="px-6 py-3">
              On hand
            </th>
            <th scope="col" className="px-6 py-3">
              Incoming
            </th>
          </tr>
        </thead>

        <tbody className="text-xs">
          {
            products.map((p, i) => (
              <tr key={p._id} className="bg-white border-b hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <Checkbox id={"select-" + p._id} checked={selectedProducts[i]} label="" onChange={e => {
                    const newSelectProducts = [...selectedProducts]
                    newSelectProducts[i] = e.target.checked
                    setSelectedProducts(newSelectProducts)
                  }} />
                </td>

                <th scope="row" onClick={() => router.push(`/products/${p._id}`)} className="flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
                  {
                    p.media?.length > 0 ? (p.media.map((m, i) =>
                      <div key={i} className=" aspect-square h-8 bg-gray-200 rounded-md overflow-hidden">
                        <Image width="32" height="32" src={m.url} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                    )) : (
                      <div className="w-12 h-12 text-gray-400 grid place-items-center border-gray-200 border rounded-md">
                        <PiImageThin size={14} />
                      </div>
                    )
                  }
                  <p>{p.title}</p>
                </th>

                <td className="px-6 py-4">
                  {p.hasSku ? p.sku : "No SKU"}
                </td>
                <td className="px-6 py-4">
                  0
                </td>
                <td className="px-6 py-4">
                  0
                </td>
                <td className="px-6 py-4">
                  {p.quantity}
                </td>
                <td className="px-6 py-4">
                  {p.quantity + 0 + 0}
                </td>
                <td className="px-6 py-4">
                  0
                </td>
              </tr>
            ))
          }
          {
            variants.map((v, i) => (
              <tr key={v._id} className="bg-white border-b hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <Checkbox id={"select-" + v._id} checked={selectedProducts[i]} label="" onChange={e => {
                    const newSelectProducts = [...selectedProducts]
                    newSelectProducts[i] = e.target.checked
                    setSelectedProducts(newSelectProducts)
                  }} />
                </td>

                <th scope="row" onClick={() => router.push(`/products/${v._id}`)} className="flex gap-4 items-center xl:min-w-[240px] py-2 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
                  {
                    v.image ? (<div key={i} className=" w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                      <Image width="32" height="32" src={v.image} alt={v.productTitle + v.name} className="w-full h-full object-cover" />
                    </div>
                    ) : (
                      <div className="w-12 h-12 text-gray-400 grid place-items-center border-gray-200 border rounded-md">
                        <PiImageThin size={14} />
                      </div>
                    )
                  }
                  <div className="flex flex-col gap-1">
                    <p>{v.productTitle}</p>
                    <Text className="text-xs w-min whitespace-nowrap py-0.5 px-2 bg-gray-100 rounded-full text-gray-800">{v.name}</Text>
                  </div>
                </th>

                <td className="px-6 py-4">
                  {v.hasSku ? v.sku : "No SKU"}
                </td>
                <td className="px-6 py-4">
                  0
                </td>
                <td className="px-6 py-4">
                  0
                </td>
                <td className="px-6 py-4">
                  {v.quantity}
                </td>
                <td className="px-6 py-4">
                  {/*TODO*/}
                  {0 + 0}
                </td>
                <td className="px-6 py-4">
                  0
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  )
}
