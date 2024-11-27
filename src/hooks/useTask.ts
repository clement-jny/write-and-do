import { getDocument, createDocument, updateDocument, deleteDocument, getDocumentsByField, getDocumentsByArrayValue } from '../services/firestore';
import { Task } from '@/models/Task';
import { Tag } from '@/models/Tag';
import { Note } from '@/models/Note';

export async function createTask(data: Task): Promise<string> {
    return createDocument('tasks', data);
}

export async function updateTask(uid: string, data: Partial<Task>): Promise<void> {
    return updateDocument('tasks', uid, data);
}

export async function deleteTask(uid: string): Promise<void> {
    return deleteDocument('tasks', uid);
}

// all tags for 1 task
export async function getTaskTags(uid: string): Promise<Tag[]> {
    const task = await getDocument<Task>('tasks', uid);
    if (task && task.tags) {
        return task.tags;
    } else {
        return [];
    }
}

export async function getNotesByTaskId(uid: string): Promise<Note[]> {
    return getDocumentsByField<Note>('notes', 'taskUid', uid);
}

// all tasks by tag uid
export async function getTasksWithTag(uid: string): Promise<Task[]> {
    return getDocumentsByArrayValue<Task>('tasks', 'tags', uid);
}

// remove tag from array
export async function removeTagFromTask(task: Task, uid: string): Promise<void> {
    if (task.tags) {
        const updatedTags = task.tags.filter(tag => tag.uid !== uid);
        await updateTask(task.uid!, { tags: updatedTags });
    }
}

// remove tag from array for all tasks
export async function removeTagFromAllTasks(uid: string): Promise<void> {
    const tasksWithTag = await getTasksWithTag(uid);
    const removeTagPromises = tasksWithTag.map(task => removeTagFromTask(task, uid));
    await Promise.all(removeTagPromises);
}
