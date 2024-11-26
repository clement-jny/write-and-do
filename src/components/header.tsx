import { CustomSidebarTrigger } from "./custom-sidebar-trigger";

export const Header = () => {
  return (
    <header className="w-[97%] h-24 mx-auto mt-7 bg-app-background-primary rounded-xl flex items-center drop-shadow-xl sticky top-7 gap-2 shrink-0 px-4">
      <CustomSidebarTrigger />

      <h1 className="font-medium text-4xl ml-5 border-b-2 border-app-primary">
        Welcome in Write & Do
      </h1>
    </header>
  );
};
