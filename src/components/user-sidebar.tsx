"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";
import { useEffect } from "react";
import { signIn } from "@/services/auth/signIn";
import { useUser } from "@/contexts/UserContext";

export function UserSidebar() {
  const { user } = useUser();

  const avatarImage = createAvatar(bottts, {
    seed: user?.uid,
  }).toDataUri();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={avatarImage} alt={user?.lastname} />
            <AvatarFallback className="rounded-lg">
              {user?.lastname[0]}
              {user?.firstname[0]}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {user?.lastname} {user?.firstname}
            </span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
