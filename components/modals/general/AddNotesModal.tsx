"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import Input from "@/components/Input";

import { FaPencilAlt } from "react-icons/fa";

const AddNotesModal = ({ addItem }: { addItem: any }) => {
  const [note, setNote] = useState("");

  const handleAddItem = () => {
    addItem(note);
    setNote("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FaPencilAlt className="text-sm text-neutral-500" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Notes</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 p-4">
          <Input
            id="note"
            value={note}
            label="Notes"
            onChange={(e) => setNote(e.target.value)}
            className="border border-neutral-300 rounded-lg text-sm"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="text-sm border border-neutral-900 shadow-lg p-1 px-2 rounded-lg">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleAddItem}
            className="text-sm border border-neutral-900 bg-neutral-800 text-white shadow-lg p-1 px-2 rounded-lg"
          >
            Done
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNotesModal;
