"use client";

import Checkbox from "../Checkbox";
import { useEffect, useState } from "react";
import StatusText from "../StatusText";
import { useRouter } from "next/navigation";
import Card from "../Card";
import OutlinedButton from "../buttons/OutlinedButton";
import { Button } from "../ui/button";
import Text from "../Text";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import SortPopover from "../SortPopover";
import Input from "../Input";
import FilledButton from "../buttons/FilledButton";
import AddViewDialog from "../AddViewDialog";
import HeaderItem from "@/types/headerItem";
import SortableHeader from "../SortableHeader";
import { Order } from "@/types/order";
import AddFilterPopover from "../AddFilterPopover";

type View = string;

export default function Datatable({ orders }: { orders: Order[] }) {
  const views: View[] = ["all", "Unfulfilled", "Unpaid", "Open", "Closed"];
  const headerItems: HeaderItem[] = [
    { label: "Order", sortable: true, sortKey: "order" },
    { label: "Date", sortable: true, sortKey: "date" },
    { label: "Customer", sortable: true, sortKey: "customer" },
    { label: "Channel", sortable: true, sortKey: "channel" },
    { label: "Total", sortable: true, sortKey: "total" },
    { label: "Payment status", sortable: true, sortKey: "payment_status" },
    {
      label: "Fulfilment status",
      sortable: true,
      sortKey: "fulfilment_status",
    },
    { label: "Items", sortable: true, sortKey: "items" },
    { label: "Delivery status", sortable: false, sortKey: "" },
    { label: "Delivery method", sortable: false, sortKey: "" },
    { label: "Tags", sortable: false, sortKey: "" },
  ];

  const allFilters = [
    "Delivery method",
    "Destination",
    "Status",
    "Payment status",
    "Product",
    "Fulfillment status",
    "Delivery status",
    "Return status",
    "Tagged with",
    "Not tagged with",
    "App",
    "Channel",
    "Chargeback and inquiry status",
    "Risk level",
    "Date",
    "Credit card (Last four digits)",
    "Label status",
    "Discount code",
  ];

  const router = useRouter();
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [selectedOrders, setSelectedOrders] = useState<boolean[]>(
    new Array(orders.length).fill(false)
  );
  const [selectedView, setSelectedView] = useState<View>("all");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    setAllChecked(selectedOrders.length > 0 && selectedOrders.every((p) => p));
  }, [orders, selectedOrders]);

  return (
    <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg overflow-hidden">
      <div className=" flex justify-between items-start bg-white px-2 py-1">
        {isSearching ? (
          <div className="flex mr-2 flex-col">
            <div className="flex items-center">
              <Input
                id="search"
                placeholder="Searching all products"
                value={search}
                icon={<IoSearchOutline size={16} className="text-gray-800" />}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="w-4" />
              <Button
                variant="ghost"
                className="px-2 mr-2 h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                onClick={() => setIsSearching(false)}
              >
                Cancel
              </Button>
              <FilledButton>Save as</FilledButton>
            </div>

            <div className=" border-t border-gray-300 pt-2 mt-2 mb-1 flex gap-1">
              {filters.map((f) => (
                <Button
                  key={f}
                  variant="outline"
                  className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                  onClick={() => {}}
                >
                  {f}
                  <IoClose
                    size={12}
                    className="inline-block ml-1"
                    onClick={() => setFilters(filters.filter((_f) => f !== _f))}
                  />
                </Button>
              ))}

              <AddFilterPopover
                disabled={filters}
                filters={allFilters}
                onSelect={(f) => setFilters([...filters, f])}
              />

              <Button
                variant="ghost"
                className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                onClick={() => setFilters([])}
              >
                Clear all
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex mr-2  justify-between items-center">
            <div className="flex gap-2 items-center">
              {views.map((v) => (
                <Button
                  key={v}
                  variant="ghost"
                  className={`hover:bg-gray-200/75 px-3 py-1.5 h-min ${
                    v === selectedView ? "bg-gray-200" : "bg-transparent"
                  }`}
                  onClick={() => setSelectedView(v)}
                >
                  <Text className="text-gray-800 capitalize">{v}</Text>
                </Button>
              ))}
              <AddViewDialog onSave={(name) => {}} />
            </div>

            <OutlinedButton
              className="p-1.5 flex gap-0.5"
              onClick={() => setIsSearching(true)}
            >
              <IoSearchOutline size={16} className="text-black" />
              <MdOutlineFilterList size={20} className="text-black" />
            </OutlinedButton>
          </div>
        )}

        <SortPopover
          options={[
            { label: "Order number", value: "order_number" },
            { label: "Date", value: "date" },
            { label: "Items", value: "items" },
            { label: "Destination", value: "destination" },
            { label: "Customer name", value: "customer_name" },
            { label: "Payment status", value: "payment_status" },
            { label: "Fullfillment status", value: "fullfillment_status" },
            { label: "Total", value: "total" },
            { label: "Channel", value: "channel" },
          ]}
          onChange={(val) => {}}
        />
      </div>

      <div className="text-sm text-left rtl:text-right text-gray-500 ">
        <div className="text-[10px] text-gray-700 uppercase bg-gray-100 border-t-2 border-b-2 ">
          <tr>
            <th scope="col" className="p-4">
              <Checkbox
                id="select-all-products"
                label={
                  selectedOrders.some((p) => p)
                    ? selectedOrders.filter((p) => p).length + " selected"
                    : ""
                }
                checked={allChecked}
                onChange={(e) =>
                  setSelectedOrders(
                    new Array(orders.length).fill(e.target.checked)
                  )
                }
              />
            </th>
            {headerItems.map((h) => (
              <th key={h.label} scope="col" className="px-6 py-1">
                {selectedOrders.some((p) => p) ? (
                  ""
                ) : h.sortable ? (
                  <SortableHeader header={h} onClick={() => {}} sorted="none" />
                ) : (
                  h.label
                )}
              </th>
            ))}
          </tr>
        </div>

        <tbody className="text-xs">
          {orders.map((p, i) => (
            <tr key={p._id} className="bg-white border-b hover:bg-gray-50 ">
              <td className="w-4 p-4">
                <Checkbox
                  id={"select-" + p._id}
                  checked={selectedOrders[i]}
                  label=""
                  onChange={(e) => {
                    const newSelectProducts = [...selectedOrders];
                    newSelectProducts[i] = e.target.checked;
                    setSelectedOrders(newSelectProducts);
                  }}
                />
              </td>

              <th
                scope="row"
                onClick={() => router.push(`/products/${p._id}`)}
                className="flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
              >
                <p className="ml-4">{p._id!.substring(0, 4)}</p>
              </th>

              <td className="px-6 py-2">{p.date}</td>
              <td className="px-6 py-2">
                {p.customer?.firstName + " " + p.customer?.lastName}
              </td>
              <td className="px-6 py-2">{p.channel}</td>
              <td className="px-6 py-2">{p.total}</td>
              <td className="px-6 py-2">{p.payment_status}</td>
              <td className="px-6 py-2">
                {p.fulfillment_status && (
                  <StatusText status={p.fulfillment_status} />
                )}
              </td>
              <td className="px-6 py-2">{p.items?.length ?? 0} items</td>
              <td className="px-6 py-2">{p.delivery_status}</td>
              <td className="px-6 py-2">{p.delivery_method}</td>
              <td className="px-6 py-2">{p.tags?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </div>

      {selectedOrders.some((p) => p) && (
        <div className="py-4 min-  grid bg-white place-items-center">
          <Card className="px-4 py-2 flex gap-2">
            <OutlinedButton onClick={() => {}}>Bulk edit</OutlinedButton>
          </Card>
        </div>
      )}
    </div>
  );
}
