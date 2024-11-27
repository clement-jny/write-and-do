import { createDocument, updateDocument, deleteDocument } from '../services/firestore';
import { Note } from '@/models/Note';

export async function createNote(data: Note): Promise<string> {
    return createDocument('notes', data);
}

export async function updateNote(uid: string, data: Partial<Note>): Promise<void> {
    return updateDocument('notes', uid, data);
}

export async function deleteNote(uid: string): Promise<void> {
    return deleteDocument('notes', uid);
}
