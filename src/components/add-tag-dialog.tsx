"use client";

import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { getRandomColor } from "@/lib/utils";
import { useState } from "react";
import { createTag } from "@/hooks/useTag";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

export const AddTagDialog = () => {
  const { user } = useUser();
  const { toast } = useToast();

  const [tagLabel, setTagLabel] = useState("");
  const [tagColor, setTagColor] = useState(getRandomColor());

  const handleSubmit = async () => {
    console.log(tagLabel, tagColor);

    await createTag({
      label: tagLabel,
      color: tagColor,
      userUid: user!.uid,
    });

    toast({
      description: "Tag created",
    });
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create a tag</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="label" className="text-right">
            Label
          </Label>
          <Input
            id="label"
            value={tagLabel}
            onChange={(e) => setTagLabel(e.target.value)}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="color" className="text-right">
            Color
          </Label>
          <Input
            id="color"
            type="color"
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
            className="col-span-3"
          />
        </div>

        <Button type="submit" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </DialogContent>
  );
};
