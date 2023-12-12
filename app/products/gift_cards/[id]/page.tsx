'use client'

import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import { IoIosSearch } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import StatusText from "@/components/products/StatusText"
import Card from "@/components/Card"
import Text from "@/components/Text";
import SectionTitle from "@/components/SectionTitle";
import Input from "@/components/Input";
import { GiftCard } from "@/types/giftCard";

export default function GiftCardPage() {

  const card: GiftCard = {
    _id: '1',
    code: 'GIFT123',
    status: 'active',
    initialValue: 50,
    hasExpiry: true,
    createdBy: {
      name: "John Doe",
    },
    customer: 'CustomerID123',
    internalNotes: 'Birthday gift for a loyal customer',
    expiresAt: new Date('2024-12-31'),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
      <div className="max-w-4xl w-full flex flex-col gap-6 p-8 ">
        <div className="flex gap-3 items-center ">
          <Link href="/products/gift_cards" className="p-2 rounded-md hover:bg-black/10 transition-all">
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-neutral-800 flex gap-2 items-center">
            {card.code.substring(card.code.length - 4)}
            <StatusText status={card.status} />
          </h1>
        </div>

        <div className="w-full flex flex-col 2xl:flex-row justify-center gap-4">
          <div className="flex flex-col 2xl:w-2/3 w-full gap-4">
            <Card className=" flex flex-col">
              <div className="flex w-full justify-between">
                <p className="font-bold text-gray-900">•••• •••• •••• {card.code.substring(card.code.length - 4)}</p>
                <CiEdit size={24} />
              </div>

              <div className="flex w-full mt-4">
                <div className=" flex flex-col gap-1 w-full">
                  <Text className="font-bold text-gray-900" >Expiration date</Text>
                  <Text>{card.expiresAt?.toISOString().substring(0, 10) ?? "None"}</Text>
                </div>
                <div className=" flex flex-col gap-1 w-full">
                  <Text className="font-bold text-gray-900" >Recipient</Text>
                  <Text>None</Text>
                </div>
              </div>
            </Card>

            <Card className="flex w-full">
              <div className="flex flex-col w-full">
                <Text>Current Balance</Text>
                <p className="text-xl text-gray-900 font-bold">$ {card.initialValue}</p>
              </div>
              <div className="flex flex-col w-full">
                <Text>Initial Balance</Text>
                <p className="text-xl text-gray-900 font-bold">$ {card.initialValue}</p>
              </div>
            </Card>
          </div>

          <div className="flex flex-col 2xl:w-1/3 w-full gap-4">
            <Card className="flex flex-col w-full">
              <SectionTitle title="Created by" />
              <Text>{card.createdBy.name}</Text>

              <div className="h-4" />

              <SectionTitle title="Customer" />
              <Input id="customer" icon={<IoIosSearch size={16} />} placeholder="Search or create customer" />
            </Card>

            <Card className="flex flex-col w-full">
              <SectionTitle title="Internal notes" />
              <Input id="internal-notes" value={card.internalNotes} onChange={() => { }} />
            </Card>
          </div>

        </div>
      </div>
    </div>

  )
}
