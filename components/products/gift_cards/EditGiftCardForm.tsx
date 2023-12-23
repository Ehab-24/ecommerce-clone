'use client'

import React from "react";
import Link from "next/link"
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import StatusText from "@/components/StatusText"
import Card from "@/components/Card"
import Text from "@/components/Text";
import SectionTitle from "@/components/SectionTitle";
import Input from "@/components/Input";
import { ApiGiftCardSchema, GiftCard } from "@/types/giftCard";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import Spinner from "@/components/Spinner";
import FilledButton from "@/components/buttons/FilledButton";
import axios from "axios";


export default function EditGiftCardForm({ initialGiftCard }: { initialGiftCard: GiftCard }) {

  const [card, setCard] = React.useState<GiftCard>(initialGiftCard)
  const [loading, setLoading] = React.useState(false)

  async function handleSave() {

    setLoading(true)

    try {

      ApiGiftCardSchema.parse(card)
      const { status } = await axios.put(`/api/products/gift_cards/${card._id}`, card)
      if (status === 200) {
        toast.success("Gift card saved!")
      }

    }
    catch (error) {
      if (error instanceof ZodError) {
        toast.error((error as ZodError).errors[0].message);
      } else {
        toast.error("Something went wrong");
        console.log(error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex px-4 my-8 flex-col gap-6 w-full max-w-4xl">
      <div className="flex gap-3 items-center ">
        <Link href="/products/gift_cards" className="p-2 rounded-md hover:bg-black/10 transition-all">
          <IoIosArrowRoundBack className="text-sm text-[#1a1a1a]" />
        </Link>
        <h1 className="text-xl font-bold text-neutral-800 flex gap-2 items-center">
          {card.code.substring(card.code.length - 4)}
          <StatusText status={card.status} />
        </h1>
      </div>

      <div className="w-full flex flex-col 2xl:flex-row justify-center gap-4">
        <div className="flex flex-col 2xl:w-2/3 w-full gap-4">
          <Card className=" flex p-4 flex-col">
            <div className="flex w-full justify-between">
              <p className="font-bold text-gray-900">•••• •••• •••• {card.code.substring(card.code.length - 4)}</p>
              <CiEdit size={24} />
            </div>

            <div className="flex w-full mt-4">
              <div className=" flex flex-col gap-1 w-full">
                <Text className="font-bold text-gray-900" >Expiration date</Text>
                <Text>{card.expiresAt || "No expiry"}</Text>
              </div>
              <div className=" flex flex-col gap-1 w-full">
                <Text className="font-bold text-gray-900" >Recipient</Text>
                <Text>None</Text>
              </div>
            </div>
          </Card>

          <Card className="flex p-4 w-full">
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
          <Card className="flex p-4 flex-col w-full">
            <SectionTitle title="Created by" />
            <Text>{card.createdBy.name}</Text>

            <div className="h-4" />

            <SectionTitle title="Customer" />
            {/*TODO: replace with a select popover with actual customers*/}
            <Input id="customer" icon={<IoIosSearch size={16} />} placeholder="Search or create customer" onChange={e => setCard({ ...card, customer: e.target.value })} />
          </Card>

          <Card className="flex p-4 flex-col w-full">
            <SectionTitle title="Internal notes" />
            <Input id="internal-notes" value={card.internalNotes} onChange={e => setCard({ ...card, internalNotes: e.target.value })} />
          </Card>

        </div>
      </div>

      <div className="w-full max-w-4xl flex justify-end mb-8">
        {
          loading ? (
            <Spinner />
          ) : (
            <FilledButton disabled={loading || card === initialGiftCard} onClick={handleSave}>Save</FilledButton>
          )
        }
      </div>

    </div>
  )
}
