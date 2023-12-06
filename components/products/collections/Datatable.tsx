"use client"

import { Collection } from "@/types/collection"
import Checkbox from "../../Checkbox"
import Image from "next/image"
import { useState } from "react"

export default function Datatable({ collections }: { collections: Collection[] }) {

  const [selectedCollections, setSelectedCollections] = useState<boolean[]>(new Array(collections.length).fill(false))

  function StatusText({ status }: { status: string }) {
    const bgColor = status === "draft" ? "bg-sky-500/40" : status === "active" ? "bg-green-500/40" : "bg-red-500/40"
    return (
      <p className={`py-1 px-2.5 text-gray-900 w-min whitespace-nowrap rounded-full capitalize ${bgColor}`}>{status}</p>
    )
  }

  return (
    <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-[10px] text-gray-700 uppercase bg-gray-100 border-t-2 border-b-2 ">
          <tr>
            <th scope="col" className="p-4">
              <Checkbox id="select-all-products" label="" checked={selectedCollections.every(e => e)} onChange={e => setSelectedCollections(new Array(collections.length).fill(e.target.checked))} />
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Products
            </th>
            <th scope="col" className="px-6 py-3">
              Product conditions
            </th>
          </tr>
        </thead>

        <tbody className="text-xs">
          {
            collections.map((c, i) => (
              <tr key={c._id} className="bg-white border-b hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <Checkbox id={"select-" + c._id} checked={selectedCollections[i]} label="" onChange={e => {
                    const newSelectProducts = [...selectedCollections]
                    newSelectProducts[i] = e.target.checked
                    setSelectedCollections(newSelectProducts)
                  }} />
                </td>

                <td className="px-6 py-4">
                  {c.title}
                </td>
                <td className="px-6 py-4">
                  {c.products}
                </td>
                <td className="px-6 py-4">
                  <p className="capitalize">
                    {c.conditions.map((condition) => condition.field + " is " + condition.operator + " " + condition.value).join(",\n")}
                  </p>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
