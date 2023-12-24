import Text from "../Text";
import { DateRange } from "react-day-picker";
import ManagePublishingPopover from "./popovers/ManagePublishingPopover";
import EditPublishmentDateDialog from "./dialogs/EditPublishmentDate";
import { SalesChannel } from "@/types/salesChannel";
import { ApiProduct } from "@/types/product";
import { Market } from "@/types/market";
import { useState } from "react";
import Card from "../Card";

export function Publishing({ salesChannels, markets, product, setProduct }: { salesChannels: SalesChannel[], product: ApiProduct, setProduct: React.Dispatch<React.SetStateAction<ApiProduct>>, markets: Market[], }) {

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  return (
    <Card className="flex flex-col p-4">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm text-gray-800 font-bold">Publishing</p>
        <ManagePublishingPopover product={product} setProduct={setProduct} salesChannels={salesChannels} markets={markets} />
      </div>

      <div className="flex flex-col gap-1 mt-2">

        <Text className="text-black font-bold">Sales channel</Text>
        <div className="flex flex-col mt-2 w-full">
          {
            salesChannels.map(s => (
              <div key={s._id} className="flex w-full justify-between items-center">
                <Text className="text-gray-800">☐&nbsp;&nbsp;{s.name}</Text>
                <EditPublishmentDateDialog onSave={async (dateRange) => setDate(dateRange)} />
              </div>
            ))
          }
        </div>

        <Text className="text-black font-bold mt-4">Markets</Text>
        <Text className="text-gray-800">
          ☐&nbsp;&nbsp;{
            markets.filter(m => product.markets.includes(m._id)).map(m => m.name).join(" and ")
          }
        </Text>

      </div>

    </Card>
  )
}
