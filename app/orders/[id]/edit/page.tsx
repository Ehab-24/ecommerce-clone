"use client";

import React, { useState, useEffect } from "react";

import SectionTitle from "@/components/SectionTitle";
import InputSearch from "@/components/InputSearch";
import Heading from "@/components/Heading";

import Link from "next/link";

import { CustomItem } from "@/types/customItem";
import { Product } from "@/types/product";

import { FaArrowLeft } from "react-icons/fa";
import AddCustomItem from "@/components/modals/orders/AddCustomItem";

import { FaTrashCan } from "react-icons/fa6";
import Input from "@/components/Input";
import Card from "@/components/Card";
import BrowseProductsDialog from "@/components/BrowseProductsDialog";
import { Order } from "@/types/order";
import FilledButton from "@/components/buttons/FilledButton";

import { useParams } from "next/navigation";

const ItemTile = ({ item, removeItem }: { item: any; removeItem: any }) => {
  const [quantity, setQuantity] = useState(1);

  const handleRemoveItem = () => {
    removeItem(item);
  };

  return (
    <tr className="text-sm text-neutral-700 border-t border-neutral-300">
      <td className="pl-4 py-4">{item.name}</td>
      <td>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e: any) => setQuantity(e.target.value)}
          className="border border-neutral-300 rounded-lg text-sm w-24"
        />
      </td>
      <td className="pl-2">Rs. {item.price * quantity}</td>
      <td>
        <button
          className="hover:bg-neutral-100 rounded-md"
          onClick={handleRemoveItem}
        >
          <FaTrashCan className="text-sm text-neutral-600" />
        </button>
      </td>
    </tr>
  );
};

const OrdersPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((order) => setOrder(order));
  }, [id]);

  const [products, setProducts] = useState<Product[]>([]);
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);

  const addItem = (item: CustomItem) => {
    setCustomItems([...customItems, item]);
  };

  const removeItem = (item: CustomItem) => {
    setCustomItems(customItems.filter((i) => i !== item));
  };

  return (
    <div className="min-h-screen md:p-5 md:w-[100%] flex flex-col lg:px-[20%]">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-2 p-5 md:p-0">
          <Link href="/orders">
            <FaArrowLeft className="text-2xl mt-1 text-neutral-800 rounded-md p-1 hover:bg-neutral-200" />
          </Link>
          <div>
            <Heading className="">Edit Order</Heading>
            <p>#{id}</p>
          </div>
        </div>

        <Card className="!p-0">
          <div className="flex px-4 pt-4 justify-between align-middle">
            <SectionTitle title="Order Information" />

            <AddCustomItem addItem={addItem} />
          </div>

          <div className="flex justify-between gap-2 px-4 pb-4">
            <InputSearch placeholder="Search for a product" />
            <BrowseProductsDialog setProducts={setProducts} />
          </div>

          {customItems && customItems.length > 0 && (
            <table className="w-full">
              <thead>
                <tr className="text-sm text-neutral-500">
                  <th className="text-left w-[60%] pl-4 pb-2">Product</th>
                  <th className="text-left w-[25%]">Quantity</th>
                  <th className="text-center w-[10%]">Total</th>
                </tr>
              </thead>
              <tbody>
                {customItems.map((item, index) => (
                  <ItemTile key={index} item={item} removeItem={removeItem} />
                ))}

                {products.map((product, index) => (
                  <ItemTile
                    key={index}
                    item={product}
                    removeItem={removeItem}
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
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-black">Subtotal</p>
                <p>Tax</p>
                <p className="font-semibold text-black">Total</p>
              </div>

              <div className="flex flex-col gap-2">
                <p>-</p>
                <p>Not calculated</p>

                <p className="font-semibold text-black">
                  {customItems.map((item) => (item.price || 1) * item.quantity)}
                </p>
              </div>

              <div className="flex flex-col flex-1 gap-2 items-end">
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
          <SectionTitle title="Reason for edit" />
          <Input
            id="reason"
            type="text"
            className="border border-neutral-300 rounded-lg text-sm w-full"
          />
          <p className="text-neutral-700 text-xs py-1">
            Only you and other staff can see this reason.
          </p>
        </Card>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <FilledButton>Save</FilledButton>
      </div>
    </div>
  );
};

export default OrdersPage;
