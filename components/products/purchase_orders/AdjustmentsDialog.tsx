
import React from "react"
import { IoIosClose } from "react-icons/io";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TextButton from "@/components/buttons/TextButton"
import TitleMini from "@/components/TitleMini"
import MyInput from "@/components/Input"
import Select from "@/components/Select";
import { Adjustment } from "@/types/adjustment";


export default function AdjustmentsDialog({ text, adjustments, setAdjustments }: { text: string, adjustments: Adjustment[], setAdjustments: React.Dispatch<React.SetStateAction<Adjustment[]>> }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TextButton onClick={() => { }}>{text}</TextButton>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Manage cost summary</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col">

          <div className=" flex w-full mb-4">
            <div className="w-full">
              <TitleMini text="Adjustment" />
            </div>
            <TitleMini text="Amount" />
          </div>

          <div className=" flex flex-col gap-4 mb-4">
            {
              adjustments.map(a => (
                <div key={a.name} className=" flex gap-2 w-full">
                  <Select onChange={() => { }} options={[
                    { "label": "Select", "value": "", "disabled": true },
                    { "label": "Shipping", "value": "Shipping" },
                    { "label": "Customs duties", "value": "Customs duties" },
                    { "label": "Discount", "value": "Discount" },
                    { "label": "Foreign transaction fee", "value": "Foreign transaction fee" },
                    { "label": "Freight fee", "value": "Freight fee" },
                    { "label": "Insurance", "value": "Insurance" },
                    { "label": "Rush fee", "value": "Rush fee" },
                    { "label": "Surcharge", "value": "Surcharge" },
                    { "label": "Other", "value": "otherAdjustment" }

                  ]} />
                  <MyInput id={a.name} value={a.value} onChange={() => { }} label="" placeholder="" />
                  <button onClick={() => setAdjustments(as => as.filter(_a => _a !== a))}>
                    <IoIosClose size={24} />
                  </button>
                </div>
              ))
            }

          </div>

          <TextButton className="self-start" onClick={() => setAdjustments(as => [...as, { name: "", value: 0 }])}>Add adjustment</TextButton>
        </div>
        <DialogFooter>
          <Button size={"sm"} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

