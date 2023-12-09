"use client"

import { Collection } from "@/types/collection"
import Checkbox from "../../Checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Datatable({ collections }: { collections: Collection[] }) {

  const [selectedCollections, setSelectedCollections] = useState<boolean[]>(new Array(collections.length).fill(false))
  const router = useRouter()

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

                <th scope="row" className="px-6 flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {c.title}
                </th>
                <td onClick={() => router.push(`/products/collections/${c._id}`)} className="px-6 py-4 cursor-pointer">
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
