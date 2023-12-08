'use client'

import React from "react"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import Input from "@/components/Input"
import Text from "@/components/Text"
import Radio from "@/components/Radio"
import DatePicker from "@/components/DatePicker"

export default function CreateGiftCardPage() {

    const [hasExpiry, setHasExpiry] = React.useState<boolean>(false)

    return (
        <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
            <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
                <div className="flex gap-3 items-center ">
                    <Link href="/products/gift_cards">
                        <FaArrowLeft className="text-sm text-[#1a1a1a]" />
                    </Link>
                    <h1 className="text-xl font-bold text-[#1a1a1a]">Create Gift Card</h1>
                </div>

                <Card className="flex flex-col gap-4 p-4">
                    <SectionTitle title="Gift card details" />
                    <Input id="gift-card-code" label="Gift Card Code" />
                    <Input id="initia-value" label="Initial Value" icon={
                        <Text>$</Text>
                    } />
                </Card>

                <Card className="flex flex-col gap-4 p-4">
                    <SectionTitle title="Expiration date" />
                    <Text>
                        Countries have different laws for gift card expiry dates. Check the laws for your country before changing this date.
                    </Text>
                    <Radio name="expiration-date" onChange={e => setHasExpiry(e.target.value === "has-expiration-date")
                    } items={[
                        { label: "No Expiration Date", value: "no-expiration-date", checked: !hasExpiry },
                        { label: "Set Expiration Date", value: "has-expiration-date" },
                    ]} />

                    {
                        hasExpiry && (
                            <DatePicker label="Expires on" />
                        )
                    }
                </Card>


                <Card className="flex flex-col gap-4 p-4">
                    <Input id="customer" label="Customer" />
                </Card>

                <Card className="flex flex-col gap-4 p-4">
                    <Input id="internal-notes" label="Internal notes" />
                </Card>

            </div>
        </div>
    )
}
