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

export default function CreateTransferPage() {

  const locations: string[] = ["some", "address"]

  return (
    <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
      <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
        <div className="flex gap-3 items-center ">
          <Link href="/products/gift_cards" className="p-2 rounded-md hover:bg-black/10 transition-all">
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-[#1a1a1a]">Create Transfer</h1>
        </div>

        <Card className="flex p-4">
          <div className="flex flex-col w-full">
            <SectionTitle title="Origin" />
            <div className="w-min">
              <Select label="" onChange={() => { }} options={locations.map(l => ({ label: l, value: l }))} />
            </div>
          </div>

          <div className="min-h-full w-[1px] bg-gray-300 mx-4" />

          <div className="flex flex-col w-full">
            <SectionTitle title="Destination" />
            <div className="w-min">
              <Select label="" onChange={() => { }} options={locations.map(l => ({ label: l, value: l }))} />
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
          <Card className="flex flex-col gap-4 h-min w-full">
            <SectionTitle title="Shipping Details" />
            <DatePicker label="Estimated Arrival Date" />
            <Input id="" label="Shipping carrier" placeholder="" />
            <Input id="" label="Tracking number" placeholder="" />
          </Card>

          <Card className="p-4 w-full flex gap-4 flex-col">
            <SectionTitle title="Additional details" />
            <AdditionalDetails />
          </Card>
        </div>

      </div>
    </div>
  )
}

function AdditionalDetails() {

  const [tags, setTags] = React.useState<string[]>([])

  return (
    <>

      <Input id="reference-number" label="Reference number" />
      <Input
        id="tags"
        label="Tags"
        placeholder=""
        onKeyDown={(e) => {
          const value = e.currentTarget.value;
          if (e.key === "Enter" && value !== "") {
            setTags([...tags, value]);
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="flex gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 w-min whitespace-nowrap text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}{" "}
            <button
              onClick={() =>
                setTags(tags.filter((t) => t !== tag))
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
