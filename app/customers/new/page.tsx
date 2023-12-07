"use client";

import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import InputSearch from "@/components/InputSearch";
import React from "react";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";

const countries = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
];

const OrdersPage = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0].code);
  const [language, setLanguage] = useState("English");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleLanguageChange = (e: any) => {
    setLanguage(e.target.value);
  };

  const handleCountryChange = (e: any) => {
    setSelectedCountry(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };
  return (
    <div className="min-h-screen p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/orders">
            <FaArrowLeft className="text-sm text-neutral-800" />
          </Link>
          <Heading>Create Order</Heading>
        </div>

        <Card className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input label="First Name" id="firstName" placeholder="" />
            <Input label="Last Name" id="lastName" placeholder="" />
          </div>

          <select value={language} onChange={handleLanguageChange}>
            <option value="English">English</option>
            {/* Add other language options if needed */}
          </select>

          <Input
            label="Email"
            id="email"
            placeholder=""
            value={email}
            onChange={handleEmailChange}
          />

          <div className="flex">
            <Input
              label="Phone"
              id="phone"
              placeholder=""
              value={phone}
              onChange={handlePhoneChange}
            />

            <select
              className=""
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div>

          <Checkbox
            onChange={() => {
              console.log("hello");
            }}
            id="marketingEmail"
            label="Customer agreed to receive marketing emails."
          />

          <Checkbox
            onChange={() => {
              console.log("hello");
            }}
            id="marketingSMS"
            label="Customer agreed to receive SMS marketing text messages."
          />

          <p className="text-xs text-neutral-600 pb-2 pt-4">
            You should ask your customers for permission before you subscribe
            them to your marketing emails or SMS.
          </p>
        </Card>

        <Card className="">
          <div className="flex justify-between align-middle">
            <SectionTitle title="Notes" />
            <FaPencilAlt className="text-sm text-neutral-500" />
          </div>

          <div className="text-sm">No notes</div>
        </Card>

        <Card className="">
          <div className="flex justify-between align-middle">
            <SectionTitle title="Customer" />
          </div>

          <InputSearch placeholder="Search for a customer" />
        </Card>

        <Card className="">
          <SectionTitle title="Customer" />
          <p className="text-sm font-semibold text-neutral-700">
            Primary Market
          </p>
          <p className="text-xs">Kingdom of Saudi Arabia (SAR riyals)</p>
        </Card>

        <Card className="">
          <SectionTitle title="Tags" />
          <InputSearch placeholder="" />
        </Card>
      </div>
    </div>
  );
};

export default OrdersPage;
