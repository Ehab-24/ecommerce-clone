'use client'

import React from "react"
import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import { ApiPurchaseOrder, ApiPurchaseOrderSchema } from "@/types/purchaseOrder"
import { Supplier } from "@/types/supplier"
import Select from "@/components/Select"
import SupplierDialog from "./SupplierDialog"
import DatePicker from "@/components/DatePicker"
import Input from "@/components/Input"
import { IoIosClose, IoIosSearch } from "react-icons/io"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import TitleMini from "@/components/TitleMini"
import AdjustmentsDialog from "./AdjustmentsDialog"
import { Location } from "@/types/location"
import FilledButton from "@/components/buttons/FilledButton"
import axios from "axios"
import toast from "react-hot-toast"
import { ZodError } from "zod"

export default function CreatePurchaseOrderForm({ suppliers, locations, currencies }: { suppliers: Supplier[], locations: Location[], currencies: { label: string, value: string, disabled?: boolean }[] }) {

  const defaultPurchaseOrder: ApiPurchaseOrder = {
    destination: "",
    status: "draft",
    shipping: {
      arrivalDate: new Date(),
      carrier: "",
      trackingNumber: "",
    },
    currency: "",
    products: [],
    total: 46.47,
    referenceNumber: "",
    noteToSupplier: "",
    tags: [],
    supplier: "",
    costAdjustments: [],
  }
  const [purchaseOrder, setPurchaseOrder] = React.useState<ApiPurchaseOrder>(defaultPurchaseOrder);

  async function handleSave() {
    try {
      ApiPurchaseOrderSchema.parse(purchaseOrder)
      const { status } = await axios.post("/api/products/purchase_orders", purchaseOrder)
      if (status === 201) {
        toast.success("Purchase order created successfully!")
        setPurchaseOrder(defaultPurchaseOrder)
      }
      else {
        toast.error("Failed to create purchase order")
      }
    }
    catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message)
      }
      else {
        toast.error("Failed to create purchase order")
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className="flex-col max-w-4xl w-full flex gap-6 my-8">

        <Card className="flex flex-col items-center justify-center p-4">
          <div className="flex w-full h-full gap-4">
            <div className="w-full h-full flex flex-col items-start gap-4">
              <SectionTitle title="Supplier" />
              {suppliers.length > 0 ? (
                <Select
                  label="Select Supplier"
                  onChange={() => { }}
                  options={
                    suppliers.map(s => ({ label: s.company, value: s._id }))
                  }
                />
              ) : (

                suppliers.length > 0 ? (
                  <p>Choose one</p>
                ) : (
                  // TODO: redesign like shopify
                  <SupplierDialog
                    text="Create supplier"
                    heading="Create Supplier"
                    onSave={(s) => {
                      console.log(s)
                    }}
                  />
                )

              )}
            </div>

            <div className="w-full h-full flex flex-col gap-4">
              <SectionTitle title="Destination" />
              <Select
                label="Select Destination"
                onChange={() => { }}
                options={
                  locations.map(l => ({ label: l.name, value: l._id }))
                }
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-4 mt-8">
            <Select
              label="Payment Terms (optional)"
              onChange={() => { }}
              options={[
                { label: "None", value: "" },
                { label: "Cash on delivery", value: "COD" },
                { label: "Payment on receipt", value: "ON_RECEIPT" },
                { label: "Payment in advance", value: "IN_ADVANCE" },
                { label: "Net 7", value: "NET7" },
                { label: "Net 15", value: "NET15" },
                { label: "Net 30", value: "NET30" },
                { label: "Net 45", value: "NET45" },
                { label: "Net 60", value: "NET60" },
              ]}
            />

            <Select
              label="Supplier Currency"
              onChange={() => { }}
              options={currencies}
            />
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle title="Shipping Details" />
          <div className="mt-4 items-end flex gap-4">
            <DatePicker />
            <Input id="" label="Shipping carrier" placeholder="" />
            <Input id="" label="Tracking number" placeholder="" />
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle title="Add Products" />
          <div className=" w-full flex gap-4">
            <Input
              icon={<IoIosSearch />}
              id="add-products"
              label=""
              placeholder="Search products"
            />
            <OutlinedButton onClick={() => { }}>Browse</OutlinedButton>
          </div>
        </Card>

        <div className=" flex w-full gap-6">
          <Card className="p-4 w-1/2 max-w-[50%] flex gap-4 flex-col">
            <SectionTitle title="Additional details" />
            <AdditionalDetails />
          </Card>

          <Card className="p-4 w-1/2 h-max">
            <div className="flex items-center justify-between w-full">
              <TitleMini text="Cost summary" />
              <AdjustmentsDialog
                text="Manage"
                purchaseOrder={purchaseOrder}
                setPurchaseOrder={setPurchaseOrder}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="text-xs mb-2 text-neutral-800">Taxes (included)</p>
              <p className="text-xs text-neutral-800">$ 0.00</p>
            </div>

            <div className="flex items-center justify-between w-full">
              <TitleMini text="Subtotal" />
              <p className="text-xs whitespace-nowrap text-neutral-800">
                $ 0.00
              </p>
            </div>
            <p className="text-xs text-neutral-800">0 items</p>

            <TitleMini text="Cost adjustments" />
            <CostAdjustments
              adjustments={[
                { name: "Shipping", value: 0 },
                { name: "Discount", value: 0 },
                { name: "Credit", value: 0 },
                { name: "Other", value: 0 },
              ]}
            />

            <div className="flex justify-between items-center w-full mt-4">
              <h3 className="text-xs font-bold mb-2 text-neutral-800">Total</h3>
              <p className="text-xs text-neutral-800">$ 0.00</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="w-full max-w-4xl flex justify-end mb-8">
        <FilledButton onClick={handleSave}>Save</FilledButton>
      </div>
    </>
  )
}

function CostAdjustments({ adjustments }: { adjustments: any }) {
  return (
    <>
      {adjustments.map((a: any) => (
        <div key={a.name} className="flex justify-between items-center w-full">
          <h3 className="text-xs mb-2 text-neutral-800">{a.name}</h3>
          <p className="text-xs text-neutral-800">$ {a.value}</p>
        </div>
      ))}
    </>
  );
}

function AdditionalDetails() {
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <>
      <Input id="reference-number" label="Reference number" placeholder="" />
      <Input id="note-to-supplier" label="Note to supplier" placeholder="" />
      <Input
        id="tags"
        label="Tags"
        placeholder=""
        onKeyDown={(e) => {
          const value = e.currentTarget.value;
          if (e.key === "Enter" && value !== "") {
            setTags([...tags, value]);
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="flex gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 w-min whitespace-nowrap text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}{" "}
            <button onClick={() => setTags(tags.filter((t) => t !== tag))}>
              <IoIosClose size={20} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
