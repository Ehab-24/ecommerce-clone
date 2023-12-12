'use client'

import React from "react"
import Input from "@/components/Input"
import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import DatePicker from "@/components/DatePicker"
import OutlinedButtonSmall from "@/components/buttons/OutlinedButtonSmall"
import Select from "@/components/Select"
import { Location } from "@/types/location"
import { IoIosClose, IoIosSearch } from "react-icons/io"
import Spinner from "@/components/Spinner"
import FilledButton from "@/components/buttons/FilledButton"
import { ApiTransfer, ApiTransferSchema } from "@/types/transfer"
import { ZodError } from "zod"
import toast from "react-hot-toast"
import axios from "axios"

export default function CreateTranserForm({ locations }: { locations: Location[] }) {

  const defaultTransfer: ApiTransfer = {
    origin: locations[0]._id,
    destination: locations[0]._id,
    products: [],
    referenceNumber: "",
    status: "draft",
    shipping: {
      carrier: "",
      trackingNumber: "",
    },
    tags: [],
  }

  const [loading, setLoading] = React.useState(false)
  const [transfer, setTransfer] = React.useState<ApiTransfer>(defaultTransfer)

  async function handleSave() {

    setLoading(true)

    try {

      ApiTransferSchema.parse(transfer)
      const { status } = await axios.post("/api/products/transfers", transfer)
      if (status === 201) {
        toast.success("Transfer created successfully!")
        setTransfer(defaultTransfer)
      }

    }
    catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong")
        console.log(error)
      }

    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card className="flex p-4">

        <div className="flex flex-col w-full">
          <SectionTitle title="Origin" />
          <div className="w-min">
            <Select value={transfer.origin} onChange={e => setTransfer({ ...transfer, origin: e.target.value })} options={locations.map(l => ({ label: l.name, value: l._id }))} />
          </div>
        </div>

        <div className="min-h-full w-[1px] bg-gray-300 mx-4" />

        <div className="flex flex-col w-full">
          <SectionTitle title="Destination" />
          <div className="w-min">
            <Select value={transfer.destination} onChange={e => setTransfer({ ...transfer, destination: e.target.value })} options={locations.map(l => ({ label: l.name, value: l._id }))} />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <SectionTitle title="Add Products" />
        <div className=" w-full flex gap-4">
          <Input icon={<IoIosSearch />} id="add-products" label="" placeholder="Search products" />
          <OutlinedButtonSmall onClick={() => { }}>
            Browse
          </OutlinedButtonSmall>
        </div>
      </Card>

      <div className="flex gap-4">
        <Card className="flex flex-col gap-4 p-4 h-min w-full">
          <SectionTitle title="Shipping Details" />
          <DatePicker label="Estimated Arrival Date" date={transfer.shipping.arrivalDate ? new Date(transfer.shipping.arrivalDate) : undefined} setDate={(d) => setTransfer({ ...transfer, shipping: { ...transfer.shipping, arrivalDate: d } })} />
          <Input id="shipping-carrier" label="Shipping carrier" onChange={e => setTransfer({ ...transfer, shipping: { ...transfer.shipping, carrier: e.target.value } })} />
          <Input id="tracking-number" label="Tracking number" onChange={e => setTransfer({ ...transfer, shipping: { ...transfer.shipping, trackingNumber: e.target.value } })} />
        </Card>

        <Card className="p-4 w-full flex gap-4 flex-col">
          <SectionTitle title="Additional details" />
          <AdditionalDetails transfer={transfer} setTransfer={setTransfer} />
        </Card>
      </div>

      <div className="w-full max-w-4xl flex justify-end mb-8">
        {
          loading ? (
            <Spinner />
          ) : (
            <FilledButton disabled={loading} onClick={handleSave}>Save</FilledButton>
          )
        }
      </div>
    </>
  )
}

function AdditionalDetails({ transfer, setTransfer }: { transfer: ApiTransfer, setTransfer: React.Dispatch<React.SetStateAction<ApiTransfer>> }) {

  return (
    <>

      <Input id="reference-number" label="Reference number" value={transfer.referenceNumber} onChange={e => setTransfer({ ...transfer, referenceNumber: e.target.value })} />
      <Input
        id="tags"
        label="Tags"
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