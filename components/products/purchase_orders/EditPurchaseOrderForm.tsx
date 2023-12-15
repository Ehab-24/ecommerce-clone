'use client'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import SupplierDialog from "@/components/products/purchase_orders/SupplierDialog"
import { Supplier } from "@/types/supplier";
import Input from "@/components/Input";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import Text from "@/components/Text";
import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import OutlinedButton from "@/components/buttons/OutlinedButtonSmall";
import AdjustmentsDialog from "@/components/products/purchase_orders/AdjustmentsDialog";
import TitleMini from "@/components/TitleMini";
import StatusText from "@/components/products/StatusText";
import Datatable from "@/components/products/Datatable";
import { AdjustmentName, ApiPurchaseOrder, PurchaseOrder } from "@/types/purchaseOrder";
import FilledButton from "@/components/buttons/FilledButton";
import BrowseProductsDialog from "@/components/BrowseProductsDialog";
import { Product } from "@/types/product";

export default function EditPurchaseOrderForm({ initialOrder, currencies }: { currencies: { label: string, value: string }[], initialOrder: PurchaseOrder }) {

  const [purchaseOrder, setPurchaseOrder] = React.useState<ApiPurchaseOrder>({ ...initialOrder, products: initialOrder.products.map(p => p._id), supplier: initialOrder.supplier._id, destination: initialOrder.destination._id })
  const [loading, setLoading] = React.useState(false)
  const [products, setProducts] = React.useState<Product[]>(initialOrder.products)

  React.useEffect(() => {
    setPurchaseOrder(t => ({ ...t, products: [...t.products, ...products.map(p => p._id)] }))
  }, [products])


  function getTotalTax() {
    return initialOrder.products.reduce((acc, product) => acc + product.tax, 0);
  }

  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="flex gap-4 items-center">
          <Link href="/products/purchase_orders" className="p-2 rounded-md hover:bg-black/10 transition-all">
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-neutral-800 flex gap-2 items-center">
            #{purchaseOrder.referenceNumber}
            <StatusText status={purchaseOrder.status} />
          </h1>
        </div>

        <div className="flex gap-4">
          <OutlinedButton onClick={() => { }}>
            Delete
          </OutlinedButton>
          <OutlinedButton onClick={() => { }}>
            Duplicate
          </OutlinedButton>
          <FilledButton onClick={() => { }}>
            Mark as Ordered
          </FilledButton>
        </div>
      </div>

      <Card className="flex flex-col items-center justify-center p-4">
        <div className="flex w-full h-full gap-4">
          <div className="w-full h-full flex flex-col items-start gap-4">
            <SectionTitle title="Supplier" />
            {
              purchaseOrder.supplier ?
                <div className="flex flex-col w-full items-start gap-2">
                  <h3 className="text-xl text-gray-900 font-bold">{initialOrder.supplier.company}</h3>
                  <div className="w-full flex justify-between">
                    <Text>{initialOrder.supplier.address}, {initialOrder.supplier.city}</Text>
                    <SupplierPopover supplier={initialOrder.supplier} />
                  </div>
                </div>
                :
                <SupplierDialog text="Create Supplier" heading="Create Supplier" onSave={s => setPurchaseOrder({ ...purchaseOrder, supplier: s._id })} />
            }
          </div>

          <div className="w-full h-full flex flex-col gap-4">
            <SectionTitle title="Destination" />
            <Select label="Select Destination" value={purchaseOrder.destination} onChange={() => { }} options={[
              { label: "Destination 1", value: "destination1" },
              { label: "Destination 2", value: "destination2" },
              { label: "Destination 3", value: "destination3" },
            ]} />
          </div>
        </div>

        <div className="w-full flex justify-between gap-4 mt-8">
          <Select label="Payment Terms (optional)" value={purchaseOrder.paymentTerms} onChange={() => { }} options={[
            { "label": "None", "value": "" },
            { "label": "Cash on delivery", "value": "COD" },
            { "label": "Payment on receipt", "value": "ON_RECEIPT" },
            { "label": "Payment in advance", "value": "IN_ADVANCE" },
            { "label": "Net 7", "value": "NET7" },
            { "label": "Net 15", "value": "NET15" },
            { "label": "Net 30", "value": "NET30" },
            { "label": "Net 45", "value": "NET45" },
            { "label": "Net 60", "value": "NET60" }
          ]} />


          <Select label="Supplier Currency" value={purchaseOrder.currency} onChange={() => { }} options={currencies} />
        </div>

      </Card>

      <Card className="p-4 flex flex-col items-start  ">
        <SectionTitle title="Shipping Details" />
        <div className="mt-4 flex gap-4 flex-col w-full items-start xl:flex-row">
          <DatePicker date={purchaseOrder.shipping.arrivalDate ? new Date(purchaseOrder.shipping.arrivalDate) : undefined} setDate={d => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, arrivalDate: d ? d.toString() : "" } })} />
          <Input id="" value={purchaseOrder.shipping.carrier} label="Shipping carrier" onChange={e => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, carrier: e.target.value } })} />
          <Input id="" value={purchaseOrder.shipping.trackingNumber} onChange={e => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, trackingNumber: e.target.value } })} label="Tracking number" placeholder="" />
        </div>
      </Card>

      <Card className="p-4">
        <SectionTitle title="Add Products" />
        <div className=" w-full flex mb-8 gap-4">
          {/*TODO: replace with a select popover for suppliers*/}
          <Input
            icon={<IoIosSearch />}
            id="add-products"
            placeholder="Search products"
            onChange={() => { }}
          />

          <BrowseProductsDialog setProducts={ps => setProducts(ps)} />

        </div>

        <Datatable products={products} />
      </Card>

      <div className=" flex flex-col 2xl:flex-row w-full gap-6">
        <Card className="p-4 w-full flex gap-4 flex-col">
          <SectionTitle title="Additional details" />
          <AdditionalDetails purchaseOrder={purchaseOrder} setPurchaseOrder={setPurchaseOrder} />
        </Card>

        <Card className="p-4 w-full h-max">
          <div className="flex items-center justify-between w-full">
            <TitleMini text="Cost summary" />
            <AdjustmentsDialog text="Manage" purchaseOrder={purchaseOrder} setPurchaseOrder={setPurchaseOrder} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xs mb-2 text-neutral-800">Taxes (included)</p>
            <p className="text-xs text-neutral-800" >$ {getTotalTax()}</p>
          </div>

          <div className="flex items-center justify-between w-full">
            <TitleMini text="Subtotal" />
            <p className="text-xs whitespace-nowrap text-neutral-800" >$ 0.00</p>
          </div>
          <Text className="text-neutral-500 mb-4">{initialOrder.products.reduce((acc, p) => acc + p.quantity, 0)} items</Text>

          <TitleMini text="Cost adjustments" />
          <CostAdjustments adjustments={purchaseOrder.costAdjustments} />

          <div className="flex justify-between items-center w-full mt-4">
            <h3 className="text-xs font-bold mb-2 text-neutral-800">Total</h3>
            <p className="text-xs text-neutral-800" >$ {initialOrder.products.reduce((acc, p) => acc + p.price + p.tax, 0).toFixed(2)}</p>
          </div>
        </Card>
      </div>
    </>
  )
}


function CostAdjustments({ adjustments }: { adjustments: { name: AdjustmentName, value: number }[] }) {
  if (adjustments.length === 0) {
    return <Text>None</Text>
  }
  return (
    <>
      {adjustments.map(a => (
        <div key={a.name} className="flex justify-between items-center w-full">
          <h3 className="text-xs mb-2 text-neutral-800">{a.name}</h3>
          <p className="text-xs text-neutral-800" >$ {a.value}</p>
        </div>
      ))}
    </>
  )
}

function AdditionalDetails({ purchaseOrder, setPurchaseOrder }: { purchaseOrder: ApiPurchaseOrder, setPurchaseOrder: React.Dispatch<React.SetStateAction<ApiPurchaseOrder>> }) {

  return (
    <>
      <Input id="reference-number" value={purchaseOrder.referenceNumber} label="Reference number" onChange={e => setPurchaseOrder({ ...purchaseOrder, referenceNumber: e.target.value })} />
      <Input id="note-to-supplier" value={purchaseOrder.noteToSupplier} label="Note to supplier" onChange={e => setPurchaseOrder({ ...purchaseOrder, noteToSupplier: e.target.value })} />

      <Input
        id="tags"
        label="Tags"
        onKeyDown={(e) => {
          const value = e.currentTarget.value;
          if (e.key === "Enter" && value !== "") {
            setPurchaseOrder({ ...purchaseOrder, tags: [...purchaseOrder.tags, value] })
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="flex gap-2">
        {purchaseOrder.tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 w-min whitespace-nowrap text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}{" "}
            <button
              onClick={() =>
                setPurchaseOrder({ ...purchaseOrder, tags: purchaseOrder.tags.filter((t) => t !== tag) })
              }
            >
              <IoIosClose size={20} />
            </button>
          </div>
        ))}
      </div>

    </>
  )
}

function SupplierPopover({ supplier }: { supplier: Supplier }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="link" className="text-xs text-blue-700">
          View Supplier
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex flex-col gap-1 items-start">

        <Text className="font-bold text-gray-900">Address</Text>
        <Text className="text-gray-900 mt-1">{supplier.address}</Text>
        <Text className="text-gray-900">{supplier.apartment}</Text>
        <Text className="text-gray-900">{supplier.city} {supplier.postalCode}</Text>
        <Text className="text-gray-900">{supplier.country}</Text>

        <Text className="font-bold text-gray-900 mt-3">Contact</Text>
        <Text className="text-gray-900 mt-1">{supplier.contactName}</Text>
        <Text className="text-gray-900">{supplier.email}</Text>
        <Text className="text-gray-900 mb-3">{supplier.phoneNumber}</Text>

        <SupplierDialog text="Edit Supplier" heading="Edit Supplier" onSave={s => console.log(s)} />

      </PopoverContent>
    </Popover >
  )
}
