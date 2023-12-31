

"use client"

import Checkbox from "@/components/Checkbox"
import { useState } from "react"
import StatusText from "../StatusText"
import { GiftCard } from "@/types/giftCard"
import { useRouter } from "next/navigation"

export default function Datatable({ giftCards }: { giftCards: GiftCard[] }) {

  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useState<boolean[]>(new Array(giftCards.length).fill(false))

  return (
    <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-[10px] text-gray-700 uppercase bg-gray-100 border-t-2 border-b-2 ">
          <tr>
            <th scope="col" className="p-4">
              <Checkbox id="select-all-purchaseOrders" label="" checked={selectedProducts.every(e => e)} onChange={e => setSelectedProducts(new Array(giftCards.length).fill(e.target.checked))} />
            </th>
            <th scope="col" className="px-6 py-3">
              Code ending
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Customer
            </th>
            <th scope="col" className="px-6 py-3">
              Recipient
            </th>
            <th scope="col" className="px-6 py-3">
              Date issued
            </th>
            <th scope="col" className="px-6 py-3">
              Expires at
            </th>
            <th scope="col" className="px-6 py-3">
              Initial Value
            </th>
          </tr>
        </thead>

        <tbody className="text-xs">
          {
            giftCards.map((gc, i) => (
              <tr key={gc._id} className="bg-white border-b hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <Checkbox id={"select-" + gc._id} checked={selectedProducts[i]} label="" onChange={e => {
                    const newSelectProducts = [...selectedProducts]
                    newSelectProducts[i] = e.target.checked
                    setSelectedProducts(newSelectProducts)
                  }} />
                </td>

                <th scope="row" onClick={() => router.push(`/products/gift_cards/${gc._id}`)} className="px-6 flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
                  {gc.code.substring(gc.code.length - 4)}
                </th>

                <td className="px-6 py-4">
                  <StatusText status={gc.status} />
                </td>
                <td className="px-6 py-4">
                  {gc.customer}
                </td>
                <td className="px-6 py-4">
                  No Recipient
                </td>
                <td className="px-6 py-4">
                  {gc.createdAt.substring(0, 10)}
                </td>
                <td className="px-6 py-4">
                  {gc.expiresAt ? (new Date(gc.expiresAt)).toISOString().slice(0, 10) : ""}
                </td>
                <td className="px-6 py-4">
                  $ {gc.initialValue}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
