import Card from "@/components/Card";
import React from "react";
import EditVariantDialog from "@/components/products/variants/EditVariantDialog";
import EditVariantsPopover from "@/components/products/EditVariantsPopover";
import { RxDragHandleDots2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ApiProduct, Variant } from "@/types/product";
import SectionTitle from "@/components/SectionTitle";
import Select from "@/components/Select";
import Input from "@/components/Input";
import { IoIosClose } from "react-icons/io";
import TextButton from "@/components/buttons/TextButton";
import Text from "@/components/Text";
import Checkbox from "@/components/Checkbox";
import { Location } from "@/types/location";
import AllLocationsPopover from "./AllLocationsPopover";
import VariantOptionPopover from "./VariantOptionPopover";

export default function VariantsCard({
  loading,
  locations,
  product,
  setProduct,
}: {
  loading: boolean;
  locations: Location[];
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<ApiProduct>>;
}) {

  const [selectedVariants, setSelectedVariants] = React.useState<Variant[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);

  function variantsInclude(name: string): boolean {
    return product.variantOptions.map((v) => v.name).includes(name);
  }

  function getPlaceholder(name: string): string {
    switch (name) {
      case "color":
        return "Red, Blue, Green";
      case "size":
        return "Small, Medium, Large";
      case "material":
        return "Cotton, Polyester";
      case "style":
        return "Slim fit, Regular fit";
      default:
        return "";
    }
  }

  function getNextVariant(): string {
    const vs: string[] = ["color", "size", "material", "style"];
    for (let i = 0; i < vs.length; i++) {
      if (!product.variantOptions.map((v) => v.name).includes(vs[i]))
        return vs[i];
    }
    return "color";
  }


  return (
    <Card className=" flex-col w-full py-4 flex">

      <div className="px-4">
        <SectionTitle title="Variants" />
      </div>

      {product.variantOptions.map((variant, index) => (
        <div
          key={index}
          className="flex px-4 flex-col border-b pb-4 border-gray-300"
        >
          <div className="flex pt-4 gap-4 w-full items-start">
            <button disabled={true}>
              <RxDragHandleDots2
                className="text-sm text-[#1a1a1a] mt-7"
                size={20}
              />
            </button>

            <div className="flex-col w-full">
              <Select
                disabled={loading}
                value={variant.name}
                label="Option Name"
                onChange={(e) => {
                  const newVariants = [...product.variantOptions];
                  newVariants[index].name = e.target.value as string;
                  setProduct({ ...product, variantOptions: newVariants });
                }}
                options={[
                  {
                    value: "color",
                    label: "Color",
                    disabled: variantsInclude("color"),
                  },
                  {
                    value: "size",
                    label: "Size",
                    disabled: variantsInclude("size"),
                  },
                  {
                    value: "material",
                    label: "Material",
                    disabled: variantsInclude("material"),
                  },
                  {
                    value: "style",
                    label: "Style",
                    disabled: variantsInclude("style"),
                  },
                ]}
              />

              <div className="w-full mt-4">
                <Input
                  id="variant-values"
                  disabled={loading}
                  label="Option Values"
                  placeholder={getPlaceholder(variant.name)}
                  onKeyDown={(e) => {
                    const value = e.currentTarget.value;
                    if (e.key === "Enter" && value !== "") {
                      const newVariants = [...product.variantOptions];
                      newVariants[index].values = [
                        ...newVariants[index].values,
                        value,
                      ];
                      setProduct({ ...product, variantOptions: newVariants });
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>

              <div className="w-full flex mt-4 gap-1">
                {variant.values.map((v, i) => (
                  <div
                    key={i}
                    className="bg-slate-200 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    {v}
                    <button
                      disabled={loading}
                      onClick={() => {
                        const newVariants = [...product.variantOptions];
                        newVariants[index].values = newVariants[
                          index
                        ].values.filter((val) => val !== v);
                        setProduct({ ...product, variantOptions: newVariants });
                      }}
                    >
                      <IoIosClose size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              onClick={() => setProduct({ ...product, variantOptions: product.variantOptions.filter((v) => v !== variant) })}
              className="p-2 rounded-md self-start mt-[22px] hover:bg-black/10 transition-all"
            >
              <RiDeleteBin6Line className="text-sm text-[#1a1a1a]" />
            </button>
          </div>
        </div>
      ))}

      <div className="flex px-4 mt-4">
        <TextButton
          onClick={() =>
            setProduct({ ...product, variantOptions: [...product.variantOptions, { name: getNextVariant(), values: [] }] })
          }
        >
          {product.variants.length === 0
            ? "+ Add options like color or size"
            : "+ Add another option"}
        </TextButton>
      </div>

      {
        product.variants.length > 0 && (
          <div className="w-full mt-4 flex px-4 pt-4 border-t border-gray-200 gap-2 flex-col">
            <div className="flex gap-4 w-full">
              <Text>Select</Text>
              <TextButton onClick={() => setSelectedVariants(product.variants)}>All</TextButton>
              <TextButton onClick={() => setSelectedVariants([])}>None</TextButton>
              {
                product.variantOptions.map(v => (
                  <VariantOptionPopover key={v.name} option={v} variants={product.variants} selectedVariants={selectedVariants} setSelectedVariants={setSelectedVariants} />
                ))
              }
            </div>
            <div className="flex gap-4 ml-2 w-full">
              <Text>Available inventory at:</Text>
              <AllLocationsPopover locations={locations} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
            </div>
          </div>
        )
      }

      {
        product.variants.length > 0 && (
          <div className="flex mt-4 justify-between border-t border-gray-200 p-4">
            <Checkbox id="showing-variants" checked={selectedVariants.length === product.variants.length} label={selectedVariants.length > 0 ? `${selectedVariants.length} selected` : `Showing ${product.variants.length} variants`} onChange={e => {
              e.stopPropagation()
              if (e.target.checked) {
                setSelectedVariants(product.variants)
              } else {
                setSelectedVariants([])
              }
            }} />

            {
              selectedVariants.length === 0 && <EditVariantsPopover locations={locations} product={product} setProduct={setProduct} />
            }

          </div>
        )
      }

      {
        product.variants.length > 0 && (
          product.variants.map(v => (
            <div key={v.name} className="flex h-full border-t border-gray-200 w-full">
              <div className="h-full mt-6 grid place-items-center pl-4">
                <Checkbox id={v.name} checked={selectedVariants.includes(v)} onChange={e => {
                  e.stopPropagation()
                  if (e.target.checked) {
                    setSelectedVariants([...selectedVariants, v])
                  } else {
                    setSelectedVariants(selectedVariants.filter(sv => sv !== v))
                  }
                }} />
              </div>

              <EditVariantDialog initialVariant={v} onSave={v => {
                setProduct({ ...product, variants: product.variants.map(pv => pv.name === v.name ? v : pv) })
              }} button={
                <div className="flex p-4 w-full hover:bg-gray-100 bg-white transition-all justify-between cursor-pointer">
                  <div className="flex flex-col w-full items-start h-full justify-center">
                    <Text className="font-bold text-gray-800">{v.name}</Text>
                    <Text className="text-gray-800">{v.sku}</Text>
                  </div>
                  <div className="flex flex-col whitespace-nowrap items-end">
                    <Text className="text-gray-800">$ {v.price}</Text>
                    <Text className="text-gray-800">33 available at 2 locations</Text>
                  </div>
                </div>

              } />
            </div>
          ))
        )
      }

      {
        selectedVariants.length > 0 && (
          <div className="p-3 my-8 shadow-md shadow-gray-300 bg-white border border-gray-300 rounded-xl w-min h-min self-center">
            <EditVariantsPopover locations={locations} product={product} setProduct={setProduct} variant="sticky" />
          </div>
        )
      }

      {
        product.variants.length > 0 && (
          <div className="flex border-t border-gray-200 pt-4 px-4 justify-between">
            <Text className="text-gray-800">Total inventory at all locations</Text>
            <Text className="text-gray-800">0 available</Text>
          </div>
        )
      }

    </Card>
  );
}


