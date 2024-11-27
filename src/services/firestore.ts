import { 
    collection, 
    doc, 
    addDoc, 
    getDoc, 
    updateDoc, 
    deleteDoc, 
    DocumentData, 
    query, 
    where, 
    getDocs, 
    QuerySnapshot, 
    CollectionReference 
} from 'firebase/firestore';
import { db } from './firebase';

export async function getDocument<T extends DocumentData>(collectionName: string, id: string): Promise<T | null> {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as T;
        } else {
            return null;
        }
    } catch (e) {
        console.error(`Error getting ${collectionName.slice(0, -1)}: `, e);
        return null;
    }
}

export async function createDocument(collectionName: string, data: DocumentData): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    } catch (e) {
        console.error(`Error adding ${collectionName.slice(0, -1)}: `, e);
        throw e;
    }
}

export async function updateDocument(collectionName: string, id: string, data: Partial<DocumentData>): Promise<void> {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);
    } catch (e) {
        console.error(`Error updating ${collectionName.slice(0, -1)}: `, e);
    }
}

export async function deleteDocument(collectionName: string, id: string): Promise<void> {
    try {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
    } catch (e) {
        console.error(`Error deleting ${collectionName.slice(0, -1)}: `, e);
    }
}

export async function getDocumentsByField<T extends DocumentData>(
    collectionName: string,
    field: string,
    value: string
): Promise<T[]> {
    try {
        const collectionRef: CollectionReference<DocumentData> = collection(db, collectionName);
        const q = query(collectionRef, where(field, '==', value));
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        const documents: T[] = querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })) as unknown as T[];
        return documents;
    } catch (e) {
        console.error(`Error getting documents from ${collectionName}: `, e);
        return [];
    }
}

export async function getDocumentsByArrayValue<T extends DocumentData>(
    collectionName: string,
    field: string,
    value: string
): Promise<T[]> {
    try {
        const collectionRef: CollectionReference<DocumentData> = collection(db, collectionName);
        const q = query(collectionRef, where(field, 'array-contains', value));
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        const documents: T[] = querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as unknown as T));
        return documents;
    } catch (e) {
        console.error(`Error getting documents from ${collectionName}: `, e);
        return [];
    }
}
