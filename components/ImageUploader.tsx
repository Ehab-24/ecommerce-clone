import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Text from "./Text";
import Spinner from "./Spinner";

export default function ImageUploader({ onSave }: { onSave: (imageUrl: string) => void }) {
  const [loading, setLoading] = useState(false);
  const uploadPreset = "apaz6cpw"
  const cloudName = "db6b8spcx"

  async function uploadImage(file: any) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      if (response.status === 200) {
        return response.data.secure_url;
      } else {
        throw new Error(response.data.message || "Failed to upload image");
      }
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles: any[]) => {

      setLoading(true)

      try {
        const file = acceptedFiles[0];
        const imageUrl = await uploadImage(file);
        onSave(imageUrl)
      } catch (error) {
        toast.error("Error uploading image:")
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="w-full h-40 cursor-pointer border-dashed border-gray-300 hover:bg-gray-100 rounded-lg border-2">

      {
        loading ? (
          <Spinner />
        ) : (
          <input {...getInputProps()} />
        )
      }

      {
        !loading && (
          <div className="flex p-1 flex-col text-center justify-center items-center h-full">
            <Text >Drag and drop an image here</Text>
            <Text >or</Text>
            <Text >Click to select an image</Text>
          </div>
        )
      }

    </div>
  )
}
