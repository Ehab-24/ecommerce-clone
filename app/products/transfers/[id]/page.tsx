import EditTransferForm from "@/components/products/transfers/EdittransferForm"
import { apiUrl } from "@/lib/utils"
import { Transfer } from "@/types/transfer"
import { Location } from "@/types/location"

export default async function TransferPage({ params }: { params: { id: string } }) {

  const requests = [
    fetch(apiUrl("/api/settings/locations"), { cache: "no-cache" }),
    fetch(apiUrl(`/api/products/transfers/${params.id}`), { cache: "no-cache" }),
  ]

  const [locationsRes, transferRes] = await Promise.all(requests)
  if (!locationsRes.ok) {
    throw new Error("Failed to fetch locations")
  }
  if (!transferRes.ok) {
    throw new Error("Failed to fetch transfers")
  }

  const [locations, transfer] = await Promise.all([locationsRes.json(), transferRes.json()]) as [Location[], Transfer]

  return (
    <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
      <EditTransferForm locations={locations} initialTransfer={transfer} />
    </div>
  )
}

