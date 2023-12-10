'use client'

import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import Text from "@/components/Text"
import Input from "@/components/Input"
import Select from "@/components/Select"
import countries from "@/data/countries"
import { AiOutlineSearch } from "react-icons/ai"
import Checkbox from "@/components/Checkbox"
import FilledButton from "@/components/buttons/FilledButtonSmall"
import { Location } from "@/types/location"
import { useState } from "react"

export default function CreateLocationPage() {

  const [location, setLocation] = useState<Location>({
    _id: "1",
    name: "Sample Location",
    country: "Sample Country",
    address: "123 Sample Street",
    city: "Sample City",
    postalCode: "12345",
    phone: {
      number: "123-456-7890",
      countryCode: "US"
    },
    fulfilOrders: true,
    status: "active",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  function handleSave() {
    console.log("Save")
  }

  return (
    <div className=" w-full bg-gray-100 min-h-screen items-center flex flex-col">
      <div className="flex-col max-w-4xl w-full flex gap-6 my-8">

        <div className="flex gap-3 items-center ">
          <Link
            href="/settings/locations"
            className="p-2 rounded-md hover:bg-black/10 transition-all"
          >
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-[#1a1a1a]">
            Add location
          </h1>
        </div>

        <Card className="p-4">
          <SectionTitle title="Location name" />
          <Text className="text-neutral-500 mb-4">Give this location a short name to make it easy to identify. You’ll see this name in areas like orders and products. If this location offers local pickup, it will be visible to your customers at checkout and in notifications.</Text>

          <Input id="location-name" placeholder="Location name" onChange={e => setLocation({ ...location, name: e.target.value })} />
        </Card>

        <Card className="p-4">
          <SectionTitle title="Location name" />
          <Text>Give this location a short name to make it easy to identify. You’ll see this name in areas like orders and products. If this location offers local pickup, it will be visible to your customers at checkout and in notifications.</Text>

          <div className="flex flex-col gap-4 mt-4">
            <Select label="Country/Region" onChange={e => setLocation({ ...location, country: e.target.value })} options={countries} />

            <Input id="supplier-address" icon={<AiOutlineSearch />} label="Address" onChange={e => setLocation({ ...location, address: e.target.value })} placeholder="" />
            <Input id="supplier-apartment" label="Apartment, Suite etc" onChange={e => setLocation({ ...location, apartment: e.target.value })} placeholder="" />

            <div className="flex w-full gap-4">
              <Input id="supplier-city" label="City" onChange={e => setLocation({ ...location, city: e.target.value })} placeholder="" />
              <Input id="supplier-postal-code" label="Postal code" onChange={e => setLocation({ ...location, postalCode: e.target.value })} placeholder="" />
            </div>

            <div className="flex items-end gap-2 w-full">
              <div className="w-full">
                <Input id="supplier-phone-number" label="Phone number" onChange={e => setLocation({ ...location, phone: { ...location.phone, number: e.target.value } })} />
              </div>
              <Select options={countries} onChange={e => setLocation({ ...location, phone: { ...location.phone, countryCode: e.target.value } })} />
            </div>
          </div>

        </Card>

        <Card className="p-4">
          <SectionTitle title="Fulfillment details" />
          <div className="h-4" />
          <Checkbox label="Fulfill online orders from this location" onChange={() => { }} id="fulfill-orders" />
          <Text>Inventory at this location is available for sale online.</Text>
        </Card>

      </div>

      <div className="w-full max-w-4xl flex justify-end mb-8">
        <FilledButton onClick={handleSave}>Save</FilledButton>
      </div>
    </div>

  )
}
