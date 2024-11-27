import React from "react";
import AddTaskOrNoteButton from "./ui/addTaskOrNote";
import { TaskCardProps } from "./taskCard";
import TaskCard from "./taskCard";

interface ViewCardProps {
  title: string;
}

export default function ViewCard({ title }: ViewCardProps) {
  const cards: TaskCardProps[] = [
    {
      title: "Faire une raclette",
      tags: [
        { uid: "1", label: "Cuisine", color: "#C33C54", userUid:"toto" },
        { uid: "2", label: "Course", color: "#1446A0", userUid:"toto" },
        { uid: "3", label: "Course", color: "#1446A0", userUid:"toto" },
      ],
      notes: [
        { uid: "1", description: "Acheter du fromage", creationDate: "2020", userUid:"toto" },
        { uid: "2", description: "Acheter des pommes de terre", creationDate: "2020", userUid:"toto" },
      ],
      dateCreate: new Date("2021-10-10"),
    },
    {
      title: "Faire une fondue",
      tags: [
        { uid: "1", label: "Cuisine", color: "#C33C54", userUid:"toto" },
        { uid: "2", label: "Course", color: "#1446A0", userUid:"toto" },
      ],
      dateCreate: new Date("2021-10-10"),
    },
    {
      title: "Faire une tartiflette",
      tags: [
        { uid: "1", label: "Cuisine", color: "#C33C54", userUid:"toto" },
        { uid: "2", label: "Course", color: "#1446A0", userUid:"toto" },
      ],
      dateCreate: new Date("2021-10-10"),
    },
    {
      title: "Faire un mont d'or",
      dateCreate: new Date("2021-10-10"),
    },
  ];

  return (
    <div className="mt-5 mx-5">
      <div
        id="title"
        className="font-bold text-2xl text-[#9E1568] flex gap-2 items-center"
      >
        {title}
        <AddTaskOrNoteButton />
      </div>
      <div className="flex justify-between mt-5">
        <div id="cards" className="flex gap-3 flex-wrap">
          {cards.map((card) => (
            <TaskCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
