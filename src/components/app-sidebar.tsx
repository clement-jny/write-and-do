import { DatePicker } from "@/components/date-picker";
import { UserSidebar } from "@/components/user-sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { PencilLine } from "lucide-react";
import { LinkSidebar } from "./link-sidebar";
import { TagSidebar } from "./tag-sidebar";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <PencilLine className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Write & Do</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <DatePicker />

        <SidebarSeparator className="mx-0" />

        <TagSidebar />

        <SidebarSeparator className="mx-0" />

        <LinkSidebar />
      </SidebarContent>

      <SidebarFooter>
        <UserSidebar />
      </SidebarFooter>
    </Sidebar>
  );
};
