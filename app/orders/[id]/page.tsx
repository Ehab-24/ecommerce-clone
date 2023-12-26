import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Heading from "@/components/Heading";
import MoreActionsPopover from "@/components/orders/single/MoreActionsPopover";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import { apiUrl } from "@/lib/utils";
import EditOrderForm from "@/components/orders/EditOrderForm";

export const runtime = "edge"

export default async function OrderPage({ params }: { params: { id: string } }) {
  const res = await fetch(apiUrl(`api/orders/${params.id}`))
  if (!res.ok) throw new Error("Failed to fetch order")
  const order = await res.json()

  return (
    <div className="min-h-screen md:p-5 md:w-[100%] lg:px-[20%]">
      <div className="flex flex-col sm:flex-row gap-4 justify-between p-5 md:p-0 md:pb-5">
        <div className="flex gap-4">
          <Link href="/orders">
            <FaArrowLeft className="text-xs mt-2.5 text-neutral-800" />
          </Link>
          <div>
            <div className="flex gap-4 items-center">
              <Heading>#{params.id.slice(-4)}</Heading>
              <div className="flex items-center rounded-xl px-2 py-0.5 gap-2 bg-gray-300">
                <span className="rounded-full outline-1 p-1 bg-gray-500"></span>
                <p className="text-gray-500 text-xs font-semibold">
                  {order?.payment_status}
                </p>
              </div>
              <div className="flex items-center rounded-xl px-2 py-0.5 gap-2 bg-yellow-100">
                <span className="rounded-full outline-1 p-1 bg-yellow-500"></span>
                <p className="text-gray-500 text-xs font-semibold">
                  {order?.fulfillment_status}
                </p>
              </div>
            </div>
            <p className="text-xs py-1 text-neutral-500">
              {order.date?.slice(0, 10) ?? ""}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center justify-end">
          <OutlinedButton>Refund</OutlinedButton>
          <Link href={`/orders/${params.id}/edit`}>
            <OutlinedButton>Edit</OutlinedButton>
          </Link>
          <MoreActionsPopover />
        </div>
      </div>

      <EditOrderForm initialOrder={order} />
    </div>
  );
};
