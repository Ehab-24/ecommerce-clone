import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import EditVariantsPriceDialog from "./variants/EditVariantsPricesDialog"
import { ApiProduct } from "@/types/product"
import EditVariantsQuantitiesDialog from "./variants/EditVariantQuantitiesDialog"
import EditVariantsSKUsDialog from "./variants/EditVariantsSKUs"
import EditVariantsRegionsDialog from "./variants/EditVariantRegionDialog"
import EditVariantsHSCodesDialog from "./variants/EditVariantsHSCodes"
import EditVariantsBarcodesDialog from "./variants/EditVariantsBarcodesDialog"
import EditVariantsLocationsDialog from "./variants/EditVariantsLocationsDialog"
import { IoIosArrowDown } from "react-icons/io"
import { Location } from "@/types/location"

export default function EditVariantsPopover({ product, locations, setProduct }: { product: ApiProduct, locations: Location[], setProduct: React.Dispatch<React.SetStateAction<ApiProduct>> }) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button onClick={() => { }}
          className="select-none flex gap-1 items-center rounded-lg border-2 border-neutral-200 py-1
            hover:bg-neutral-200 shadow-sm shadow-neutral-500/10
            hover:shadow-lg hover:shadow-neutral-900/20
            px-2 text-center align-middle font-sans text-xs font-bold 
            text-neutral-900 transition-all focus:ring 
            focus:ring-neutral-300 active:opacity-[0.85] disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none bg-neutral-50"
        >
          Edit
          <IoIosArrowDown />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-1 rounded-xl">
        <div className="flex flex-col w-full items-start">

          <EditVariantsPriceDialog
            initialVariants={product.variants}
            onSave={(variants) => setProduct({ ...product, variants })}
          />

          <EditVariantsQuantitiesDialog
            locations={locations}
            initialVariants={product.variants}
            onSave={(variants) => setProduct({ ...product, variants })}
          />

          <EditVariantsSKUsDialog
            initialVariants={product.variants}
            onSave={(variants) => setProduct({ ...product, variants })}
          />

          <EditVariantsBarcodesDialog
            initialVariants={product.variants}
            onSave={(variants) => setProduct({ ...product, variants })}
          />

          <EditVariantsHSCodesDialog
            initialVariants={product.variants}
            onSave={(variants) => setProduct({ ...product, variants })}
          />

          <EditVariantsRegionsDialog
            initialVariants={product.variants}
            onSave={(variants) => setProduct({ ...product, variants })}
          />

          <EditVariantsLocationsDialog
            allLocations={locations}
            onSave={(locations) => setProduct({ ...product, locations })}
          />

        </div>
      </PopoverContent>
    </Popover>
  )
}

