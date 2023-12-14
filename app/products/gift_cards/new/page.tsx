import React from "react"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import CreateGiftCardForm from "@/components/products/gift_cards/CreateGiftCardForm"

export default function CreateGiftCardPage() {

    return (
        <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
            <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
                <div className="flex gap-3 items-center ">
                    <Link href="/products/gift_cards" className="p-2 rounded-md hover:bg-black/10 transition-all">
                        <FaArrowLeft className="text-sm text-[#1a1a1a]" />
                    </Link>
                    <h1 className="text-xl font-bold text-[#1a1a1a]">Create Gift Card</h1>
                </div>

                <CreateGiftCardForm />
            </div>
        </div>
    )
}
