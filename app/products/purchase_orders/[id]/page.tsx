'use client'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import Card from "@/components/Card";
import React from "react";
import Input from "@/components/Input";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import SectionTitle from "@/components/SectionTitle";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import OutlinedButton from "@/components/buttons/OutlinedButtonSmall";
import AdjustmentsDialog from "@/components/products/purchase_orders/AdjustmentsDialog";
import TitleMini from "@/components/TitleMini";
import SupplierDialog from "@/components/products/purchase_orders/SupplierDialog"
import { Supplier } from "@/types/supplier";
import { AdjustmentName, PurchaseOrder } from "@/types/purchaseOrder";
import StatusText from "@/components/products/StatusText";
import Text from "@/components/Text";
import Datatable from "@/components/products/Datatable";
import OutlinedButtonSmall from "@/components/buttons/OutlinedButtonSmall";
import FilledButtonSmall from "@/components/buttons/FilledButtonSmall";

export default function CreatePurchaseOrderPage() {

  const [purchaseOrder, setPurchaseOrder] = React.useState<PurchaseOrder>({
    _id: '2',
    currency: 'USD',
    destination: 'destination2',
    status: 'received',
    shipping: {
      arrivalDate: new Date('2023-12-20'),
      carrier: 'Another Carrier',
      trackingNumber: 'XYZ987654321',
    },
    products: [
      {
        title: "Yoga Mat",
        description: "Eco-friendly yoga mat for comfortable workouts",
        price: 29.99,
        compareAtPrice: 39.99,
        chargeTaxes: true,
        tax: 7.00,
        taxRate: 10,
        costPerItem: 15.0,
        profit: 14.99,
        margin: 50,
        trackQuantity: true,
        quantity: 6,
        continueSellingWhenOutOfStock: false,
        hasSku: true,
        sku: "YM001",
        barcode: "9876543211",
        isPhysicalProduct: true,
        weight: 1.0,
        weightUnit: "kg",
        countryOfOrigin: "India",
        status: "active",
        productCategory: "Fitness",
        productType: "Yoga Mat",
        vendor: "Vendor D",
        collection: "Fitness Gear",
        tags: ["Yoga", "Fitness", "Health"],
        seo: {
          title: 'Yoga Mat',
          description: 'Eco-friendly yoga mat for comfortable workouts',
        },
        media: [
          {
            url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
            altText: 'Coffee Maker',
            type: 'image'
          },
          {
            url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
            altText: 'Coffee Maker',
            type: 'image'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    total: 46.47,
    referenceNumber: 'REF67890',
    noteToSupplier: 'Thank you for the prompt delivery.',
    tags: ['clothing'],
    supplier: {
      _id: 's2',
      company: 'XYZ Company',
      postalCode: '98765',
      city: 'Another City',
      email: 'spplier2@domain.com',
      country: 'Another Country',
      apartment: 'Apt 987',
      contactName: 'XYZ Suppliers',
      address: 'Another Supplier Address',
      phoneNumber: '987-654-3210',
    },
    costAdjustments: [],
    paymentTerms: "NET30",
  })

  function getTotalTax() {
    return purchaseOrder.products.reduce((acc, product) => acc + product.tax, 0);
  }

  return (
    <div className=" w-full bg-gray-100 items-center flex flex-col">
      <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
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
            <OutlinedButtonSmall onClick={() => { }}>
              Delete
            </OutlinedButtonSmall>
            <OutlinedButtonSmall onClick={() => { }}>
              Duplicate
            </OutlinedButtonSmall>
            <FilledButtonSmall onClick={() => { }}>
              Mark as Ordered
            </FilledButtonSmall>
          </div>
        </div>

        <Card className="flex flex-col items-center justify-center p-4">
          <div className="flex w-full h-full gap-4">
            <div className="w-full h-full flex flex-col items-start gap-4">
              <SectionTitle title="Supplier" />
              {
                purchaseOrder.supplier ?
                  <div className="flex flex-col w-full items-start gap-2">
                    <h3 className="text-xl text-gray-900 font-bold">{purchaseOrder.supplier.company}</h3>
                    <div className="w-full flex justify-between">
                      <Text>{purchaseOrder.supplier.address}, {purchaseOrder.supplier.city}</Text>
                      <SupplierPopover supplier={purchaseOrder.supplier} />
                    </div>
                  </div>
                  :
                  <SupplierDialog text="Create Supplier" heading="Create Supplier" supplier={purchaseOrder.supplier} onSave={s => setPurchaseOrder({ ...purchaseOrder, supplier: s })} />
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

        <Card className="">
          <SectionTitle title="Shipping Details" />
          <div className="mt-4 items-end flex gap-4">
            <DatePicker />
            <Input id="" value={purchaseOrder.shipping.carrier} label="Shipping carrier" onChange={e => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, carrier: e.target.value } })} />
            <Input id="" value={purchaseOrder.shipping.trackingNumber} onChange={e => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, trackingNumber: e.target.value } })} label="Tracking number" placeholder="" />
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle title="Add Products" />
          <div className=" w-full flex gap-4 mb-8">
            <Input icon={<IoIosSearch />} id="add-products" label="" placeholder="Search products" />
            <OutlinedButton onClick={() => { }}>
              Browse
            </OutlinedButton>
          </div>

          <Datatable products={purchaseOrder.products} />
        </Card>

        <div className=" flex w-full gap-6">
          <Card className="p-4 w-1/2 max-w-[50%] flex gap-4 flex-col">
            <SectionTitle title="Additional details" />
            <AdditionalDetails purchaseOrder={purchaseOrder} setPurchaseOrder={setPurchaseOrder} />
          </Card>

          <Card className="p-4 w-1/2 h-max">
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
            <Text className="text-neutral-500 mb-4">{purchaseOrder.products.reduce((acc, p) => acc + p.quantity, 0)} items</Text>

            <TitleMini text="Cost adjustments" />
            <CostAdjustments adjustments={purchaseOrder.costAdjustments} />

            <div className="flex justify-between items-center w-full mt-4">
              <h3 className="text-xs font-bold mb-2 text-neutral-800">Total</h3>
              <p className="text-xs text-neutral-800" >$ {purchaseOrder.products.reduce((acc, p) => acc + p.price + p.tax, 0).toFixed(2)}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
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

function AdditionalDetails({ purchaseOrder, setPurchaseOrder }: { purchaseOrder: PurchaseOrder, setPurchaseOrder: React.Dispatch<React.SetStateAction<PurchaseOrder>> }) {

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

        <SupplierDialog text="Edit Supplier" heading="Edit Supplier" supplier={supplier} onSave={s => { }} />

      </PopoverContent>
    </Popover >
  )
}


const currencies = [
  { "label": "Select", "value": "", "disabled": true },
  { "label": "US dollars (USD)", "value": "USD" },
  { "label": "Euros (EUR)", "value": "EUR" },
  { "label": "British pounds (GBP)", "value": "GBP" },
  { "label": "Canadian dollars (CAD)", "value": "CAD" },
  { "label": "Afghan Afghanis (AFN)", "value": "AFN" },
  { "label": "Albanian lekë (ALL)", "value": "ALL" },
  { "label": "Algerian dinars (DZD)", "value": "DZD" },
  { "label": "Angolan kwanzas (AOA)", "value": "AOA" },
  { "label": "Argentine pesos (ARS)", "value": "ARS" },
  { "label": "Armenian drams (AMD)", "value": "AMD" },
  { "label": "Aruban florin (AWG)", "value": "AWG" },
  { "label": "Australian dollars (AUD)", "value": "AUD" },
  { "label": "Barbadian dollars (BBD)", "value": "BBD" },
  { "label": "Azerbaijani manats (AZN)", "value": "AZN" },
  { "label": "Bangladeshi takas (BDT)", "value": "BDT" },
  { "label": "Bahamian dollars (BSD)", "value": "BSD" },
  { "label": "Bahraini dinars (BHD)", "value": "BHD" },
  { "label": "Burundian francs (BIF)", "value": "BIF" },
  { "label": "Belarusian rubles (BYN)", "value": "BYN" },
  { "label": "Belize dollars (BZD)", "value": "BZD" },
  { "label": "Bermudan dollars (BMD)", "value": "BMD" },
  { "label": "Bhutanese ngultrums (BTN)", "value": "BTN" },
  { "label": "Bosnia-Herzegovina convertible marks (BAM)", "value": "BAM" },
  { "label": "Brazilian reals (BRL)", "value": "BRL" },
  { "label": "Bolivian bolivianos (BOB)", "value": "BOB" },
  { "label": "Botswanan pulas (BWP)", "value": "BWP" },
  { "label": "Brunei dollars (BND)", "value": "BND" },
  { "label": "Bulgarian leva (BGN)", "value": "BGN" },
  { "label": "Myanmar kyats (MMK)", "value": "MMK" },
  { "label": "Cambodian riels (KHR)", "value": "KHR" },
  { "label": "Cape Verdean escudos (CVE)", "value": "CVE" },
  { "label": "Cayman Islands dollars (KYD)", "value": "KYD" },
  { "label": "Central African CFA francs (XAF)", "value": "XAF" },
  { "label": "Chilean pesos (CLP)", "value": "CLP" },
  { "label": "Chinese yuan (CNY)", "value": "CNY" },
  { "label": "Colombian pesos (COP)", "value": "COP" },
  { "label": "Comorian francs (KMF)", "value": "KMF" },
  { "label": "Congolese francs (CDF)", "value": "CDF" },
  { "label": "Costa Rican colóns (CRC)", "value": "CRC" },
  { "label": "Croatian kunas (HRK)", "value": "HRK" },
  { "label": "Czech korunas (CZK)", "value": "CZK" },
  { "label": "Danish kroner (DKK)", "value": "DKK" },
  { "label": "Djiboutian francs (DJF)", "value": "DJF" },
  { "label": "Dominican pesos (DOP)", "value": "DOP" },
  { "label": "East Caribbean dollars (XCD)", "value": "XCD" },
  { "label": "Egyptian pounds (EGP)", "value": "EGP" },
  { "label": "Eritrean nakfas (ERN)", "value": "ERN" },
  { "label": "Ethiopian birrs (ETB)", "value": "ETB" },
  { "label": "Falkland Islands pounds (FKP)", "value": "FKP" },
  { "label": "CFP francs (XPF)", "value": "XPF" },
  { "label": "Fijian dollars (FJD)", "value": "FJD" },
  { "label": "Gibraltar pounds (GIP)", "value": "GIP" },
  { "label": "Gambian dalasis (GMD)", "value": "GMD" },
  { "label": "Ghanaian cedis (GHS)", "value": "GHS" },
  { "label": "Guatemalan quetzals (GTQ)", "value": "GTQ" },
  { "label": "Guyanaese dollars (GYD)", "value": "GYD" },
  { "label": "Georgian laris (GEL)", "value": "GEL" },
  { "label": "Guinean francs (GNF)", "value": "GNF" },
  { "label": "Haitian gourdes (HTG)", "value": "HTG" },
  { "label": "Honduran lempiras (HNL)", "value": "HNL" },
  { "label": "Hong Kong dollars (HKD)", "value": "HKD" },
  { "label": "Hungarian forints (HUF)", "value": "HUF" },
  { "label": "Icelandic krónur (ISK)", "value": "ISK" },
  { "label": "Indian rupees (INR)", "value": "INR" },
  { "label": "Indonesian rupiahs (IDR)", "value": "IDR" },
  { "label": "Israeli new shekels (ILS)", "value": "ILS" },
  { "label": "Iranian rials (IRR)", "value": "IRR" },
  { "label": "Iraqi dinars (IQD)", "value": "IQD" },
  { "label": "Jamaican dollars (JMD)", "value": "JMD" },
  { "label": "Japanese yen (JPY)", "value": "JPY" },
  { "label": "JEP (JEP)", "value": "JEP" },
  { "label": "Jordanian dinars (JOD)", "value": "JOD" },
  { "label": "Kazakhstani tenges (KZT)", "value": "KZT" },
  { "label": "Kenyan shillings (KES)", "value": "KES" },
  { "label": "KID (KID)", "value": "KID" },
  { "label": "Kuwaiti dinars (KWD)", "value": "KWD" },
  { "label": "Kyrgystani soms (KGS)", "value": "KGS" },
  { "label": "Laotian kips (LAK)", "value": "LAK" },
  { "label": "LVL (LVL)", "value": "LVL" },
  { "label": "Lebanese pounds (LBP)", "value": "LBP" },
  { "label": "Lesotho lotis (LSL)", "value": "LSL" },
  { "label": "Liberian dollars (LRD)", "value": "LRD" },
  { "label": "Libyan dinars (LYD)", "value": "LYD" },
  { "label": "LTL (LTL)", "value": "LTL" },
  { "label": "Malagasy ariaries (MGA)", "value": "MGA" },
  { "label": "Macedonian denari (MKD)", "value": "MKD" },
  { "label": "Macanese patacas (MOP)", "value": "MOP" },
  { "label": "Malawian kwachas (MWK)", "value": "MWK" },
  { "label": "Maldivian rufiyaas (MVR)", "value": "MVR" },
  { "label": "Mauritanian ouguiyas (MRU)", "value": "MRU" },
  { "label": "Mexican pesos (MXN)", "value": "MXN" },
  { "label": "Malaysian ringgits (MYR)", "value": "MYR" },
  { "label": "Mauritian rupees (MUR)", "value": "MUR" },
  { "label": "Moldovan lei (MDL)", "value": "MDL" },
  { "label": "Moroccan dirhams (MAD)", "value": "MAD" },
  { "label": "Mongolian tugriks (MNT)", "value": "MNT" },
  { "label": "Mozambican meticals (MZN)", "value": "MZN" },
  { "label": "Namibian dollars (NAD)", "value": "NAD" },
  { "label": "Nepalese rupees (NPR)", "value": "NPR" },
  { "label": "Netherlands Antillean guilders (ANG)", "value": "ANG" },
  { "label": "New Zealand dollars (NZD)", "value": "NZD" },
  { "label": "Nicaraguan córdobas (NIO)", "value": "NIO" },
  { "label": "Nigerian nairas (NGN)", "value": "NGN" },
  { "label": "Norwegian kroner (NOK)", "value": "NOK" },
  { "label": "Omani rials (OMR)", "value": "OMR" },
  { "label": "Panamanian balboas (PAB)", "value": "PAB" },
  { "label": "Pakistani rupees (PKR)", "value": "PKR" },
  { "label": "Papua New Guinean kina (PGK)", "value": "PGK" },
  { "label": "Paraguayan guaranis (PYG)", "value": "PYG" },
  { "label": "Peruvian soles (PEN)", "value": "PEN" },
  { "label": "Philippine pesos (PHP)", "value": "PHP" },
  { "label": "Polish zlotys (PLN)", "value": "PLN" },
  { "label": "Qatari riyals (QAR)", "value": "QAR" },
  { "label": "Romanian lei (RON)", "value": "RON" },
  { "label": "Russian rubles (RUB)", "value": "RUB" },
  { "label": "Rwandan francs (RWF)", "value": "RWF" },
  { "label": "Samoan tala (WST)", "value": "WST" },
  { "label": "St. Helena pounds (SHP)", "value": "SHP" },
  { "label": "Saudi riyals (SAR)", "value": "SAR" },
  { "label": "Serbian dinars (RSD)", "value": "RSD" },
  { "label": "Seychellois rupees (SCR)", "value": "SCR" },
  { "label": "Sierra Leonean leones (1964—2 (SLL)", "value": "SLL" },
  { "label": "Singapore dollars (SGD)", "value": "SGD" },
  { "label": "Sudanese pounds (SDG)", "value": "SDG" },
  { "label": "Somali shillings (SOS)", "value": "SOS" },
  { "label": "Syrian pounds (SYP)", "value": "SYP" },
  { "label": "South African rand (ZAR)", "value": "ZAR" },
  { "label": "South Korean won (KRW)", "value": "KRW" },
  { "label": "South Sudanese pounds (SSP)", "value": "SSP" },
  { "label": "Solomon Islands dollars (SBD)", "value": "SBD" },
  { "label": "Sri Lankan rupees (LKR)", "value": "LKR" },
  { "label": "Surinamese dollars (SRD)", "value": "SRD" },
  { "label": "Swazi emalangeni (SZL)", "value": "SZL" },
  { "label": "Swedish kronor (SEK)", "value": "SEK" },
  { "label": "Swiss francs (CHF)", "value": "CHF" },
  { "label": "New Taiwan dollars (TWD)", "value": "TWD" },
  { "label": "Thai baht (THB)", "value": "THB" },
  { "label": "Tajikistani somonis (TJS)", "value": "TJS" },
  { "label": "Tanzanian shillings (TZS)", "value": "TZS" },
  { "label": "Tongan paʻanga (TOP)", "value": "TOP" },
  { "label": "Trinidad & Tobago dollars (TTD)", "value": "TTD" },
  { "label": "Tunisian dinars (TND)", "value": "TND" },
  { "label": "Turkish Lira (TRY)", "value": "TRY" },
  { "label": "Turkmenistani manat (TMT)", "value": "TMT" },
  { "label": "Ugandan shillings (UGX)", "value": "UGX" },
  { "label": "Ukrainian hryvnias (UAH)", "value": "UAH" },
  { "label": "UAE dirhams (AED)", "value": "AED" },
  { "label": "Uruguayan pesos (UYU)", "value": "UYU" },
  { "label": "Uzbekistani som (UZS)", "value": "UZS" },
  { "label": "Vanuatu vatus (VUV)", "value": "VUV" },
  { "label": "Venezuelan bolívars (VES)", "value": "VES" },
  { "label": "Vietnamese dong (VND)", "value": "VND" },
  { "label": "West African CFA francs (XOF)", "value": "XOF" },
  { "label": "Yemeni rials (YER)", "value": "YER" },
  { "label": "Zambian kwachas (ZMW)", "value": "ZMW" },
  { "label": "BYR (BYR)", "value": "BYR" },
  { "label": "STD (STD)", "value": "STD" },
  { "label": "São Tomé & Príncipe dobras (STN)", "value": "STN" },
  { "label": "VED (VED)", "value": "VED" },
  { "label": "VEF (VEF)", "value": "VEF" },
  { "label": "XXX (XXX)", "value": "XXX" }
]
  ;

