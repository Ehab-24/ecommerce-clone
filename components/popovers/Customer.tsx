"use client";

import { useState } from "react";
import Input from "../Input";

interface Customer {
  id: number;
  name: string;
}

const CustomerPopover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const searchCustomers = (query: string) => {
    // Replace with actual customer search logic
    const customers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      // Add more customers as needed
    ];

    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredCustomers);
    setIsPopoverOpen(true);
  };

  const handleSearch = (value: any) => {
    setSearchQuery(value);
    if (value.trim() === "") {
      setSearchResults([]);
      setIsPopoverOpen(false);
    } else {
      searchCustomers(value);
    }
  };

  const handleAddCustomer = () => {
    // Logic to handle adding a new customer
    console.log("Add Customer functionality");
  };

  const handleInputFocus = () => {
    const inputElement = document.getElementById("searchInput");
    if (inputElement) {
      const inputRect = inputElement.getBoundingClientRect();
      setPopoverPosition({
        top: inputRect.bottom + window.scrollY + 5,
        left: inputRect.left + window.scrollX,
      });
      setIsPopoverOpen(true);
    }
  };

  return (
    <div className="relative">
      <Input
        id="searchInput"
        placeholder="Search for a customer"
        value={searchQuery}
        onChange={(e: any) => handleSearch(e.target.value)}
      />

      {isPopoverOpen && (
        <div
          className="absolute mt-10 rounded-lg w-full bg-white border border-gray-300 shadow-md z-10"
          style={{ top: popoverPosition.top, left: popoverPosition.left }}
        >
          <div className="flex flex-col text-sm text-neutral-700">
            <button
              onClick={handleAddCustomer}
              className="text-left border-b border-neutral-400"
            >
              <p className="p-3">Cretate a new customer</p>
            </button>
            {searchResults.length > 0 && (
              <div className="flex flex-col gap-3 py-3">
                {searchResults.map((customer) => (
                  <div key={customer.id} className="pl-3">
                    {customer.name}
                  </div>
                ))}
              </div>
            )}
            {searchResults.length === 0 && (
              <div className="p-3">No customers found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPopover;
