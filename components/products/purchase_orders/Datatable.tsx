"use client";

import Checkbox from "@/components/Checkbox";
import { useState } from "react";
import { PurchaseOrder } from "@/types/purchaseOrder";
import StatusText from "../StatusText";
import { useRouter } from "next/navigation";

export default function Datatable({
  purchaseOrders,
}: {
  purchaseOrders: PurchaseOrder[];
}) {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<boolean[]>(
    new Array(purchaseOrders.length).fill(false)
  );

  console.log(purchaseOrders[0].destination);
  return (
    <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-[10px] text-gray-700 uppercase bg-gray-100 border-t-2 border-b-2 ">
          <tr>
            <th scope="col" className="p-4">
              <Checkbox
                id="select-all-purchaseOrders"
                label=""
                checked={selectedProducts.every((e) => e)}
                onChange={(e) =>
                  setSelectedProducts(
                    new Array(purchaseOrders.length).fill(e.target.checked)
                  )
                }
              />
            </th>
            <th scope="col" className="px-3 py-3">
              Purchase Order
            </th>
            <th scope="col" className="px-3 py-3">
              Supplier
            </th>
            <th scope="col" className="px-3 py-3">
              Destination
            </th>
            <th scope="col" className="px-3 py-3">
              Status
            </th>
            <th scope="col" className="px-3 py-3">
              Recieved
            </th>
            <th scope="col" className="px-3 py-3">
              Total
            </th>
            <th scope="col" className="px-3 py-3">
              Expected Arrival
            </th>
          </tr>
        </thead>

        <tbody className="text-xs">
          {purchaseOrders.map((p, i) => (
            <tr key={p._id} className="bg-white border-b hover:bg-gray-50 ">
              <td className="w-4 p-4">
                <Checkbox
                  id={"select-" + p._id}
                  checked={selectedProducts[i]}
                  label=""
                  onChange={(e) => {
                    const newSelectProducts = [...selectedProducts];
                    newSelectProducts[i] = e.target.checked;
                    setSelectedProducts(newSelectProducts);
                  }}
                />
              </td>

              <td
                onClick={() =>
                  router.push(`/products/purchase_orders/${p._id}`)
                }
                className="px-3 py-4 cursor-pointer "
              >
                {p.referenceNumber}
              </td>
              <td className="px-3 py-4">{p.supplier.company}</td>
              <td className="px-3 py-4">{p.destination.name}</td>
              <td className="px-3 py-4">
                <StatusText status={p.status} />
              </td>
              <td className="px-3 py-4">0 of 0</td>
              <td className="px-3 py-4">{p.total}</td>
              <td className="px-3 py-4">
                {p.shipping.arrivalDate ? new Date(p.shipping.arrivalDate).toLocaleDateString() : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
