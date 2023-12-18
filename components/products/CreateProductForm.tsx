'use client'

import React, { useEffect } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ZodError } from "zod";
import { ApiProductSchema, Variant, ApiProduct, VariantValue, VariantOption } from "@/types/product";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import FilledButton from "@/components/buttons/FilledButton";
import { toast } from "react-hot-toast";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import SectionTitle from "@/components/SectionTitle";
import countries from "@/data/countries";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import TextButton from "@/components/buttons/TextButton";
import axios from "axios";
import Text from "@/components/Text";
import EditVariantDialog from "@/components/products/variants/EditVariantDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import EditVariantsPopover from "@/components/products/EditVariantsPopover";
import { Location } from "@/types/location";

export default function CreateProductForm({ locations }: { locations: Location[] }) {

  const [product, setProduct] = React.useState<ApiProduct>(defaultProduct);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setProduct(p => ({
      ...p, variants: multiplyArrays(p.variantOptions.map(v => v.name), ...p.variantOptions.map(v => v.values))
        .map(obj => ({ name: Object.values(obj).join(" / "), values: obj, price: p.price, costPerItem: p.costPerItem, profit: p.profit, margin: p.margin }))
    }))
  }, [product.variantOptions])

  useEffect(() => {
    if (product.costPerItem && product.price && product.price !== 0 && product.costPerItem !== 0) {
      setProduct(p => ({
        ...p,
        profit: (p.price || 0) - (product.costPerItem || 0),
        margin:
          Math.round(
            (((p.price || 0) - (product.costPerItem || 0)) / (product.price || 0)) * 10000
          ) / 100,
      }));
    }
  }, [product.price, product.costPerItem]);

  function multiplyArrays(arrayNames: string[], ...arrays: string[][]): VariantValue[] {
    const combineArrays = (result: string[][], arr: string[]) => {
      if (arr.length === 0) {
        return result;
      }
      if (result.length === 0) {
        return arr.map(item => [item]);
      }
      return result.flatMap(combination =>
        arr.map(item => [...combination, item])
      );
    };

    let result: string[][] = [];
    arrays.forEach(arr => {
      result = combineArrays(result, arr);
    });

    const ans: VariantValue[] = result.map(arr => {
      const obj: VariantValue = {};
      for (let i = 0; i < arrayNames.length; i++) {
        obj[arrayNames[i]] = arr[i];
      }
      return obj;
    });

    return ans
  }

  async function handleSave() {
    setLoading(true);

    try {

      if (!product.price) product.price = 0
      const result = ApiProductSchema.parse(product);
      const { status } = await axios.post(`/api/products`, result);

      if (status === 201) {
        toast.success("Product created successfully");
        setProduct(defaultProduct);
      }
    } catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);

    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <div className="w-full flex flex-col 2xl:flex-row justify-center gap-4">
        <div className=" flex flex-col w-full self-center gap-4 mb-8">

          <Card className="flex p-4 flex-col gap-4 items-stretch">
            <Input
              id="title"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              label="Title"
              placeholder="Title"
              disabled={loading}
            />
            <TextArea
              label="Description"
              disabled={loading}
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </Card>

          <Card className="flex p-4 flex-col gap-4 items-stretch">
            <SectionTitle title="Media" />

            <div
              className={
                product.media.length === 0
                  ? "w-full"
                  : "w-full gap-2 grid grid-cols-2 lg:grid-cols-3"
              }
            >
              {product.media.map((m, i) => (
                <div key={i} className="rounded-md overflow-hidden">
                  <Image
                    src={m.url}
                    alt={product.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}

              <ImageUploader
                onSave={(url) =>
                  setProduct({
                    ...product,
                    media: [...product.media, { type: "image", url }],
                  })
                }
              />
            </div>
          </Card>

          <Card className="flex p-4 flex-col gap-4 items-stretch">
            <SectionTitle title="Pricing" />
            <Pricing
              loading={loading}
              product={product}
              setProduct={setProduct}
            />
          </Card>

          <Card className=" flex-col flex p-4 gap-4">
            <SectionTitle title="Inventory" />
            <Inventory
              loading={loading}
              product={product}
              setProduct={setProduct}
            />
          </Card>

          <Variants loading={loading} locations={locations} product={product} setProduct={setProduct} />

          <Card className=" flex-col flex p-4 gap-4">
            <SectionTitle title="Shipping" />
            <Shipping
              loading={loading}
              product={product}
              setProduct={setProduct}
            />
          </Card>


          <SearchEngineListing
            product={product}
            setProduct={setProduct}
            loading={loading}
          />
        </div>

        <div className="flex flex-col 2xl:max-w-[280px] w-full gap-4">
          <Card className=" flex-col flex p-4 gap-4">
            <SectionTitle title="Status" />
            <Select
              label="Status"
              disabled={loading}
              options={[
                { label: "Active", value: "active" },
                { label: "Draft", value: "draft" },
              ]}
              onChange={(e) =>
                setProduct({
                  ...product,
                  status: e.target.value as "active" | "draft",
                })
              }
            />
          </Card>

          <Card className=" flex-col flex p-4 gap-4">
            <SectionTitle title="Product Organization" />
            <ProductOrganization
              loading={loading}
              product={product}
              setProduct={setProduct}
            />
          </Card>
        </div>
      </div>

      <div className="w-full max-w-4xl flex justify-end mb-8">
        {loading ? (
          <Spinner />
        ) : (
          <FilledButton onClick={handleSave}>Save</FilledButton>
        )}
      </div>
    </>
  )
}


function Pricing({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <div className="flex gap-4 mt-4">
        <Input
          id="price"
          disabled={loading}
          label="Price"
          placeholder="$ 0.00"
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="compare-at-price"
          value={product.compareAtPrice}
          disabled={loading}
          label="Compare-at Price"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, compareAtPrice: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
      </div>
      <Checkbox
        id="charge-taxes"
        disabled={loading}
        label="Charge Taxes on this Product"
        checked={product.chargeTaxes}
        onChange={(e) =>
          setProduct({ ...product, chargeTaxes: e.target.checked })
        }
      />
      <div className="flex gap-4 mt-4">
        <Input
          disabled={loading}
          id="cost-per-item"
          label="Cost per Item"
          placeholder="$ 0.00"
          type="number"
          value={product.costPerItem}
          onChange={(e) =>
            setProduct({ ...product, costPerItem: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="profit"
          disabled={true}
          value={product.profit}
          label="Profit"
          placeholder="--"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, profit: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="margin"
          disabled={true}
          label="Margin"
          value={product.margin}
          placeholder="--"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, margin: Number(e.target.value) })
          }
          icon={<Text>% </Text>}
        />
      </div>
    </>
  );
}

function Inventory({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Checkbox
        id="tarck-quantity"
        disabled={loading}
        label="Track Quantity"
        onChange={(e) =>
          setProduct({ ...product, trackQuantity: e.target.checked })
        }
      />

      <div className=" flex items-center w-full justify-between mb-4">
        <p className="text-sm text-gray-900">Block 6-C2 Park</p>
        {product.trackQuantity ? (
          <div>
            <Input
              id="quantity"
              disabled={loading}
              placeholder="0"
              type="number"
              onChange={(e) =>
                setProduct({ ...product, quantity: Number(e.target.value) })
              }
            />
          </div>
        ) : (
          <p className=" text-sm text-gray-700">Not Tracked</p>
        )}
      </div>
      {product.trackQuantity && (
        <Checkbox
          id="continue-selling-when-out-of-stock"
          disabled={loading}
          label="Continue selling when out of stock"
          onChange={(e) =>
            setProduct({
              ...product,
              continueSellingWhenOutOfStock: e.target.checked,
            })
          }
        />
      )}
      <Checkbox
        id="has-sku"
        disabled={loading}
        label="This product has a SKU or barcode"
        onChange={(e) => setProduct({ ...product, hasSku: e.target.checked })}
      />

      {product.hasSku && (
        <div className=" w-full flex gap-4 mt-4">
          <Input
            id="product-sku"
            disabled={loading}
            label="SKU (Stock Keeping Unit)"
            onChange={(e) => setProduct({ ...product, sku: e.target.value })}
          />
          <Input
            id="product-barcode"
            placeholder=""
            label="Barcode (ISBN, UPC, GTIN, etc.)"
            onChange={(e) =>
              setProduct({ ...product, barcode: e.target.value })
            }
          />
        </div>
      )}
    </>
  );
}

function Variants({
  loading,
  locations,
  product,
  setProduct,
}: {
  loading: boolean;
  locations: Location[];
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {

  const [selectedVariants, setSelectedVariants] = React.useState<Variant[]>([]);

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
              <TextButton onClick={() => { }}>All locations</TextButton>
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

function Shipping({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Checkbox
        id="physical-product"
        disabled={loading}
        label="This is a physical product"
        checked={product.isPhysicalProduct}
        onChange={(e) =>
          setProduct({ ...product, isPhysicalProduct: e.target.checked })
        }
      />

      <div className="h-4" />
      {product.isPhysicalProduct ? (
        <>
          <div className=" w-full flex gap-4 items-end justify-between mb-4">
            <div className="w-full">
              <Input
                disabled={loading}
                id="weight"
                label="Weight"
                placeholder="0.0"
                type="number"
                onChange={(e) =>
                  setProduct({ ...product, weight: Number(e.target.value) })
                }
              />
            </div>

            <div className="w-full">
              <Select
                label="Weight Unit"
                disabled={loading}
                options={[
                  { value: "kg", label: "kg" },
                  { value: "g", label: "g" },
                  { value: "lb", label: "lb" },
                  { value: "oz", label: "oz" },
                ]}
                onChange={(e) =>
                  setProduct({ ...product, weightUnit: e.target.value })
                }
              />
            </div>
          </div>

          <Select
            label="Country/Region of origin"
            disabled={loading}
            options={countries}
            onChange={(e) =>
              setProduct({ ...product, countryOfOrigin: e.target.value })
            }
          />
        </>
      ) : (
        <p>Customers won’t enter shipping details at checkout.</p>
      )}
    </>
  );
}

function ProductOrganization({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Input
        id="product-category"
        disabled={loading}
        label="Product category"
        placeholder="Apparel & Accessories"
        onChange={(e) =>
          setProduct({ ...product, productCategory: e.target.value })
        }
      />
      <Input
        id="product-type"
        disabled={loading}
        label="Product Type"
        onChange={(e) =>
          setProduct({ ...product, productType: e.target.value })
        }
      />
      <Input
        id="vendor"
        label="Vendor"
        disabled={loading}
        onChange={(e) => setProduct({ ...product, vendor: e.target.value })}
      />
      <Input
        id="collections"
        label="Collections"
        disabled={loading}
        onChange={(e) =>
          setProduct({ ...product, collections: e.target.value })
        }
      />

      <Input
        id="tags"
        label="Tags"
        disabled={loading}
        onKeyDown={(e) => {
          const value = e.currentTarget.value;
          if (e.key === "Enter" && value !== "") {
            setProduct({ ...product, tags: [...product.tags, value] });
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="flex gap-2">
        {product.tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}{" "}
            <button
              disabled={loading}
              onClick={() =>
                setProduct({
                  ...product,
                  tags: product.tags.filter((t) => t !== tag),
                })
              }
            >
              <IoIosClose size={20} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function SearchEngineListing({
  product,
  setProduct,
  loading,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [edit, setEdit] = React.useState<boolean>(false);

  return (
    <Card className="flex p-4  flex-col items-stretch">
      <div className="flex w-full justify-between">
        <SectionTitle title="Search Engine Listing" />
        {!edit && <TextButton onClick={() => setEdit(true)}>Edit</TextButton>}
      </div>
      <p className=" text-xs text-gray-900">
        Add a title and description to see how this collection might appear in a
        search engine listing
      </p>
      {edit && (
        <>
          <div className="h-8" />
          <Input
            id="seo-title"
            value={product.seo.title}
            disabled={loading}
            onChange={(e) =>
              setProduct({
                ...product,
                seo: { ...product.seo, title: e.target.value },
              })
            }
            label="SEO Title"
          />
          <div className="h-4" />
          <TextArea
            label="SEO Description"
            disabled={loading}
            value={product.seo.description}
            onChange={(e) =>
              setProduct({
                ...product,
                seo: { ...product.seo, title: e.target.value },
              })
            }
          />
        </>
      )}
    </Card>
  );
}

function VariantOptionPopover({ option, variants, selectedVariants, setSelectedVariants }: { option: VariantOption, variants: Variant[], selectedVariants: Variant[], setSelectedVariants: React.Dispatch<React.SetStateAction<Variant[]>> }) {

  function handleChange(checked: boolean, val: string) {
    if (checked) {
      const newVariants: Variant[] = [...selectedVariants, ...variants.filter(v => v.values[option.name] === val)]
      const uniqueVariants: Variant[] = newVariants.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i)
      setSelectedVariants(uniqueVariants)
    } else {
      setSelectedVariants(selectedVariants.filter(v => v.values[option.name] !== val))
    }
  }

  function isChecked(val: string) {
    return selectedVariants.filter(v => v.values[option.name] === val).length === variants.filter(v => v.values[option.name] === val).length
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-blue-700 hover:underline" onClick={() => { }}>
          <Text className="capitalize">{option.name}</Text>
          <IoIosArrowDown size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-min p-3 rounded-xl">
        <div className="flex flex-col gap-2">
          {option.values.map((val) => (
            <Checkbox key={val} id={option.name + val} checked={isChecked(val)} onChange={e => handleChange(e.target.checked, val)} label={val} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

const defaultProduct: ApiProduct = {
  locations: [],
  title: "",
  chargeTaxes: false,
  quantity: 0,
  tax: 0,
  taxRate: 0,
  trackQuantity: false,
  continueSellingWhenOutOfStock: false,
  hasSku: false,
  isPhysicalProduct: true,
  weight: 0,
  weightUnit: "kg",
  countryOfOrigin: "",
  status: "active",
  vendor: "",
  collection: "",
  variants: [],
  variantOptions: [],
  media: [],
  seo: {
    title: "",
    description: "",
  },
  tags: [],
};
