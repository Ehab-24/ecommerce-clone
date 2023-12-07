// pages/discounts.tsx
import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import FilledButton from "@/components/buttons/FilledButton";
import TextButton from "@/components/buttons/TextButton";
import OutlinedButtonSmall from "@/components/buttons/OutlinedButtonSmall";
import OutlinedButton from "@/components/buttons/OutlinedButton";

import discoutimage from "@/public/DiscountImage.svg";

const DiscountsPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <Heading>Discounts</Heading>
                <div className="flex justify-center items-center gap-5 mb-5">
                    <button className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Import
                    </button>
                    <button className="select-none rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Create Discount
                    </button>
                </div>
            </div>
            <Card className="flex flex-col items-center justify-center py-16">
                <Image
                    src={discoutimage}
                    width="250"
                    height="250"
                    alt="No Orders Image"
                />
                <Title>Manage discounts and promotions</Title>
                <Text className="text-center pb-4 w-96">
                    Create discount codes and automatic discounts that apply at checkout. You can also use discounts with compare at prices.
                </Text>
                <button className="select-none rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Create Discount
                </button>
            </Card>
            <div className="mt-3 text-sm text-gray-800 flex justify-center items-center">
                Learn more about discounts
            </div>

        </div>
    )
}

export default DiscountsPage

