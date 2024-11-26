import { Settings, User } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="w-[97%] h-24 mx-auto mt-7 bg-[#F1EEEF] rounded-xl flex items-center justify-between drop-shadow-xl sticky top-7">
      <h1 className="font-medium text-4xl ml-5 border-b-2 border-[#9E1568]">
        Welcome in Write & Do
      </h1>

      <div className="mr-5 flex gap-3">
        <User color="#9E1568" className="size-9" />
        <Settings color="#9E1568" className="size-9" />
      </div>
    </nav>
  );
};
