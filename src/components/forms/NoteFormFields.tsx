import React from "react";
import { Input } from "../ui/input";
import { Note } from "@/models/Note";

interface NoteFormFieldsProps {
    card: Note | undefined;
}

export default function NoteFormFields({ card }: NoteFormFieldsProps) {
    return (
        <>
            <label htmlFor="noteDescription">Description</label>
            <Input id="noteDescription" name="description" type="text" defaultValue={card ? card.description : ''} required />
        </>
    );
};
