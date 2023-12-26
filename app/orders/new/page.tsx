"use client";

import React, { useState } from "react";

import SectionTitle from "@/components/SectionTitle";
import InputSearch from "@/components/InputSearch";
import Heading from "@/components/Heading";

import Link from "next/link";

import { CustomItem } from "@/types/customItem";

import { FaArrowLeft } from "react-icons/fa";
import AddCustomItem from "@/components/modals/orders/AddCustomItem";

import { FaTrashCan } from "react-icons/fa6";
import Input from "@/components/Input";
import Card from "@/components/Card";
import AddNotesModal from "@/components/modals/general/AddNotesModal";
import CustomerPopover from "@/components/popovers/Customer";
import BrowseProductsDialog from "@/components/BrowseProductsDialog";
import FilledButton from "@/components/buttons/FilledButton";
import { ApiOrder, ApiOrderSchema } from "@/types/order";
import toast from "react-hot-toast";
import axios from "axios";
import { ZodError } from "zod";
import Spinner from "@/components/Spinner";

const ItemTile = ({ order, setOrder, item }: { order: ApiOrder, item: CustomItem, setOrder: React.Dispatch<React.SetStateAction<ApiOrder>> }) => {
  return (
    <tr className="text-sm text-neutral-700 border-t border-neutral-300">
      <td className="pl-4 py-4">{item.name}</td>
      <td>
        <Input
          id="quantity"
          type="number"
          value={item.quantity}
          onChange={(e: any) => setOrder({ ...order, customItems: order.customItems.map(ci => ci.name === item.name ? ({ ...ci, quantity: Number(e.target.value) }) : ci) })}
          className="border border-neutral-300 rounded-lg text-sm w-24"
        />
      </td>
      <td className="pl-2">Rs. {(item.price ?? 0) * item.quantity}</td>
      <td>
        <button
          className="hover:bg-neutral-100 rounded-md"
          onClick={() => setOrder({ ...order, customItems: order.customItems.filter(ci => ci.name !== item.name) })}
        >
          <FaTrashCan className="text-sm text-neutral-600" />
        </button>
      </td>
    </tr>
  );
};

const OrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<ApiOrder>(defaultOrder);

  const addItem = (item: CustomItem) => {
    setOrder({ ...order, customItems: [...order.customItems, item] });
  };

  async function handleSave() {
    setLoading(true);

    try {

      const result = ApiOrderSchema.parse(order);
      const { status } = await axios.post(`/api/orders`, result);

      if (status === 201) {
        toast.success("Order created successfully!");
        setOrder(defaultOrder);
      }
    } catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen md:p-5 md:w-[100%] flex flex-col lg:px-[20%]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 p-5 md:p-0">
          <Link href="/orders">
            <FaArrowLeft className="text-2xl text-neutral-800 rounded-md p-1 hover:bg-neutral-200" />
          </Link>
          <Heading className="!pb-0.5">Create Order</Heading>
        </div>

        <Card className="!p-0">
          <div className="flex px-4 pt-4 justify-between align-middle">
            <SectionTitle title="Order Information" />

            <AddCustomItem addItem={addItem} />
          </div>

          <div className="flex justify-between gap-2 px-4 pb-4">
            <InputSearch placeholder="Search for a product" />
            <BrowseProductsDialog setProducts={ps => setOrder({ ...order, products: ps.map(p => ({ _id: p._id, quantity: 1, price: p.price, physical: p.isPhysicalProduct, weight: p.weight, weightUnit: p.weightUnit })) })} />
          </div>

          {order.customItems && order.customItems.length > 0 && (
            <table className="w-full">
              <thead>
                <tr className="text-sm text-neutral-500">
                  <th className="text-left w-[60%] pl-4 pb-2">Product</th>
                  <th className="text-left w-[25%]">Quantity</th>
                  <th className="text-center w-[10%]">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.customItems.map((item, index) => (
                  <ItemTile key={index} item={item} order={order} setOrder={setOrder} />
                ))}

                {order.products.map((product, index) => (
                  <ItemTile
                    key={index}
                    order={order}
                    setOrder={setOrder}
                    item={product}
                  />
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <div className="bg-white md:rounded-xl shadow-sm shadow-neutral-400">
          <div className="p-4">
            <SectionTitle title="Payment" />
            <div className="flex p-4 gap-2 md:gap-0 text-sm border text-gray-500 border-gray-200 rounded-xl">
              <div className="flex flex-col gap-2 flex-1 justify-between">
                <p className="text-black">Subtotal</p>
                <p>Add discount</p>
                <p>Add shipping or delivery</p>
                <p>Estimated tax</p>

                <p className="font-semibold text-black">Total</p>
              </div>

              <div className="flex flex-col gap-2 flex-2 justify-between">
                <p>-</p>
                <p>-</p>
                <p>-</p>
                <p>Not calculated</p>

                <p className="font-semibold text-black">
                  {order.customItems.map((item) => (item.price ?? 0) * item.quantity)}
                </p>
              </div>

              <div className="flex flex-col flex-1 gap-2 items-end justify-between">
                <p>Rs 0.0</p>
                <p>Rs 0.0</p>
                <p>Rs 0.0</p>
                <p>Rs 0.0</p>

                <p className="font-semibold text-black">Rs 0.0</p>
              </div>
            </div>
          </div>

          <div className="p-4 text-sm bg-neutral-100 md:rounded-b-xl">
            <p>Add a product to calculate total and view payment options.</p>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex justify-between align-middle">
            <SectionTitle title="Notes" />
            <AddNotesModal defaultValue={order.note} onSave={n => setOrder({ ...order, note: n })} />
          </div>

          {order.note ? (
            <div
              className="flex justify-between items-center gap-2"
            >
              <p className="text-sm">{order.note}</p>
              <button
                className="hover:bg-neutral-100 rounded-md"
              >
                <FaTrashCan className="text-sm text-neutral-600" />
              </button>
            </div>
          ) : (
            <div className="text-sm">No notes</div>
          )}
        </Card>

        <Card className="p-4">
          <div className="flex justify-between align-middle">
            <SectionTitle title="Customer" />
          </div>

          <CustomerPopover />
        </Card>

        <Card className="p-4">
          <SectionTitle title="Customer" />
          <p className="text-sm font-semibold text-neutral-700">
            Primary Market
          </p>
          <p className="text-xs">Kingdom of Saudi Arabia (SAR riyals)</p>
        </Card>

        <Card className="p-4">
          <SectionTitle title="Tags" />
          <Input id="tags" placeholder="" />
        </Card>
      </div>

      {
        loading ? (

          <div className="w-full h-full grid place-items-center">
            <Spinner />
          </div>
        ) : (
          <div className="self-end md:p-0 p-4 md:my-4">
            <FilledButton onClick={handleSave}>Add order</FilledButton>
          </div>
        )
      }
    </div>
  );
};

export default OrdersPage;


const defaultOrder: ApiOrder = {
  products: [],
  customItems: [],
  referenceNumber: "",
  note: ""
} 
