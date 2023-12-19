
export default function StatusText({ status }: { status: string }) {
  let bgColor = 'bg-gray-100'

  switch (status) {
    case "received": bgColor = "bg-sky-200/80"; break;
    case "active": bgColor = "bg-green-200/80"; break;
    case "draft": bgColor = "bg-orange-200/80"; break;
    case "ordered": bgColor = "bg-purple-200/80"; break;
    case "inactive": bgColor = "bg-red-200/80"; break;
    case "redeemed": bgColor = "bg-sky-200/80"; break;
    case "pending": bgColor = "bg-sky-200/80"; break;
    default: "bg-red-500/40"; break;
  }

  return (
    <p className={`px-2 text-xs leading-1 pb-[2px] font-normal text-gray-900 w-min whitespace-nowrap rounded-full capitalize ${bgColor}`}>{status}</p>
  )
}
