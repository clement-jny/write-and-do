"use client";

import React, { useEffect } from "react";
import AddTaskOrNoteButton from "./ui/addTaskOrNote";
import TaskCard from "./taskCard";
import NoteCard from "./noteCard";
import { Task } from "@/models/Task";
import { Note } from "@/models/Note";
import { getUserNotes, getUserTasks } from "@/hooks/useUser";

interface ViewCardProps {
  title: string;
  isTasks: boolean;
}

export default function ViewCard({ title, isTasks }: ViewCardProps) {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [notes, setNotes] = React.useState<Note[]>([]);

  useEffect(() => {
    getData();
  });

  const getData = async (): Promise<void> => {
    if (isTasks) {
      setTasks(await getUserTasks("DBw999Lk9EZMvGxYXMdj7ox1qOI2"));
    } else {
      setNotes(await getUserNotes("DBw999Lk9EZMvGxYXMdj7ox1qOI2"));
    }
  };

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
          {isTasks
            ? tasks.map((task) => (
                <TaskCard key={task.uid} title={task.title} />
              ))
            : notes.map((note) => (
                <NoteCard
                  key={note.uid}
                  description={note.description}
                  dateCreate={new Date(note.creationDate)}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
