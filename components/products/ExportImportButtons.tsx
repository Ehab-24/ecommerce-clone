'use client'

import React from "react";
import OutlinedButtonSmall from "@/components/buttons/OutlinedButtonSmall";

export default function ExportImportButtons() {
  return (
    <>
      <OutlinedButtonSmall onClick={() => { }}>
        Export
      </OutlinedButtonSmall>
      <OutlinedButtonSmall onClick={() => { }}>
        Import
      </OutlinedButtonSmall>
    </>
  )
}
