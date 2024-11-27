import { createDocument, deleteDocument } from '../services/firestore';
import { Tag } from '@/models/Tag';

export async function createTag(data: Tag): Promise<string> {
    return createDocument('tags', data);
}

export async function deleteTag(uid: string): Promise<void> {
    return deleteDocument('tags', uid);
}
