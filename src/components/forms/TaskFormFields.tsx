import React from "react";
import { Input } from "../ui/input";
import { Tag } from "@/models/Tag";
import { Task } from "@/models/Task";

interface TaskFormFieldsProps {
    card: Task | undefined;
    tags: Tag[];
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
}

export default function TaskFormFields({ card, tags, selectedTags, setSelectedTags }: TaskFormFieldsProps) {
    return (
        <>
            <label htmlFor="taskTitle">Title</label>
            <Input id="taskTitle" name="title" type="text" defaultValue={card ? card.title : ''} required />

            <label htmlFor="startDate">Start date</label>
            <Input id="startDate" name="startDate" type="date" defaultValue={card ? card.startDate.toISOString().substring(0, 10) : ''} required />

            <label htmlFor="endDate">End date</label>
            <Input id="endDate" name="endDate" type="date" defaultValue={card ? card.endDate.toISOString().substring(0, 10) : ''} required />

            <label htmlFor="tags">Tags</label>
            <select id="tags" name="tags" multiple value={selectedTags} onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}>
                {tags.map((tag) => (
                    <option key={tag.uid} value={tag.uid}>{tag.label}</option>
                ))}
            </select>
        </>
    );
};
