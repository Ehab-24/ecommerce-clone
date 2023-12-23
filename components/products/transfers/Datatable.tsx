"use client"

import Checkbox from "@/components/Checkbox"
import { useState } from "react"
import StatusText from "../../StatusText"
import { useRouter } from "next/navigation"
import { Transfer } from "@/types/transfer"
import CardTopBar from "@/components/CardTopBar"
import { Link } from "lucide-react"
import CardBarButton from "@/components/CardBarButton"

export default function Datatable({ transfers }: { transfers: Transfer[] }) {

  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useState<boolean[]>(new Array(transfers.length).fill(false))

  console.log(transfers)
  return (
    <>
      <div className="border text-xs rounded-xl shadow-sm shadow-black/40 overflow-hidden">

        {transfers.length > 0 && (<>
          <CardTopBar className="bg-white" >
            <CardBarButton className="">Draft</CardBarButton>
            <CardBarButton className="">Pending</CardBarButton>
            <CardBarButton className="">Partial</CardBarButton>
            <CardBarButton className="">Received</CardBarButton>
          </CardTopBar>
          <div className="hidden sm:flex gap-2 p-1.5 border-b text-neutral-600 items-center font-medium">
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
              <div className="hidden sm:flex gap-2 p-1.5 border-b bg-white hover:bg-neutral-100 items-center font-medium hover:cursor-pointer  " key={i} onClick={() => router.push(`/products/transfers/${t._id}`)}>
                <div className="flex-none pl-2"><Checkbox id={"select-" + t._id} checked={selectedProducts[i]} label="" onChange={e => {
                  const newSelectProducts = [...selectedProducts]
                  newSelectProducts[i] = e.target.checked
                  setSelectedProducts(newSelectProducts)
                }} /></div>
                <div className="text-neutral-500 text-sm font-medium hover:underline flex-1">{t.referenceNumber}</div>
                <div className="text-neutral-700 text-sm font-medium flex-1">{t.origin.name}</div>
                <div className="text-neutral-700 text-sm font-medium flex-1">{t.destination.name}</div>
                <div className="text-neutral-700 text-sm font-medium flex-1"><StatusText status={t.status} /></div>
                <div className="text-neutral-700 text-sm font-medium flex-1">0 of 0</div>
                <div className="text-neutral-700 text-sm font-medium flex-1">{t.shipping.arrivalDate ? (new Date(t.shipping.arrivalDate)).toISOString().slice(0, 10) : ""}</div>

              </div>
            ))}
          </div>
        </>
        )}
        {/* Responsive, for mobile view */}
        {
          transfers.map((t, i) => (

            <div className="sm:hidden flex flex-col border-t gap-1 bg-white text-neutral-600 p-4 font-medium cursor-pointer" key={i} onClick={() => router.push(`/products/transfers/${t._id}`)}>
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium text-neutral-900">{t.referenceNumber}</div>
                <div className="text-sm font-medium text-neutral-600"><StatusText status={t.status} /></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-neutral-700">{t.destination.name}</div>
                <div className="text-sm font-medium text-neutral-700">1 of 1</div>
              </div>
            </div>
          ))}
      </div>
    </>
  )

}
