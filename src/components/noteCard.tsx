"use client";

import { CircleDot, Pen, Trash2 } from "lucide-react";
import React from "react";

export interface NoteCardProps {
  description: string;
  dateCreate: Date;
}

export default function NoteCard({ description, dateCreate }: NoteCardProps) {
  const editNote = () => {
    console.log("edit task");
  };

  const deleteNote = () => {
    console.log("delete task");
  };

  return (
    <div
      id="content"
      className="flex flex-col w-fit h-32 bg-[#F1EEEF] rounded-lg p-3 justify-between"
    >
      <div id="task" className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div
            id="title"
            className="font-medium text-xl flex items-center gap-2"
          >
            <CircleDot color="#96BE8C" size={20} />
            {dateCreate.toLocaleDateString()}
          </div>
          <div className="flex gap-1 self-end ml-2">
            <Pen size={24} onClick={() => editNote()} />
            <Trash2 size={24} color="#9E1568" onClick={() => deleteNote()} />
          </div>
        </div>
        <div id="desc" className="font-medium text-xl flex items-center gap-2">
          {description}
        </div>
      </div>
    </div>
  );
}
