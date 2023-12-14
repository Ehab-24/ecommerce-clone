"use client";

import { useState, useEffect } from "react";
import { Customer } from "@/types/customer";
import { useParams } from "next/navigation";

import Heading from "@/components/Heading";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Card from "@/components/Card";
import Title from "@/components/Title";

import Input from "@/components/Input";
import { IoIosClose } from "react-icons/io";

const SingleCustomerPage = () => {
  const { id } = useParams();

  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await fetch(`/api/customers/${id}`);
      const data = await res.json();
      setCustomer(data);
    };

    fetchCustomer();
  }, [id]);

  const handleFieldChange = async (field: string, value: any) => {
    const res = await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [field]: value }),
    });

    const data = await res.json();
    setCustomer(data);
  };

  const addTag = async (tag: string) => {
    const res = await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag }),
    });

    const data = await res.json();
    setCustomer(data);
  };

  return (
    <div className="min-h-screen p-5 md:w-[100%] lg:px-[20%]">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Link href="/customers">
            <FaArrowLeft className="text-xs mt-2.5 text-neutral-800" />
          </Link>
          <div>
            <Heading>{customer?.firstName}</Heading>
            <p className="text-xs text-neutral-500">
              {customer?.address.city}, {customer?.address.country}
            </p>
          </div>
        </div>

        <Card className="mt-5 p-5">
          <div className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
            <Title className="!mb-0">Customer</Title>
            <div className="flex flex-col">
              <Title>Contact Information</Title>
              <p className="text-blue-500">{customer?.email}</p>
              <p>{customer?.phone}</p>
              <p>Will receive notifications in English</p>
            </div>

            <div className="flex flex-col">
              <Title>Default Address</Title>
              <p>{customer?.address.address}</p>
              <p>
                {customer?.address.firstName} {customer?.address.lastName}
              </p>
              <p>
                {customer?.address.city} {customer?.address.postalCode}
              </p>
              <p>{customer?.address.country}</p>
            </div>

            <div className="flex flex-col">
              <Title>Marketing</Title>
              {customer?.marketing ? (
                <p>Email Subscribed</p>
              ) : (
                <p>Email Unsubscribed</p>
              )}

              {customer?.smsMarketing ? (
                <p>SMS Subscribed</p>
              ) : (
                <p>SMS Unsubscribed</p>
              )}
            </div>

            <div className="flex flex-col">
              <Title>Tax exemptions</Title>
              {customer?.taxExempt ? <p>Tax exempt</p> : <p>No Exemptions</p>}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <Input
            id="tags"
            label="Tags"
            placeholder=""
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(e.currentTarget.value);
                addTag(e.currentTarget.value);
                console.log(customer);
                e.currentTarget.value = "";
              }
            }}
          />

          <div className="flex gap-2">
            {customer?.tags.map((tag) => (
              <div
                key={tag}
                className="bg-slate-200 mt-2 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() =>
                    setCustomer({
                      ...customer,
                      tags: customer?.tags.filter((t) => t !== tag),
                    })
                  }
                >
                  <IoIosClose size={20} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <Input
            label="Note"
            id="note"
            placeholder=""
            value={customer?.note}
            onChange={(e) => {
              handleFieldChange("note", e.target.value);
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default SingleCustomerPage;
