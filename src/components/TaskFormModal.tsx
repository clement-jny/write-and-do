import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Task } from "@/models/Task";
import { Note } from "@/models/Note";
import { Tag } from "@/models/Tag";
import { createTask, updateTask } from "@/hooks/useTask";
import { createNote, updateNote } from "@/hooks/useNote";
import TaskFormFields from "@/components/forms/TaskFormFields";
import NoteFormFields from "@/components/forms/NoteFormFields";
import { useUser } from '../contexts/UserContext';
import { getUserTags } from "@/hooks/useUser";

interface TaskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    formType: 'task' | 'note';
    card?: Task | Note | null;
    taskUid?: string;
}

export default function TaskFormModal({ isOpen, onClose, formType, card, taskUid }: TaskFormModalProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchTags() {
      const uid = user.uid;
      const fetchedTags = await getUserTags(uid);
      setTags(fetchedTags || []);
    }

    if (formType === 'task') {
      fetchTags();
    }
  }, [formType, user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const uid = user?.uid;

    try {
      if (formType === 'task') {
        const data: Task = {
          title: formData.get("title") as string,
          startDate: new Date(formData.get("startDate") as string),
          endDate: new Date(formData.get("endDate") as string),
          status: 'open',
          userUid: uid!,
          tags: selectedTags.map((tagUid) => tags.find((tag) => tag.uid === tagUid)!),
          creationDate: new Date()
        };

        if (card) {
          await updateTask(card.uid as string, data);
        } else {
          await createTask(data);
        }
      } else {
        const data: Note = {
          description: formData.get("description") as string,
          creationDate: new Date(),
          userUid: uid!,
          taskUid: taskUid || ''
        };

        if (card) {
          await updateNote(card.uid as string, data);
        } else {
          await createNote(data);
        }
      }
      onClose();
    } catch (error) {
      console.error("Error during add or update:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{formType === 'task' ? 'Add task' : 'Add note'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {formType === 'task' ? (
            <TaskFormFields card={card} tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          ) : (
            <NoteFormFields card={card} />
          )}
          <DialogFooter>
            <Button type="submit">{card ? 'Update' : 'Add'}</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
