"use client";

import { Plus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Tag } from "@/models/Tag";
import { useEffect, useState } from "react";
import { getUserTags } from "@/hooks/useUser";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { AddTagDialog } from "./add-tag-dialog";
import { Checkbox } from "./ui/checkbox";
import { useUser } from "@/contexts/UserContext";

export const TagSidebar = () => {
  const { user } = useUser();

  const [userTags, setUserTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const getTags = async () => {
      const tags = await getUserTags(user?.uid!);
      setUserTags(tags);
    };

    getTags();
  }, [user]);

  useEffect(() => {
    console.log("Selected tags changed", selectedTags);
  }, [selectedTags]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <span className="text-app-primary">My Tags</span>

        <Dialog>
          <DialogTrigger className="ml-auto" asChild>
            <Button
              size="icon"
              className="text-app-primary rounded-full bg-app-secondary hover:bg-app-secondary"
              aria-label="Add tag"
            >
              <Plus />
              <span className="sr-only">Add tag</span>
            </Button>
          </DialogTrigger>

          <AddTagDialog />
        </Dialog>
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {userTags.map((tag) => (
            <SidebarMenuItem key={tag.label}>
              <div className="flex items-center space-x-2 mx-2 py-1">
                <div className="flex aspect-square size-4 shrink-0 items-center justify-center">
                  <Checkbox
                    id={tag.label}
                    checked={selectedTags.includes(tag.uid!)}
                    onCheckedChange={(checked) => {
                      setSelectedTags((tags) =>
                        checked
                          ? [...tags, tag.uid!]
                          : tags.filter((t) => t !== tag.uid!)
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
