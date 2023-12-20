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

import CustomerOptionsPopover from "@/components/customers/CustomerOptionsPopover";
import OutlinedButton from "@/components/buttons/OutlinedButton";

import MoreActionsPopover from "@/components/customers/single/MoreActionsPopover";

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
    <div className="min-h-screen sm:p-5 md:w-[100%] lg:px-[20%]">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between p-5 sm:p-0">
          <div className="flex gap-4">
            <Link href="/customers">
              <FaArrowLeft className="text-xs mt-2.5 text-neutral-800" />
            </Link>
            <div>
              <Heading>{customer?.firstName}</Heading>
              <p className="text-xs text-neutral-500">
                {customer?.addresses[0].city}, {customer?.addresses[0].country}
              </p>
            </div>
          </div>

          <MoreActionsPopover />
        </div>

        <Card className="sm:mt-5 p-5">
          <Title>Last order placed</Title>
          <p className="text-sm text-gray-500 font-medium">
            This customer has not placed any orders yet
          </p>

          <OutlinedButton className="mt-2">
            <Link href={`/orders/new`}>Create order</Link>
          </OutlinedButton>
        </Card>

        <Card className="p-5">
          <div className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
            <div className="flex justify-between">
              {" "}
              <Title className="!mb-0">Customer</Title>
              {customer && <CustomerOptionsPopover customer={customer} />}
            </div>

            <div className="flex flex-col">
              <Title>Contact Information</Title>
              <p className="text-blue-500">{customer?.email}</p>
              <p>{customer?.phone}</p>
              <p>Will receive notifications in English</p>
            </div>

            <div className="flex flex-col">
              <Title>Default Addresses</Title>
              <p>{customer?.addresses[0].address}</p>
              <p>
                {customer?.addresses[0].firstName}{" "}
                {customer?.addresses[0].lastName}
              </p>
              <p>
                {customer?.addresses[0].city}{" "}
                {customer?.addresses[0].postalCode}
              </p>
              <p>{customer?.addresses[0].country}</p>
            </div>

            <div className="flex flex-col">
              <Title>Marketing</Title>
              {customer?.marketing ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-500 w-3 h-3 rounded-full" />
                  <p>Email Subscribed</p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <span className="bg-red-500 w-3 h-3 rounded-full" />
                  <p>Email Unsubscribed</p>
                </div>
              )}

              {customer?.smsMarketing ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-500 w-3 h-3 rounded-full" />
                  <p>SMS Subscribed</p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <span className="bg-red-500 w-3 h-3 rounded-full" />
                  <p>SMS Unsubscribed</p>
                </div>
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
