

"use client"

import Checkbox from "@/components/Checkbox"
import { useState } from "react"
import StatusText from "../StatusText"
import { GiftCard } from "@/types/giftCard"
import { useRouter } from "next/navigation"
import CardTopBar from "@/components/CardTopBar"
import CardBarButton from "@/components/CardBarButton"
import Image from "next/image"

export default function Datatable({ giftCards }: { giftCards: GiftCard[] }) {

  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useState<boolean[]>(new Array(giftCards.length).fill(false))

  return (
    // <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-xs">
    //   <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
    //     <thead className="text-[10px] text-gray-700 uppercase bg-gray-100 border-t-2 border-b-2 ">
    //       <tr>
    //         <th scope="col" className="p-4">
    //           <Checkbox id="select-all-purchaseOrders" label="" checked={selectedProducts.every(e => e)} onChange={e => setSelectedProducts(new Array(giftCards.length).fill(e.target.checked))} />
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Code ending
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Status
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Customer
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Recipient
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Date issued
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Expires at
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Initial Value
    //         </th>
    //       </tr>
    //     </thead>

    //     <tbody className="text-xs">
    //       {
    //         giftCards.map((gc, i) => (
    //           <tr key={gc._id} className="bg-white border-b hover:bg-gray-50 ">
    //             <td className="w-4 p-4">
    //               <Checkbox id={"select-" + gc._id} checked={selectedProducts[i]} label="" onChange={e => {
    //                 const newSelectProducts = [...selectedProducts]
    //                 newSelectProducts[i] = e.target.checked
    //                 setSelectedProducts(newSelectProducts)
    //               }} />
    //             </td>

    //             <th scope="row" onClick={() => router.push(`/products/gift_cards/${gc._id}`)} className="px-6 flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
    //               {gc.code.substring(gc.code.length - 4)}
    //             </th>

    //             <td className="px-6 py-4">
    //               <StatusText status={gc.status} />
    //             </td>
    //             <td className="px-6 py-4">
    //               {gc.customer}
    //             </td>
    //             <td className="px-6 py-4">
    //               No Recipient
    //             </td>
    //             <td className="px-6 py-4">
    //               {gc.createdAt.substring(0, 10)}
    //             </td>
    //             <td className="px-6 py-4">
    //               {gc.expiresAt ? (new Date(gc.expiresAt)).toISOString().slice(0, 10) : ""}
    //             </td>
    //             <td className="px-6 py-4">
    //               $ {gc.initialValue}
    //             </td>
    //           </tr>
    //         ))
    //       }
    //     </tbody>
    //   </table>
    // </div>
    <>
      <div className="border text-xs rounded-xl shadow-sm shadow-black/40 overflow-x-scroll">
        {giftCards.length > 0 && (<>
          <CardTopBar className="bg-white" >
            <CardBarButton className="">Redeemable</CardBarButton>
            <CardBarButton className="">Full</CardBarButton>
            <CardBarButton className="">Partial</CardBarButton>
            <CardBarButton className="">Empty</CardBarButton>
            <CardBarButton className="">Deactivited</CardBarButton>
          </CardTopBar>
          <div className="hidden sm:flex gap-2 p-1.5 border-b text-neutral-600 items-center font-medium">
            <div className="flex-none pl-2">
              <Checkbox id="select-all-purchaseOrders" label="" checked={selectedProducts.every(e => e)} onChange={e => setSelectedProducts(new Array(giftCards.length).fill(e.target.checked))} />
            </div>
            <div className="flex-1">Code ending</div>
            <div className="flex-1">Status</div>
            <div className="flex-1">Customer</div>
            <div className="flex-1">Recipient</div>
            <div className="flex-1">Date issued</div>
            <div className="flex-1">Expires at</div>
            <div className="flex-1">Current / Initial</div>
          </div>
          <div>
            {giftCards.map((gc, i) => (
              <div className="hidden sm:flex gap-2 p-1.5 border-b bg-white hover:bg-neutral-100 items-center font-medium hover:cursor-pointer  " key={i} onClick={() => router.push(`/products/gift_cards/${gc._id}`)}>
                <div className="flex-none pl-2"><Checkbox id={"select-" + gc._id} checked={selectedProducts[i]} label="" onChange={e => {
                  const newSelectProducts = [...selectedProducts]
                  newSelectProducts[i] = e.target.checked
                  setSelectedProducts(newSelectProducts)
                }} /></div>
                <div className="text-neutral-500 text-sm font-medium flex-1">{gc.code.substring(gc.code.length - 4)}</div>
                <div className="text-neutral-700 text-sm font-medium flex-1"><StatusText status={gc.status} /></div>
                <div className="text-neutral-700 text-sm font-medium flex-1">{gc.customer}</div>
                <div className="text-neutral-700 text-sm font-medium flex-1">No Recipient</div>
                <div className="text-neutral-700 text-sm font-medium flex-1">{gc.createdAt.substring(0, 10)}</div>
                <div className="text-neutral-700 text-sm font-medium flex-1">{gc.expiresAt ? (new Date(gc.expiresAt)).toISOString().slice(0, 10) : ""}</div>
                <div className="text-neutral-700 text-sm font-medium flex-1">$ {gc.initialValue}</div>

              </div>
            ))}
          </div>
        </>
        )}
        {/* Responsive, for mobile view */}
        {
          giftCards.map((gc, i) => (

            <div className="sm:hidden flex justify-between items-center px-4 border-t gap-1 bg-white text-neutral-600 p-4 font-medium cursor-pointer" key={i} onClick={() => router.push(`/products/gift_cards/${gc._id}`)}>
              <div className="flex flex-col justify-between items-start gap-2">
                <div className="flex gap-3 justify-center items-center">
                  <div className="text-xs font-semibold text-neutral-900">{gc.code.substring(gc.code.length - 4)} </div>
                  <div className="text-xs font-semibold text-neutral-900">{gc.createdAt.substring(0, 10)}</div>
                </div>
                <div className="text-xs font-semibold text-[#616161]">{gc.customer !== "" ? "No Customer  " : gc.customer }</div>
                <div className="text-md font-semibold "><StatusText status={gc.status} /></div>
                <div className="text-xs font-semibold text-[#616161]">No Recipient</div>

              </div>
              <div className="flex flex-col justify-end items-end gap-2 ">
                <div className="text-xs font-semibold text-neutral-700">$ {gc.initialValue}.00</div>
                <Image src={"/ReportSvg.svg"} alt={""} width={20} height={20} style={{
                  color : "#616161"
                }} />
              </div>  
            </div>
          ))}
      </div>
    </>
  )
}
