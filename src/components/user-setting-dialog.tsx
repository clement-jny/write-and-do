"use client";

import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/hooks/useUser";

type UserSettingDialogProps = {
  userUid: string | undefined;
  userLastname: string | undefined;
  userFirstname: string | undefined;
};

export const UserSettingDialog = ({
  userUid,
  userLastname,
  userFirstname,
}: UserSettingDialogProps) => {
  const { toast } = useToast();

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    setLastname(userLastname!);
    setFirstname(userFirstname!);
  }, [userLastname, userFirstname]);

  const handleSubmit = async () => {
    console.log(lastname, firstname);

    await updateUser(userUid!, { lastname, firstname });

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
