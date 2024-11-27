import ViewCard from "@/components/viewCard";

export default function Home() {
  return (
    <div>
      <div className="flex">
        <div className="w-2/3">
          <ViewCard title="My tasks" isTasks={true} />
        </div>
        <div className="w-1/3">
          <ViewCard title="Faire une raclette" isTasks={false} />
        </div>
      </div>
    </div>
  );
}
