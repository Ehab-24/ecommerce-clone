
import TextButton from "@/components/buttons/TextButton"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Collection } from "@/types/collection"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { IoIosArrowDown, IoIosSearch } from "react-icons/io"
import Input from "@/components/Input"
import Text from "@/components/Text"

export default function CollectionFilterPopover({ collections, selectedCollection, onChange }: { collections: Collection[], selectedCollection: Collection | null, onChange: (collectionId: string | null) => void | Promise<void> }) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2 gap-1 flex items-center rounded-lg h-min py-1 text-gray-800 text-xs border-dashed border-gray-200 hover:border-solid hover:bg-transparent" onClick={() => { }}>
          <Text className="text-gray-800">Collection</Text>
          <IoIosArrowDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-3 rounded-xl">
        <div className="flex flex-col gap-2 w-full items-start">

          <Input id="search-collection" placeholder="Search for collections" className="w-full" icon={<IoIosSearch size={16} className="text-gray-800" />} />

          <RadioGroup defaultValue={selectedCollection?._id} onValueChange={onChange} className="mt-4 flex flex-col gap-2">
            {
              collections.map(c => (
                <div key={c._id} className="flex items-center space-x-2">
                  <RadioGroupItem value={c._id} id={c._id} />
                  <Label htmlFor="option-one" className="text-xs text-gray-800">{c.title}</Label>
                </div>
              ))
            }
          </RadioGroup>

          <TextButton className="mt-2" disabled={selectedCollection === null} onClick={() => onChange(null)}>
            Clear
          </TextButton>

        </div>
      </PopoverContent>
    </Popover >
  )
}

