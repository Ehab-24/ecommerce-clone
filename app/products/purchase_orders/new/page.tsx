'use client'

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
import { Adjustment } from "@/types/adjustment";
import SupplierDialog from "@/components/products/purchase_orders/SupplierDialog";



export default function CreatePurchaseOrderPage() {

  const [adjustments, setAdjustments] = React.useState<Adjustment[]>([])
  const [suppliers, setSuppliers] = React.useState<any[]>([])

  return (
    <div className=" w-full bg-gray-100 items-center flex flex-col">
      <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
        <div className="flex gap-3 items-center ">
          <Link href="/products/purchase_orders">
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-[#1a1a1a]">Create Purchase Order</h1>
        </div>

        <Card className="flex flex-col items-center justify-center p-4">
          <div className="flex w-full h-full gap-4">
            <div className="w-full h-full flex flex-col items-start gap-4">
              <SectionTitle title="Supplier" />
              {
                suppliers.length > 0 ?
                  <Select label="Select Supplier" onChange={() => { }} options={[
                    { label: "Supplier 1", value: "supplier1" },
                    { label: "Supplier 2", value: "supplier2" },
                    { label: "Supplier 3", value: "supplier3" },
                  ]} />
                  :
                  <SupplierDialog text="Create Supplier" onSave={s => setSuppliers([...suppliers, s])} />
              }
            </div>

            <div className="w-full h-full flex flex-col gap-4">
              <SectionTitle title="Destination" />
              <Select label="Select Destination" onChange={() => { }} options={[
                { label: "Destination 1", value: "destination1" },
                { label: "Destination 2", value: "destination2" },
                { label: "Destination 3", value: "destination3" },
              ]} />
            </div>
          </div>

          <div className="w-full flex justify-between gap-4 mt-8">
            <Select label="Payment Terms (optional)" onChange={() => { }} options={[
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


            <Select label="Supplier Currency" onChange={() => { }} options={currencies} />
          </div>

        </Card>

        <Card className="">
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
            <Input icon={<IoIosSearch />} id="add-products" label="" placeholder="Search products" />
            <OutlinedButton onClick={() => { }}>
              Browse
            </OutlinedButton>
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
              <AdjustmentsDialog text="Manage" adjustments={adjustments} setAdjustments={setAdjustments} />
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="text-xs mb-2 text-neutral-800">Taxes (included)</p>
              <p className="text-xs text-neutral-800" >$ 0.00</p>
            </div>

            <div className="flex items-center justify-between w-full">
              <TitleMini text="Subtotal" />
              <p className="text-xs whitespace-nowrap text-neutral-800" >$ 0.00</p>
            </div>
            <p className="text-xs text-neutral-800" >0 items</p>

            <TitleMini text="Cost adjustments" />
            <CostAdjustments adjustments={[
              { name: "Shipping", value: 0 },
              { name: "Discount", value: 0 },
              { name: "Credit", value: 0 },
              { name: "Other", value: 0 },
            ]} />

            <div className="flex justify-between items-center w-full mt-4">
              <h3 className="text-xs font-bold mb-2 text-neutral-800">Total</h3>
              <p className="text-xs text-neutral-800" >$ 0.00</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


function CostAdjustments({ adjustments }: { adjustments: Adjustment[] }) {
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

function AdditionalDetails() {

  const [tags, setTags] = React.useState<string[]>([])

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
            <button
              onClick={() =>
                setTags(tags.filter((t) => t !== tag))
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

