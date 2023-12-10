import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import FilledButton from "@/components/buttons/FilledButton";
import LinkMini from "@/components/LinkMini";
import OuterText from "@/components/OuterText";
import { fi } from "date-fns/locale";
import TransparentButton from "@/components/TransparentButton";
import OuterLink from "@/components/Link";

const Files = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <Heading className="pb-0">Files</Heading>
        <div>
          <LinkMini href="">Upload File</LinkMini>
        </div>
      </div>
      <Card >
        <div className="py-2 w-full border-b border-gray-300 ">
          <div className="flex justify-between items-center px-5">
            <div className="flex items-center gap-2">
              <button className="w-10 h-7 py-1 px-3 bg-gray-200 rounded-md text-xs font-semibold text-gray-900 hover:bg-gray-100 transition">All</button>
              <button className="py-1 px-2 hover:bg-gray-100 rounded-md">
                <Image
                  src="/PlusButton.svg"
                  width={20}
                  height={20}
                  alt="Plus button Image"
                />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="py-1 px-1 border rounded-md flex items-center shadow-sm shadow-neutral-200">
                <Image
                  src="/SearchIcon.svg"
                  width={20}
                  height={20}
                  alt="Plus button Image"
                />
                <Image
                  src="/ThreeLines.svg"
                  width={20}
                  height={20}
                  alt="Plus button Image"
                />
              </button>
              <button className="py-1 px-2 border rounded-md shadow-sm shadow-neutral-200">
              <Image
                  src="/BothArrows.svg"
                  alt="Plus button Image"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16">
          <Image
            src="/Upload_Image.svg"
            width={226}
            height={226 }
            alt="Metaobjects Image"
          />
          <Title>Upload and manage your files</Title>
          <Text className="text-center py-4">
            Files can be images, videos, documents, and more.
          </Text>
          <TransparentButton>Upload File</TransparentButton>
        </div>
      </Card>
      <OuterText>
        Learn more about <OuterLink>files</OuterLink>
      </OuterText>
    </>
  )
}

export default Files
