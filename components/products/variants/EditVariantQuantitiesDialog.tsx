import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OutlinedButton from "../../buttons/OutlinedButton";
import FilledButton from "../../buttons/FilledButton";
import { Variant } from "@/types/product";
import Text from "@/components/Text";
import Input from "@/components/Input";
import { Location } from "@/types/location";
import { IoIosArrowForward } from "react-icons/io";

export default function EditVariantsQuantitiesDialog({ initialVariants, locations, onSave }: { initialVariants: Variant[], locations: Location[], onSave: (variants: Variant[]) => void }) {

  const [open, setOpen] = React.useState(false);
  const [variants, setVariants] = React.useState<Variant[]>(initialVariants)
  const [quantityForAll, setQuantityForAll] = React.useState<number | undefined>(undefined)
  const [currentLocation, setCurrentLocation] = React.useState<Location | undefined>(undefined)

  return (
    <Dialog open={open} onOpenChange={o => {
      setOpen(o)
      setCurrentLocation(undefined)
    }}>
      <DialogTrigger asChild>
        <button onClick={() => { }} className="p-2 bg-white hover:bg-gray-100 rounded-xl w-full flex justify-start text-xs text-gray-800">Edit quantities</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit quantities</DialogTitle>
        </DialogHeader>

        {
          currentLocation === undefined ? (
            <ChooseLocation locations={locations} setCurrentLocation={setCurrentLocation} />
          ) : (
            <div className="flex flex-col">
              <Text className="text-gray-800 px-4 pt-4">Editing quantities at <span className="font-bold">{currentLocation.name}.</span></Text>
              <div className="flex gap-1 px-4 my-4 items-end w-full">
                <Input id="edit-all-quantity" label="Apply a quantity to all variants" icon={<Text>$</Text>} placeholder="0.00" value={quantityForAll} onChange={e => setQuantityForAll(Number(e.target.value))} />
                <div className="h-8 flex items-stretch">
                  <OutlinedButton disabled={quantityForAll === undefined} onClick={() => {
                    const newVariants: Variant[] = [...variants]
                    newVariants.forEach(v => v.price = quantityForAll!)
                    setVariants(newVariants)
                  }}>
                    Apply to all
                  </OutlinedButton>
                </div>
              </div>

              <div className="flex w-full justify-end pb-2 mt-6 px-4">
                <div className="w-full" />
                <Text className="font-bold min-w-40 w-40">Available</Text>
                <Text className="font-bold min-w-40 w-40">On hand</Text>
              </div>

              {
                variants.map(v => (
                  <div key={v.name} className="flex w-full justify-end p-4 bg-white border-t border-gray-200 items-center">
                    <Text className="text-gray-800 w-full">{v.name}</Text>
                    <Text className="text-gray-800 w-40">{v.quantity || "-"}</Text>
                    <div className="w-40">
                      <Input id={v.name} value={v.quantity} onChange={(e) => {
                        const newVariants: Variant[] = [...variants]
                        newVariants.find(v => v.name === e.target.id)!.quantity = Number(e.target.value)
                        setVariants(newVariants)
                      }} />
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }

        <DialogFooter>
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          <FilledButton onClick={() => {
            onSave(variants)
            setOpen(false)
          }}>Done</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ChooseLocation({ locations, setCurrentLocation }: { locations: Location[], setCurrentLocation: React.Dispatch<React.SetStateAction<Location | undefined>> }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Text>Choose a location where you want to edit quantities.</Text>
      <div className="flex flex-col w-full">
        {
          locations.map(l => (
            <button key={l._id} className="p-3 border-t border-b border-gray-200 bg-white hover:bg-gray-100 transition-all flex justify-between" onClick={() => setCurrentLocation(l)}>
              <Text className="text-gray-800">{l.name}</Text>
              <IoIosArrowForward size={14} />
            </button>
          ))
        }
      </div>
    </div>
  )
}
