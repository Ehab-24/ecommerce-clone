"use client"

import Checkbox from "@/components/Checkbox"
import { useState } from "react"
import StatusText from "../StatusText"
import { useRouter } from "next/navigation"
import { Transfer } from "@/types/transfer"
import CardTopBar from "@/components/CardTopBar"
import { Link } from "lucide-react"

export default function Datatable({ transfers }: { transfers: Transfer[] }) {

  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useState<boolean[]>(new Array(transfers.length).fill(false))

  console.log(transfers)

  // return (
  //   <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg">
  //     <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
  //       <thead className="text-[10px] text-gray-700 uppercase bg-gray-100 border-t-2 border-b-2 ">
  //         <tr>
  //           <th scope="col" className="p-4">
  //             <Checkbox id="select-all-purchaseOrders" label="" checked={selectedProducts.every(e => e)} onChange={e => setSelectedProducts(new Array(transfers.length).fill(e.target.checked))} />
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Transfer
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Origin
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Destination
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Status
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Recieved
  //           </th>
  //           <th scope="col" className="px-6 py-3">
  //             Expected Arrival
  //           </th>
  //         </tr>
  //       </thead>

  //       <tbody className="text-xs">
  //         {
  //           transfers.map((t, i) => (
  //             <tr key={t._id} className="bg-white border-b hover:bg-gray-50 ">
  //               <td className="w-4 p-4">
  //                 <Checkbox id={"select-" + t._id} checked={selectedProducts[i]} label="" onChange={e => {
  //                   const newSelectProducts = [...selectedProducts]
  //                   newSelectProducts[i] = e.target.checked
  //                   setSelectedProducts(newSelectProducts)
  //                 }} />
  //               </td>

  //               <td onClick={() => router.push(`/products/transfers/${t._id}`)} className="px-6 py-4 cursor-pointer ">
  //                 #{t.referenceNumber}
  //               </td>
  //               <td className="px-6 py-4">
  //                 {t.origin.name}
  //               </td>
  //               <td className="px-6 py-4">
  //                 {t.destination.name}
  //               </td>
  //               <td className="px-6 py-4">
  //                 <StatusText status={t.status} />
  //               </td>
  //               <td className="px-6 py-4">
  //                 0 of 0
  //               </td>
  //               <td className="px-6 py-4">
  //                 {t.shipping.arrivalDate ? (new Date(t.shipping.arrivalDate)).toISOString().slice(0, 10) : ""}
  //               </td>
  //             </tr>
  //           ))
  //         }
  //       </tbody>
  //     </table>
  //   </div>
  // )
  return (
    <div className="border text-xs rounded-xl shadow-sm shadow-black/40 overflow-hidden">
      <CardTopBar />
      <div className="hidden sm:flex gap-2 p-1.5 border-b bg-neutral-50 text-neutral-600 items-center font-medium">
        <div className="flex-none pl-2">
          <Checkbox
            id="select-all"
            label=""
          // checked={selected.length === transfers.length}
          // onChange={toggleSelectAll}
          />
        </div>
        <div className="flex-1">Transfer</div>
        <div className="flex-1">Origin</div>
        <div className="flex-1">Destination</div>
        <div className="flex-1">Status</div>
        <div className="flex-1">Received</div>
        <div className="flex-1">Excepeted arrival</div>
      </div>
      <div>
        {transfers.map((t, i) => (
          <div className="hidden sm:flex gap-2 p-1.5 border-b bg-neutral-50 text-neutral-600 items-center font-medium hover:cursor-pointer  " key={i} onClick={()=>router.push(`/products/transfers/${t._id}`)}>
            <div className="flex-1"><Checkbox id={"select-" + t._id} checked={selectedProducts[i]} label="" onChange={e => {
              const newSelectProducts = [...selectedProducts]
              newSelectProducts[i] = e.target.checked
              setSelectedProducts(newSelectProducts)
            }} /></div>
            <div className="flex-1">{t.referenceNumber}</div>
            <div className="flex-1">{t.origin.name}</div>
            <div className="flex-1">{t.destination.name}</div>
            <div className="flex-1"><StatusText status={t.status} /></div>
            <div className="flex-1">0 of 0</div>
            <div className="flex-1">{t.shipping.arrivalDate ? (new Date(t.shipping.arrivalDate)).toISOString().slice(0, 10) : ""}</div>

          </div>
        ))}
      </div>
    </div>
  )

}
