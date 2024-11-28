"use client";

import { LogOut, UserCog } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { UserSettingDialog } from "./user-setting-dialog";

export const LinkSidebar = () => {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger className="ml-auto" asChild>
                <SidebarMenuButton size="sm">
                  <UserCog />
                  <span>Account</span>
                </SidebarMenuButton>
              </DialogTrigger>

              <UserSettingDialog />
            </Dialog>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton size="sm" onClick={() => signOut(auth)}>
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
