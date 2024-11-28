"use client";

import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/hooks/useUser";

export const UserSettingDialog = () => {
  const { user } = useUser();
  const { toast } = useToast();

  const [lastname, setLastname] = useState(user?.lastname);
  const [firstname, setFirstname] = useState(user?.firstname);

  const handleSubmit = async () => {
    console.log(lastname, firstname);

    // await updateUser(user?.uid, { lastname, firstname });

    toast({
      description: "Informations updated",
    });
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Update your informations</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastname" className="text-right">
            Lastname
          </Label>
          <Input
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstname" className="text-right">
            Firstname
          </Label>
          <Input
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="col-span-3"
          />
        </div>

        <Button type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </DialogContent>
  );
};
