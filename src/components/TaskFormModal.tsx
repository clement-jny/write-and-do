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

interface User {
    uid: string;
}

const fetchTags = async (user: User, setTags: (tags: Tag[]) => void) => {
    if (user) {
        const uid = user.uid;
        const fetchedTags = await getUserTags(uid);
        setTags(fetchedTags || []);
    }
};


const handleTaskSubmit = async (
    formData: FormData,
    userUid: string,
    selectedTags: string[],
    tags: Tag[],
    card: Task | null,
    onClose: () => void
) => {
    const data: Task = {
        title: formData.get("title") as string,
        startDate: new Date(formData.get("startDate") as string),
        endDate: new Date(formData.get("endDate") as string),
        status: 'open',
        userUid: userUid,
        tags: selectedTags.map((tagUid) => tags.find((tag) => tag.uid === tagUid)!),
        creationDate: new Date()
    };

    if (card) {
        await updateTask(card.uid as string, data);
    } else {
        await createTask(data);
    }

    onClose();
};


const handleNoteSubmit = async (
    formData: FormData,
    userUid: string,
    taskUid: string | undefined,
    card: Note | null,
    onClose: () => void
) => {
    const data: Note = {
        description: formData.get("description") as string,
        creationDate: new Date(),
        userUid: userUid,
        taskUid: taskUid || ''
    };

    if (card) {
        await updateNote(card.uid as string, data);
    } else {
        await createNote(data);
    }

    onClose();
};

export default function TaskFormModal({ isOpen, onClose, formType, card, taskUid }: TaskFormModalProps) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const { user } = useUser();

    useEffect(() => {
        if (formType === 'task' && user) {
            fetchTags(user as User, setTags);
        }
    }, [formType, user]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user) return;

        const formData = new FormData(event.target as HTMLFormElement);
        const uid = user.uid;

        try {
            if (formType === 'task') {
                await handleTaskSubmit(formData, uid, selectedTags, tags, card as Task, onClose);
            } else {
                await handleNoteSubmit(formData, uid, taskUid, card as Note, onClose);
            }
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
                        <TaskFormFields card={card as Task | undefined} tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                    ) : (
                        <NoteFormFields card={card as Note | undefined} />
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
