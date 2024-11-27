"use client";

import { Plus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Tag } from "@/models/Tag";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";

const tags: Tag[] = [
  { id: 1, label: "Personal", color: "blue" },
  { id: 2, label: "Work", color: "green" },
  { id: 3, label: "Urgent", color: "red" },
  { id: 4, label: "Shopping", color: "yellow" },
];

export const TagSidebar = () => {
  const [selectedTags, setSelectedTags] = useState<number[]>([1, 3]);

  useEffect(() => {
    console.log("Selected tags changed", selectedTags);
  }, [selectedTags]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>My Tags</SidebarGroupLabel>

      <SidebarGroupAction
        title="Add tag"
        onClick={() => console.log("add tag")}
      >
        <Plus /> <span className="sr-only">Add Tag</span>
      </SidebarGroupAction>

      <SidebarGroupContent>
        <SidebarMenu>
          {tags.map((tag) => (
            <SidebarMenuItem key={tag.label}>
              <div className="flex items-center space-x-2 mx-2 py-1">
                <div className="flex aspect-square size-4 shrink-0 items-center justify-center">
                  <Checkbox
                    id={tag.label}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={(checked) => {
                      setSelectedTags((tags) =>
                        checked
                          ? [...tags, tag.id]
                          : tags.filter((t) => t !== tag.id)
                      );
                    }}
                  />
                </div>
                <label
                  htmlFor={tag.label}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
                >
                  {tag.label}
                </label>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
