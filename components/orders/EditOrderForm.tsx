'use client';

import { ApiOrder, Order } from "@/types/order";
import Card from "../Card";
import { FaArchive } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { PiImageThin } from "react-icons/pi";
import FilledButton from "../buttons/FilledButton";
import { CiReceipt } from "react-icons/ci";
import { FaPencil } from "react-icons/fa6";
import { useState } from "react";
import Input from "../Input";
import { IoIosClose } from "react-icons/io";


export default function EditOrderForm({ initialOrder }: { initialOrder: Order }) {


  const [order, setOrder] = useState<ApiOrder>({
    ...initialOrder,
    customer: initialOrder.customer?._id ?? "",
    products: initialOrder.products.map(p => ({
      _id: p._id,
      quantity: p.quantity,
      price: p.price,
      taxable: p.taxable,
      weight: p.weight,
      weightUnit: p.weightUnit,
      physicalProduct: p.physical,
      name: p.name
    }))
  })

  return (

    <div className="flex flex-col sm:flex-row gap-6" >
      <div className="flex-1 flex flex-col gap-6">
        <Card className="p-4 flex flex-col gap-4">
          <div className="flex">
            <div className="flex items-center rounded-lg p-1 px-2 gap-2 bg-yellow-200">
              <FaArchive className="text-yellow-500 text-xs" />
              <p className="text-gray-500 text-xs font-semibold">
                {order?.fulfillment_status}
              </p>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg">
            <div className="p-3 border-b border-gray-300 text-sm text-gray-700">
              <p>Location</p>
              <p>{initialOrder.customer?.addresses[0].address}</p>
            </div>

            {order.products?.map((product: any) => (
              <div
                key={product.title}
                className="flex justify-between items-start p-3 text-sm border-b border-gray-300"
              >
                <div className="flex gap-2">
                  {product.media?.length > 0 ? (
                    <div className="w-10 h-10 rounded-xl overflow-hidden">
                      <Image
                        src={product.media[0].url}
                        alt={product.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  ) : (
                    <Link
                      href={`/products/${product._id}`}
                      className="w-10 h-10 rounded-md overflow-hidden border bg-gray-100 border-gray-300 grid place-items-center"
                    >
                      <PiImageThin size={14} className="text-gray-500" />
                    </Link>
                  )}
                  <div>
                    <Link href={`/products/${product._id}`}>
                      <p className="hover:underline text-blue-500 cursor-pointer font-medium">
                        {product.title}
                      </p>
                    </Link>
                    <p>SKU: {product.sku}</p>
                  </div>
                </div>
                <div>
                  Rs {product.price} x {product.quantity}
                </div>
                <div>
                  Rs {product.price && product.quantity * product.price}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <FilledButton>Fulfill item</FilledButton>
          </div>
        </Card>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex">
            <div className="flex items-center rounded-lg p-1 px-2 gap-2 bg-gray-200">
              <CiReceipt className="text-gray-500 text-sm" />
              <p className="text-gray-500 text-xs font-semibold">
                {order?.payment_status}
              </p>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg">
            <div className="flex justify-between items-start p-3 text-sm border-b border-gray-300 ">
              <div className="flex flex-col gap-2">
                <p>Subtotal</p>
                <p>Tax</p>
                <p className="font-semibold">Total</p>
              </div>

              <div className="flex flex-col gap-2">
                <p>{order.products?.length}</p>
                <p>GST 16%</p>
                <p className="font-semibold"></p>
              </div>

              <div className="flex flex-col gap-2">
                <p>Rs {order.total}</p>
                <p>Rs {order.total && order.total * 0.16}</p>
                <p className="font-semibold">
                  Rs {order.total && order.total + order.total * 0.16}
                </p>
              </div>
            </div>

            <div className="p-3 flex justify-between text-sm text-gray-700">
              <p>Paid by customer</p>
              <p>Rs {order.total}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:w-64 gap-6">
        <Card className="p-4 text-sm text-gray-600">
          <p className="text-gray-800 font-medium py-1 flex justify-between">
            Notes <FaPencil />
          </p>

          <p>
            {initialOrder.customer?.note
              ? initialOrder.customer?.note
              : "No notes from customer"}
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex gap-4 flex-col justify-between text-sm text-gray-600">
            <div>
              <p className="text-gray-800 font-medium py-1">Customer</p>
              <p className=" hover:underline cursor-pointer text-blue-600">
                {initialOrder.customer?.firstName} {initialOrder.customer?.lastName}
              </p>
              <p className="">{initialOrder.customer?.email}</p>
            </div>

            <div>
              <p className="text-gray-800 font-medium py-1">
                Contact information
              </p>
              <p className="">{initialOrder.customer?.email}</p>
              <p className="">{initialOrder.customer?.phone}</p>
            </div>

            <div>
              <p className="text-gray-800 font-medium py-1">
                Shipping address
              </p>
              <p className="">{initialOrder.customer?.addresses[0]?.address}</p>
              <p className="">{initialOrder.customer?.addresses[0]?.city}</p>
              <p className="">{initialOrder.customer?.addresses[0]?.country}</p>
            </div>

            <div>
              <p className="text-gray-800 font-medium py-1">
                Billing address
              </p>
              <p className="text-gray-500">Same as shipping address</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-gray-800 text-sm font-medium py-1">
            Conversion sumarry
          </p>

          <p className="text-sm text-gray-500">
            There aren‘t any conversion details available for this order.
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-gray-800 text-sm font-medium py-1">Tags</p>
          <Input
            id="tags"
            placeholder=""
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(e.currentTarget.value);
                setOrder({ ...order, tags: [...(order.tags ?? []), e.currentTarget.value] });
                e.currentTarget.value = "";
              }
            }}
          />

          <div className="flex flex-wrap gap-2">
            {order.tags?.map((tag: any) => (
              <div
                key={tag}
                className="bg-slate-200 mt-2 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {tag}
                <button onClick={() => console.log("delete tag")}>
                  <IoIosClose size={20} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
