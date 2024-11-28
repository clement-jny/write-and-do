"use client";

import React from "react";
import TagComp from "./ui/tag";
import { CircleDot, Pen, Trash2 } from "lucide-react";
import { Tag } from "@/models/Tag";
import { Note } from "@/models/Note";
import { deleteTask } from "@/hooks/useTask";

export interface TaskCardProps {
  title: string;
  tags?: Tag[];
  notes?: Note[];
  uid: string;
}

export default function TaskCard({ title, tags, notes, uid }: TaskCardProps) {
  const editTask = () => {
    console.log("edit task");
  };

  const deleteT = async () => {
    await deleteTask(uid);
  };

  return (
    <div
      id="content"
      className="flex flex-col w-fit h-32 bg-[#F1EEEF] rounded-lg p-3 justify-between"
    >
      <div id="task" className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div id="tags" className="flex flex-row gap-1">
            {tags?.map((tag) => (
              <TagComp key={tag.uid} tag={tag} />
            ))}
          </div>
          <div className="flex gap-1 self-end ml-2 hover:cursor-pointer">
            <Pen size={24} onClick={() => editTask()} />
            <Trash2 size={24} color="#9E1568" onClick={() => deleteT()} />
          </div>
        </div>

        <div id="title" className="font-medium text-xl flex items-center gap-2">
          <CircleDot color="#96BE8C" size={20} />
          {title}
        </div>
      </div>

      <div id="footer" className="flex justify-between items-center mt-auto">
        <div id="notes">{notes ? notes.length + " notes" : "0 note"}</div>
      </div>
    </div>
  );
}
