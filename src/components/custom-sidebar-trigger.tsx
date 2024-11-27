"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export const CustomSidebarTrigger = () => {
  const { toggleSidebar, state } = useSidebar();

  const Icon = state === "expanded" ? PanelLeftClose : PanelLeftOpen;

  return (
    <Icon
      className="size-9 text-app-primary cursor-pointer"
      onClick={toggleSidebar}
    />
  );
};
