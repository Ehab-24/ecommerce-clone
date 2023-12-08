"use client";

import React, { useState } from "react";

import SectionTitle from "@/components/SectionTitle";
import InputSearch from "@/components/InputSearch";
import Heading from "@/components/Heading";

import Link from "next/link";

import { CustomItem } from "@/types/CustomItem";
import { Product } from "@/types/product";

import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import AddCustomItem from "@/components/modals/orders/AddCustomItem";

import { FaTrashCan } from "react-icons/fa6";
import Input from "@/components/Input";
import Card from "@/components/Card";
import AddNotesModal from "@/components/modals/general/AddNotesModal";
import CustomerPopover from "@/components/popovers/Customer";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [notes, setNotes] = useState<string[]>([]);

  const addItem = (item: CustomItem) => {
    setCustomItems([...customItems, item]);
  };

  const removeItem = (item: CustomItem) => {
    setCustomItems(customItems.filter((i) => i !== item));
  };

  const addNote = (note: string) => {
    setNotes([...notes, note]);
  };

  const removeNote = (note: string) => {
    setNotes(notes.filter((n) => n !== note));
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/orders">
            <FaArrowLeft className="text-sm text-neutral-800" />
          </Link>
          <Heading>Create Order</Heading>
        </div>

        <Card className="!p-0">
          <div className="flex px-4 pt-4 justify-between align-middle">
            <SectionTitle title="Order Information" />

            <AddCustomItem addItem={addItem} />
          </div>

          <div className="flex justify-between gap-2 px-4 pb-4">
            <InputSearch placeholder="Search for a product" />
            <button className="hover:bg-neutral-100 text-sm shadow-sm border border-neutral-100 p-1 px-2 rounded-lg">
              Browse
            </button>
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
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <div className="flex justify-between align-middle">
            <SectionTitle title="Notes" />
            <AddNotesModal addItem={addNote} />
          </div>

          {notes && notes.length > 0 ? (
            <div className="flex flex-col gap-2 p-4">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-2"
                >
                  <p className="text-sm">{note}</p>
                  <button
                    className="hover:bg-neutral-100 rounded-md"
                    onClick={() => removeNote(note)}
                  >
                    <FaTrashCan className="text-sm text-neutral-600" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm">No notes</div>
          )}
        </Card>

        <Card>
          <div className="flex justify-between align-middle">
            <SectionTitle title="Customer" />
          </div>

          <CustomerPopover />
        </Card>

        <Card>
          <SectionTitle title="Customer" />
          <p className="text-sm font-semibold text-neutral-700">
            Primary Market
          </p>
          <p className="text-xs">Kingdom of Saudi Arabia (SAR riyals)</p>
        </Card>

        <Card>
          <SectionTitle title="Tags" />
          <Input id="tags" placeholder="" />
        </Card>
      </div>
    </div>
  );
};

export default OrdersPage;
