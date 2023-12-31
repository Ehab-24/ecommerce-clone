import React from "react"
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Link from "next/link";
import Heading from "@/components/Heading";
import LinkMini from "@/components/LinkMini";
import { apiUrl } from "@/lib/utils";
import { Transfer } from "@/types/transfer";
import Datatable from "@/components/products/transfers/Datatable";

export const runtime = "edge"

export default async function TransfersPage() {

  const requests = [
    fetch(apiUrl("/api/settings/locations"), { cache: "no-cache" }),
    fetch(apiUrl("/api/products/transfers"), { cache: "no-cache" }),
  ]

  const [locationsRes, transfersRes] = await Promise.all(requests)
  if (!locationsRes.ok) {
    throw new Error("Failed to fetch locations")
  }
  if (!transfersRes.ok) {
    throw new Error("Failed to fetch transfers")
  }

  const [locations, transfers] = await Promise.all([locationsRes.json(), transfersRes.json()]) as [Location[], Transfer[]]

  return (
    <div className="bg-gray-100 min-h-screen h-full p-8">
      <div className=" w-full flex justify-between">
        <Heading>Transfers</Heading>
      </div>
      <div className="h-8" />

      {
        locations && locations.length > 0 && transfers && transfers.length > 0 ? (
          <Datatable transfers={transfers} />
        ) : (
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
            {
              locations && locations.length > 0 ? (
                <LinkMini href="/products/transfers/new" >
                  Add Transfer
                </LinkMini>
              ) : (
                <Text className="">
                  To create a transfer you’ll need more than one location.&nbsp;
                  <Link href="/setting/locations/new" className="text-blue-700 hover:underline">Add Location</Link>
                </Text>
              )
            }
          </Card>
        )
      }
    </div>
  )
}
