import React from "react";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Datatable from "@/components/products/purchase_orders/Datatable";
import { PurchaseOrder } from "@/types/purchaseOrder";
import Link from "next/link";
import FilledButton from "@/components/buttons/FilledButton";
import { apiUrl } from "@/lib/utils";

export default async function PurchaseOrdersPage() {

  const res = await fetch(apiUrl("/api/products/purchase_orders"))
  console.log(res.status)
  if (res.status !== 200) {
    throw new Error("Failed to fetch purchase orders")
  }
  const purchaseOrders: PurchaseOrder[] = await res.json()


  return (
    <div className="bg-gray-100 p-5">
      <div className=" flex items-center justify-between">
        <Heading className="!pb-0">Purchase Orders</Heading>

        <FilledButton>
          <Link href="/products/purchase_orders/new">
            Create Purchase Order
          </Link>
        </FilledButton>
      </div>
      <div className="h-8" />

      {purchaseOrders && purchaseOrders.length > 0 ? (
        <Datatable purchaseOrders={purchaseOrders} />
      ) : (
        <Card className="flex flex-col items-center justify-center py-16">
          <Image
            src="/orders-home-img.svg"
            width="250"
            height="250"
            alt="No Orders Image"
          />
          <Title>Manage your purchase orders</Title>
          <Text className="text-center pb-4 w-96">
            Track and receive inventory ordered from suppliers.
          </Text>

          <FilledButton>
            <Link href="/products/purchase_orders/new">
              Create Purchase Order
            </Link>
          </FilledButton>
        </Card>
      )}
    </div>
  );
}
