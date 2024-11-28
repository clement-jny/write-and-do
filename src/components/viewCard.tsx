"use client";

import React, { useEffect, useState } from "react";
import AddTaskOrNoteButton from "./ui/addTaskOrNote";
import TaskCard from "./taskCard";
import NoteCard from "./noteCard";
import { Task } from "@/models/Task";
import { Note } from "@/models/Note";
import { getUserNotes, getUserTasks } from "@/hooks/useUser";
import TaskFormModal from "./modals/TaskFormModal";
import NoteFormModal from "./modals/NoteFormModal";

interface ViewCardProps {
  title: string;
  isTasks: boolean;
}

export default function ViewCard({ title, isTasks }: ViewCardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (): Promise<void> => {
    if (isTasks) {
      setTasks(await getUserTasks("DBw999Lk9EZMvGxYXMdj7ox1qOI2"));
    } else {
      setNotes(await getUserNotes("DBw999Lk9EZMvGxYXMdj7ox1qOI2"));
    }
  };

  const handleAddButtonClick = () => {
    setSelectedTask(null);
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    getData();
  };

  const handleCardClick = (item: Task | Note) => {
    if (isTasks) {
      setSelectedTask(item as Task);
    } else {
      setSelectedNote(item as Note);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="mt-5 mx-5">
      <div
        id="title"
        className="font-bold text-2xl text-[#9E1568] flex gap-2 items-center"
      >
        {title}
        <div onClick={handleAddButtonClick}> 
            <AddTaskOrNoteButton />
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div id="cards" className="flex gap-3 flex-wrap">
          {isTasks
            ? tasks.map((task) => (
                <TaskCard key={task.uid} title={task.title} uid={task.uid} onClick={() => handleCardClick(task)} />
              ))
            : notes.map((note) => (
                <NoteCard
                  key={note.uid}
                  description={note.description}
                  dateCreate={new Date(note.creationDate)}
                  uid={note.uid}
                  onClick={() => handleCardClick(note)}
                />
              ))}
        </div>
      </div>
      {isTasks ? (
        <TaskFormModal isOpen={isModalOpen} onClose={handleCloseModal} task={selectedTask} />
      ) : (
        <NoteFormModal isOpen={isModalOpen} onClose={handleCloseModal} note={selectedNote} />
      )}
    </div>
  );
}
