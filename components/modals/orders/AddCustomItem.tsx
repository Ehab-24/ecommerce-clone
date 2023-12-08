"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";

const AddCustomItem = ({ addItem }: { addItem: any }) => {
  const weightUnits: string[] = ["kg", "g", "lb", "oz"];

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [taxable, setTaxable] = useState(false);
  const [physical, setPhysical] = useState(false);
  const [weight, setWeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState("kg");

  const handleAddItem = () => {
    addItem({
      name,
      price,
      quantity,
      taxable,
      physical,
      weight,
      weightUnit,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="">
        <span className="text-xs align-top hover:underline hover:text-blue-800 text-blue-600">
          Add Custom Item
        </span>
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Add Custom Item</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex gap-2">
            <Input
              id="name"
              placeholder=""
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-64"
            />

            <Input
              id="price"
              placeholder="0.00"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(e) => {}}
              type="number"
            />

            <Input
              id="quantity"
              placeholder="1"
              label="Quantity"
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Checkbox
              id="taxable"
              label="Item is taxable"
              checked={taxable}
              onChange={(e) => setTaxable(e.target.checked)}
            />
            <Checkbox
              id="physical"
              label="Item is a physical product"
              checked={physical}
              onChange={(e) => setPhysical(e.target.checked)}
            />

            {physical && (
              <div className="flex gap-2 pt-4">
                <Input
                  id="weight"
                  placeholder=""
                  label="Item weight (optional)"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  onKeyDown={(e) => {}}
                  type="number"
                />
                <select
                  className="border border-neutral-400 rounded-lg text-sm px-1 h-9 self-end"
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                >
                  {weightUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <p className="text-sm text-neutral-600">
              Used to calculate shipping rates accurately
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="text-sm border border-neutral-900 shadow-lg p-1 px-2 rounded-lg">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleAddItem}
            className="text-sm border border-neutral-900 bg-neutral-800 text-white shadow-lg p-1 px-2 rounded-lg"
          >
            Add Item
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomItem;
