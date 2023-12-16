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
import Text from "../../Text";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import { PiImagesSquareThin } from "react-icons/pi";

export default function EditVariantImagesDialog({ onSave, altText }: { altText: string, onSave: (imageUrls: string[]) => void }) {

  const [images, setImages] = React.useState<string[]>([])
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => { }} className="rounded-md overflow-hidden grid mt-4 mr-2 hover:bg-gray-100 transition-all hover:border-gray-500 hover:text-gray-800 text-gray-300 place-items-center bg-white border-2 border-gray-300 border-dashed h-12 w-12 min-w-[48px]" >
          <PiImagesSquareThin size={20} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update variant image</DialogTitle>
        </DialogHeader>

        <div className=" flex flex-col px-4 gap-4 my-4">

          <Text>You can only choose images as variant media</Text>

          <div className="w-full h-40 flex gap-2">
            <div className="h-full aspect-square">
              <ImageUploader onSave={url => setImages([...images, url])} text={<Text className="text-gray-800 bg-gray-100 p-1 rounded-md">Add image</Text>} />
            </div>
            {
              images.map(url => (
                <div key={url} className="h-full aspect-square bg-gray-100">
                  <Image src={url} alt={"variant-image"} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
                </div>
              ))
            }
          </div>

        </div>

        <DialogFooter>
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          <FilledButton onClick={() => {
            onSave(images)
            setOpen(false)
          }}>Done</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
