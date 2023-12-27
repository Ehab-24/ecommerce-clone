import React, { useEffect } from "react";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import { ApiVariant, ApiInventoryLevel } from "@/types/product";
import Checkbox from "@/components/Checkbox";
import Text from "@/components/Text";
import { Location } from "@/types/location";
import Input from "@/components/Input";
import EditLocationsDialog from "../../dialogs/EditLocationsDialog";
import { getLocation } from "@/lib/utils";

export default function Inventory({
  loading,
  locations,
  variant,
  showDatatable = false,
  setVariant
}: {
  loading: boolean;
  locations: Location[],
  variant: ApiVariant,
  showDatatable?: boolean,
  setVariant: React.Dispatch<React.SetStateAction<ApiVariant>>;
}) {

  useEffect(() => console.log(variant.inventoryLevels), [variant.inventoryLevels])

  return (
    <Card className=" flex-col flex p-4 gap-4">
      <SectionTitle title="Inventory" />

      <Checkbox
        id="tarck-quantity"
        disabled={loading}
        label="Track Quantity"
        checked={variant.trackQuantity}
        onChange={(e) =>
          setVariant({ ...variant, trackQuantity: e.target.checked })
        }
      />

      <div className="w-full flex justify-between mt-4">
        <Text className="font-bold text-gray-800">Quantity</Text>
        <EditLocationsDialog initialLocations={variant.inventoryLevels.map(il => il.location)} locations={locations} onSave={ls => setVariant({ ...variant, inventoryLevels: ls.map(l => ({ ...defaultInventoryLevel, location: l._id })) })} />
      </div>

      {showDatatable ? <InventoryTable variant={variant} setVariant={setVariant} locations={locations} /> : (
        <div className=" flex flex-col gap-2 border-t border-gray-200 pt-4">
          {
            variant.inventoryLevels.map(il => getLocation(il.location, locations)).map(l => (
              <div key={l._id} className="flex items-center justify-between w-full">
                <Text className="text-gray-800">{l.name}</Text>
                <div className="w-40 flex justify-end">
                  {
                    variant.trackQuantity ? (
                      <Input id={variant.name + l._id} onChange={e => setVariant({ ...variant, inventoryLevels: variant.inventoryLevels.map(il => il.location === l._id ? { ...il, available: Number(e.target.value) } : il) })} />
                    ) : (
                      <Text>Not tracked</Text>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      )}

      {variant.trackQuantity && (
        <Checkbox
          id="continue-selling-when-out-of-stock"
          disabled={loading}
          label="Continue selling when out of stock"
          checked={variant.continueSellingWhenOutOfStock}
          onChange={(e) =>
            setVariant({ ...variant, continueSellingWhenOutOfStock: e.target.checked })
          }
        />
      )}

      <Checkbox
        id="has-sku"
        disabled={loading}
        label="This variant has a SKU or barcode"
        checked={variant.hasSku}
        onChange={(e) =>
          setVariant({ ...variant, hasSku: e.target.checked })
        }
      />

      {
        variant.hasSku && (
          <div className=" flex w-full gap-4">
            <Input id="variant-sku" label="SKU (Stock Keeping Unit)" value={variant.sku} onChange={e => setVariant({ ...variant, sku: e.target.value })} />
            <Input id="variant-barcode" label="Barcode (ISBN, UPC, GTIN, etc.)" value={variant.barcode} onChange={e => setVariant({ ...variant, barcode: e.target.value })} />
          </div>
        )
      }

    </Card>
  );
}

function InventoryTable({ variant, locations, setVariant }: { variant: ApiVariant, locations: Location[], setVariant: React.Dispatch<React.SetStateAction<ApiVariant>> }) {
  return (


    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Unavailable
            </th>
            <th scope="col" className="px-6 py-3">
              Committed
            </th>
            <th scope="col" className="px-6 py-3">
              Available
            </th>
            <th scope="col" className="px-6 py-3">
              On hand
            </th>
          </tr>
        </thead>
        <tbody>
          {
            variant.inventoryLevels.map((il, i) => (

              <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  {getLocation(il.location, locations).name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{il.unavailable}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{il.committed}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{il.available}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{il.onHand}</div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>

  )
}


const defaultInventoryLevel: ApiInventoryLevel = {
  location: "",
  available: 0,
}
