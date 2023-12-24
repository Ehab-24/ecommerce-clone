import { ApiProduct } from "@/types/product";
import Card from "../Card";
import SectionTitle from "../SectionTitle";
import Checkbox from "../Checkbox";
import Input from "../Input";
import Select from "../Select";
import countries from "@/data/countries";


export default function Shipping({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <Card className=" flex-col flex p-4 gap-4">
      <SectionTitle title="Shipping" />
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
    </Card>
  );
}
