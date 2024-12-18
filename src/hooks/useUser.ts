import { createDocument, getDocumentsByField, updateDocument } from '../services/firestore';
import { User } from '@/models/User';
import { Tag } from '@/models/Tag';
import { Task } from '@/models/Task';
import { Note } from '@/models/Note';

export async function createUser(user: User): Promise<void> {
    await createDocument('users', user);
};

export async function getUserInfos(uid: string): Promise<User[]> {
	return getDocumentsByField<User>('users', 'uid', uid);
}

export async function updateUser(uid: string, data: Partial<User>): Promise<void> {
    return updateDocument('users', uid, data);
}

export async function getUserTags(uid: string): Promise<Tag[]> {
    return getDocumentsByField<Tag>('tags', 'userUid', uid);
}

export async function getUserTasks(uid: string): Promise<Task[]> {
    return getDocumentsByField<Task>('tasks', 'userUid', uid);
}

export async function getUserNotes(uid: string): Promise<Note[]> {
    return getDocumentsByField<Note>('notes', 'userUid', uid);
}
