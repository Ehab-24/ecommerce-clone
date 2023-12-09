import React from "react"
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Link from "next/link";
import Heading from "@/components/Heading";

export default function TransfersPage() {
  return (
    <div className="bg-gray-100 min-h-screen h-full p-8">
      <div className=" w-full flex justify-between">
        <Heading>Purchase Orders</Heading>
      </div>
      <div className="h-8" />

      <Card className="flex flex-col items-center justify-center py-16">
        <Image
          src="/orders-home-img.svg"
          width="250"
          height="250"
          alt="No Orders Image"
        />
        <Title>Move inventory between locations</Title>
        <Text className="text-center pb-4 w-96">
          Move and track inventory between your business locations.
        </Text>
        <Text className="">
          To create a transfer you’ll need more than one location.&nbsp;
          <Link href="/setting/locations/new" className="text-blue-700 hover:underline">Add Location</Link>
        </Text>
      </Card>
    </div>
  )
}
