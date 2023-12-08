
export default function StatusText({ status }: { status: string }) {
  let bgColor = 'bg-gray-100'

  switch (status) {
    case "received": bgColor = "bg-sky-500/40"; break;
    case "active": bgColor = "bg-green-500/40"; break;
    case "draft": bgColor = "bg-orange-500/40"; break;
    case "ordered": bgColor = "bg-purple-500/40"; break;
    default: "bg-red-500/40"; break;
  }

  return (
    <p className={`py-1 px-2.5 text-gray-900 w-min whitespace-nowrap rounded-full capitalize ${bgColor}`}>{status}</p>
  )
}
