"use client";

import { deleteNote } from "@/hooks/useNote";
import { CircleDot, Pen, Trash2 } from "lucide-react";
import React from "react";

export interface NoteCardProps {
  description: string;
  dateCreate: Date;
  uid: string;
  onClick: () => void;
}

export default function NoteCard({
  description,
  dateCreate,
  uid,
  onClick,
}: NoteCardProps) {
  const deleteN = async () => {
    await deleteNote(uid);
  };

  return (
    <div
      id="content"
      className="flex flex-col w-fit h-32 bg-[#F1EEEF] rounded-lg p-3 justify-between"
      onClick={onClick}
    >
      <div id="task" className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div
            id="title"
            className="font-medium text-xl flex items-center gap-2"
          >
            <CircleDot color="#473198" size={20} />
            {dateCreate.toLocaleDateString()}
          </div>
          <div className="flex gap-1 self-end ml-2" onClick={(e) => e.stopPropagation()}>
            <Pen size={24} onClick={onClick} />
            <Trash2 size={24} color="#9E1568" onClick={() => deleteN()} />
          </div>
        </div>
        <div id="desc" className="font-medium text-xl flex items-center gap-2">
          {description}
        </div>
      </div>
    </div>
  );
}
