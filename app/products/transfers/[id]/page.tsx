'use client'

import React from "react"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import Input from "@/components/Input"
import DatePicker from "@/components/DatePicker"
import { IoIosClose, IoIosSearch } from "react-icons/io"
import OutlinedButtonSmall from "@/components/buttons/OutlinedButtonSmall"
import Select from "@/components/Select"
import { Transfer } from "@/types/transfer"
import { Location } from "@/types/location"
import StatusText from "@/components/products/StatusText"
import FilledButtonSmall from "@/components/buttons/FilledButtonSmall"

export default function TransferPage() {

  const [transfer, setTransfer] = React.useState<Transfer>({
    _id: "1234567890",
    origin: {
      name: "Store",
      address: "1234 Main St",
      city: "San Francisco",
      postalCode: "94111",
      country: "US",
      phone: "1234567890",
      status: "active",
      fulfilOrders: true,
    },
    destination: {
      name: "Store",
      address: "1234 Main St",
      city: "San Francisco",
      postalCode: "94111",
      country: "US",
      phone: "1234567890",
      status: "active",
      fulfilOrders: true,
    },
    status: "draft",
    products: [],
    referenceNumber: "1234567890",
    tags: ["some", "tags"],
    shipping: {
      arrivalDate: new Date(),
      carrier: "USPS",
      trackingNumber: "1234567890",
    }
  });

  const locations: Location[] = [
    {
      _id: "1234567891",
      name: "Store",
      address: "1234 Main St",
      city: "San Francisco",
      postalCode: "94111",
      country: "US",
      phone: "1234567890",
      status: "active",
      fulfilOrders: true,
    },
    {
      _id: "1234567890",
      name: "Warehouse",
      address: "1234 Main St",
      city: "San Francisco",
      postalCode: "94111",
      country: "US",
      phone: "1234567890",
      status: "inactive",
      fulfilOrders: false,
    }
  ]

  return (
    <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
      <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
        <div className="flex gap-3 items-center justify-between">

          <div className="flex gap-4 items-start">
            <Link href="/products/gift_cards" className="p-2 rounded-md hover:bg-black/10 transition-all">
              <FaArrowLeft className="text-sm text-[#1a1a1a]" />
            </Link>
            <h1 className="text-xl font-bold text-neutral-800 flex gap-2 items-center">
              #{transfer.referenceNumber}
              <StatusText status={transfer.status} />
            </h1>
          </div>

          <div className="flex gap-4">
            <OutlinedButtonSmall onClick={() => { }}>
              Delete
            </OutlinedButtonSmall>
            <OutlinedButtonSmall onClick={() => { }}>
              Duplicate
            </OutlinedButtonSmall>

            {
              transfer.status === "draft" ? (
                <FilledButtonSmall onClick={() => setTransfer({ ...transfer, status: "pending" })}>
                  Mark as Pending
                </FilledButtonSmall>
              ) : (

                <FilledButtonSmall onClick={() => { }}>
                  Recieve Inventory
                </FilledButtonSmall>
              )
            }
          </div>

        </div>

        <Card className="flex p-4">
          <div className="flex flex-col w-full">
            <SectionTitle title="Origin" />
            <div className="w-min">
              <Select label="" onChange={e => setTransfer({ ...transfer, origin: locations.find(l => l._id === e.target.value)! })} options={locations.map(l => ({ label: l.name, value: l._id! }))} />
            </div>
          </div>

          <div className="min-h-full w-[1px] bg-gray-300 mx-4" />

          <div className="flex flex-col w-full">
            <SectionTitle title="Destination" />
            <div className="w-min">
              <Select label="" onChange={e => setTransfer({ ...transfer, destination: locations.find(l => l._id === e.target.value)! })} options={locations.map(l => ({ label: l.name, value: l._id! }))} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle title="Add Products" />
          <div className=" w-full flex gap-4">
            <Input icon={<IoIosSearch />} id="add-products" placeholder="Search products" />
            <OutlinedButtonSmall onClick={() => { }}>
              Browse
            </OutlinedButtonSmall>
          </div>
        </Card>

        <div className="flex gap-4">
          <Card className="flex flex-col gap-4 h-min w-full">
            <SectionTitle title="Shipping Details" />
            <DatePicker value={transfer.shipping.arrivalDate} label="Estimated Arrival Date" />
            <Input id="shipping-carrier" value={transfer.shipping.carrier} label="Shipping carrier" onChange={e => setTransfer({ ...transfer, shipping: { ...transfer.shipping, carrier: e.target.value } })} />
            <Input id="shipping-tracking-number" value={transfer.shipping.trackingNumber} label="Tracking number" onChange={e => setTransfer({ ...transfer, shipping: { ...transfer.shipping, trackingNumber: e.target.value } })} />
          </Card>

          <Card className="p-4 w-full flex gap-4 flex-col">
            <SectionTitle title="Additional details" />
            <AdditionalDetails transfer={transfer} setTransfer={setTransfer} />
          </Card>
        </div>

      </div>
    </div>
  )
}

function AdditionalDetails({ transfer, setTransfer }: { transfer: Transfer, setTransfer: React.Dispatch<React.SetStateAction<Transfer>> }) {

  return (
    <>

      <Input id="reference-number" value={transfer.referenceNumber} label="Reference number" />
      <Input
        id="tags"
        label={`Tags (${transfer.tags.length})`}
        onKeyDown={(e) => {
          const value = e.currentTarget.value;
          if (e.key === "Enter" && value !== "") {
            setTransfer({ ...transfer, tags: [...transfer.tags, value] });
            e.currentTarget.value = "";
          }
        }}
      />

      <div className="flex gap-2">
        {transfer.tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 w-min whitespace-nowrap text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}{" "}
            <button
              onClick={() =>
                setTransfer({ ...transfer, tags: transfer.tags.filter((t) => t !== tag) })
              }
            >
              <IoIosClose size={20} />
            </button>
          </div>
        ))}
      </div>

    </>
  )
}
