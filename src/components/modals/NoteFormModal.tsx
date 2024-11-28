"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Note } from '@/models/Note';
import { useUser } from '@/contexts/UserContext';
import { createNote, updateNote } from '@/hooks/useNote';

interface NoteFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    note?: Note | null;
}

export default function NoteFormModal({ isOpen, onClose, note }: NoteFormModalProps) {
    const { user } = useUser();
    const [description, setDescription] = useState<string>(note ? note.description : '');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;

        const newNote: Note = {
            description,
            creationDate: new Date(),
            userUid: user.uid,
            taskUid: note?.taskUid || ''
        };

        try {
            if (note) {
                await updateNote(note.uid as string, newNote);
            } else {
                await createNote(newNote);
            }
            onClose();
        } catch (error) {
            console.error('Error creating or updating note:', error);
            setError('Failed to save note.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{note ? 'Update Note' : 'Add Note'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <DialogFooter>
                        <Button type="submit">{note ? 'Update' : 'Add'}</Button>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
