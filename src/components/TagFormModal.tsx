import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { useUser } from '@/contexts/UserContext';
import { createTag } from '@/hooks/useTag';
import { Tag } from '@/models/Tag';

interface TagFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TagFormDialog({ isOpen, onClose }: TagFormDialogProps) {
    const { user } = useUser();
    const [label, setLabel] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;

        const newTag: Tag = {
            label,
            color,
            userUid: user.uid,
        };

        try {
            await createTag(newTag);
            onClose();
        } catch (error) {
            console.error('Error creating tag:', error);
            setError('Failed to create tag.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Tag</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Label</label>
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Color</label>
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <DialogFooter>
                        <Button type="submit">Create</Button>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};