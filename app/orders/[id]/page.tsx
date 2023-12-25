"use client";

import { Order } from "@/types/order";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { FaArchive, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Heading from "@/components/Heading";
import MoreActionsPopover from "@/components/orders/single/MoreActionsPopover";
import OutlinedButton from "@/components/buttons/OutlinedButton";

import moment from "moment";
import Card from "@/components/Card";
import { FaPencil } from "react-icons/fa6";

import Input from "@/components/Input";
import { IoIosClose } from "react-icons/io";
import { CiReceipt } from "react-icons/ci";
import FilledButton from "@/components/buttons/FilledButton";
import { Receipt } from "lucide-react";
import { PiImageThin } from "react-icons/pi";

import Image from "next/image";

const SingleOrder = () => {
  const [order, setOrder] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    setOrder({
      _id: "1",
      customer: {
        firstName: "John",
        lastName: "Doe",
        email: "ajwadalam2@gmail.com",
        phone: "03001234567",
        addresses: [
          {
            address: "House 123",
            city: "Islamabad",
            country: "Pakistan",
            postalCode: "44000",
            apartment: "House",
          },
        ],
      },
      total: 100,
      createdAt: "2021-09-22",
      status: "Draft",
      payment_status: "Unpaid",
      fulfillment_status: "Unfulfilled",
      items: [
        {
          _id: "1",
          title: "Product 1",
          price: 50,
          quantity: 1,
          sku: "123",
        },
        {
          _id: "2",
          title: "Product 2",
          price: 50,
          quantity: 1,
          sku: "123",
        },
      ],
      delivery: {
        status: "Not delivered",
        method: "Standard",
      },
      tags: ["Drafts", "Unpaid", "Unfulfilled"],
      date: "2021-09-22",
      channel: "Online Store",
    });
  }, []);

  const addTag = (tag: string) => {
    setOrder((prev: any) => ({ ...prev, tags: [...prev.tags, tag] }));
  };

  return (
    <div className="min-h-screen md:p-5 md:w-[100%] lg:px-[20%]">
      <div className="flex flex-col sm:flex-row gap-4 justify-between p-5 md:p-0 md:pb-5">
        <div className="flex gap-4">
          <Link href="/orders">
            <FaArrowLeft className="text-xs mt-2.5 text-neutral-800" />
          </Link>
          <div>
            <div className="flex gap-4 items-center">
              <Heading>#{id}</Heading>
              <div className="flex items-center rounded-xl px-2 py-0.5 gap-2 bg-gray-300">
                <span className="rounded-full outline-1 p-1 bg-gray-500"></span>
                <p className="text-gray-500 text-xs font-semibold">
                  {order?.payment_status}
                </p>
              </div>
              <div className="flex items-center rounded-xl px-2 py-0.5 gap-2 bg-yellow-100">
                <span className="rounded-full outline-1 p-1 bg-yellow-500"></span>
                <p className="text-gray-500 text-xs font-semibold">
                  {order?.fulfillment_status}
                </p>
              </div>
            </div>
            <p className="text-xs py-1 text-neutral-500">
              {moment(order.date).format("MMM DD, YYYY")}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center justify-end">
          <OutlinedButton>Refund</OutlinedButton>
          <Link href={`/orders/${id}/edit`}>
            <OutlinedButton>Edit</OutlinedButton>
          </Link>
          <MoreActionsPopover />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
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
                <p>{order.customer?.addresses[0].address}</p>
              </div>

              {order.items?.map((product: any) => (
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
                  <p>{order.items?.length}</p>
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
              {order.customer?.note
                ? order.customer?.note
                : "No notes from customer"}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex gap-4 flex-col justify-between text-sm text-gray-600">
              <div>
                <p className="text-gray-800 font-medium py-1">Customer</p>
                <p className=" hover:underline cursor-pointer text-blue-600">
                  {order.customer?.firstName} {order.customer?.lastName}
                </p>
                <p className="">{order.customer?.email}</p>
              </div>

              <div>
                <p className="text-gray-800 font-medium py-1">
                  Contact information
                </p>
                <p className="">{order.customer?.email}</p>
                <p className="">{order.customer?.phone}</p>
              </div>

              <div>
                <p className="text-gray-800 font-medium py-1">
                  Shipping address
                </p>
                <p className="">{order.customer?.addresses[0]?.address}</p>
                <p className="">{order.customer?.addresses[0]?.city}</p>
                <p className="">{order.customer?.addresses[0]?.country}</p>
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
                  addTag(e.currentTarget.value);
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
    </div>
  );
};

export default SingleOrder;
