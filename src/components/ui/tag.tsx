import { Tag } from "@/models/Tag";
import React from "react";

interface TagCompProps {
  tag: Tag;
}

export default function TagComp({ tag }: TagCompProps) {
  return (
    <div
      className="h-fit w-fit px-3 py-0.5 rounded-full flex justify-center items-center text-white"
      style={{ backgroundColor: tag.color }}
    >
      {tag.label}
    </div>
  );
}
