import HeaderItem from "@/types/headerItem";
import Text from "./Text";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function SortableHeader({ header, onClick, sorted }: { header: HeaderItem, sorted: "asc" | "desc" | "none", onClick: () => void }) {

  return (
    <button onClick={onClick} className="flex gap-1 items-center">
      <Text className="text-gray-800">{header.label}</Text>
      <div className="flex flex-col">
        <IoIosArrowUp size={10} className={sorted === "asc" ? "text-gray-800" : "text-gray-400"} />
        <IoIosArrowDown size={10} className={sorted === "desc" ? "text-gray-800" : "text-gray-400"} />
      </div>
    </button>
  )

}
