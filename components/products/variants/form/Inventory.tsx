import React, { useEffect } from "react";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import { Variant } from "@/types/product";
import Checkbox from "@/components/Checkbox";
import TextButton from "@/components/buttons/TextButton";
import Text from "@/components/Text";
import { Location } from "@/types/location";
import Input from "@/components/Input";

export default function Inventory({
  loading,
  locations,
  variant,
  setVariant
}: {
  loading: boolean;
  locations: Location[],
  variant: Variant,
  setVariant: React.Dispatch<React.SetStateAction<Variant>>;
}) {

  useEffect(() => console.log(variant), [variant])

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
        {/*TODOL Edit location dialog*/}
        <TextButton>Edit locations</TextButton>
      </div>

      <div className=" flex flex-col gap-2 border-t border-gray-200 pt-4">
        {
          locations.map(l => (
            <div key={l._id} className="flex items-center justify-between w-full">
              <Text className="text-gray-800">{l.name}</Text>
              {/**TODO: */}
              <div className="w-40 flex justify-end">
                {
                  variant.trackQuantity ? (
                    <Input id={variant.name + l._id} onChange={e => { }} />
                  ) : (
                    <Text>Not tracked</Text>
                  )
                }
              </div>
            </div>
          ))
        }
      </div>


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
