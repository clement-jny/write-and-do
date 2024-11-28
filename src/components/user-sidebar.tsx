"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

import { User } from "@/models/User";

const user: User = {
  uid: "123",
  email: "toto@toto.com",
  tasks: [],
  notes: [],
  tags: [],
};
const avatarImage = createAvatar(bottts, { seed: user.uid }).toDataUri();

export function UserSidebar() {
  // use user context to get current user

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={avatarImage} alt={user.uid} />
            <AvatarFallback className="rounded-lg">{user.uid}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            {/* TODO: user.firstname ? */}
            <span className="truncate font-semibold">{user.email}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
