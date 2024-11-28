import ViewCard from "@/components/viewCard";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex flex-col w-2/3">
        <div className="h-[350px] overflow-y-auto">
          <ViewCard title="My tasks" isTasks={true} />
        </div>
        <div className=" mt-6 ">
          <div className="h-1 w-[95%] bg-[#9E1568] rounded-full ml-5 self-center"></div>
          <div className="h-[350px] overflow-y-auto flex-none">
            <ViewCard title="My notes" isTasks={false} />
          </div>
        </div>
      </div>
      <div className="h-[80%] right-[33%] bg-[#9E1568] w-1 rounded-full mt-5 absolute"></div>
      <div className="w-1/3 flex h-full overflow-y-auto ">
        <ViewCard title="Faire une raclette" isTasks={false} />
      </div>
    </div>
  );
}
