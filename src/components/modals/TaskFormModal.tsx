"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Task } from '@/models/Task';
import { Tag } from '@/models/Tag';
import { useUser } from '@/contexts/UserContext';
import { createTask, updateTask } from '@/hooks/useTask';
import { getUserTags } from '@/hooks/useUser';

interface TaskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task | null;
}

export default function TaskFormModal({ isOpen, onClose, task }: TaskFormModalProps) {
    const { user } = useUser();
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            const fetchTags = async () => {
                try {
                    const fetchedTags = await getUserTags(user.uid);
                    setTags(fetchedTags);
                } catch (err) {
                    console.error('Failed to fetch tags:', err);
                    setError('Failed to load tags.');
                }
            };
            fetchTags();
        }
    }, [user, task]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;

        const formData = new FormData(event.target as HTMLFormElement);

        const newTask: Task = {
            title: formData.get("title") as string,
            startDate: new Date(formData.get("startDate") as string),
            endDate: new Date(formData.get("endDate") as string),
            status: 'open',
            userUid: user.uid,
            tags: selectedTags.map((tagUid) => tags.find((tag) => tag.uid === tagUid)!),
            creationDate: new Date()
        };

        try {
            if (task && task.uid) {
                await updateTask(task.uid, newTask);
            } else {
                await createTask(newTask);
            }
            onClose();
        } catch (error) {
            console.error('Error creating or updating task:', error);
            setError('Failed to save task.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{task ? 'Update task' : 'Add task'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="taskTitle" className="block text-gray-700">Title</label>
                        <input
                            id="taskTitle"
                            name="title"
                            type="text"
                            defaultValue={task ? task.title : ''}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-gray-700">Start date</label>
                        <input
                            id="startDate"
                            name="startDate"
                            type="date"
                            defaultValue={task ? task.startDate.toISOString().substring(0, 10) : ''}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-gray-700">End date</label>
                        <input
                            id="endDate"
                            name="endDate"
                            type="date"
                            defaultValue={task ? task.endDate.toISOString().substring(0, 10) : ''}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-gray-700">Tags</label>
                        <select
                            id="tags"
                            name="tags"
                            multiple
                            value={selectedTags}
                            onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        >
                            {tags.map((tag) => (
                                <option key={tag.uid} value={tag.uid}>{tag.label}</option>
                            ))}
                        </select>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <DialogFooter>
                        <Button type="submit">{task ? 'Update' : 'Add'}</Button>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
