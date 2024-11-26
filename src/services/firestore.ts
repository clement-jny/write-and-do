import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { User } from '../models/User';

export const addUserToFirestore = async (user: User) => {
    try {
        const docRef = await addDoc(collection(db, 'users'), user);
        return docRef.id;
    } catch (error) {
        console.error('Error adding user to Firestore:', error);
        throw error;
    }
};

export const getUser = async (userId: string): Promise<User | null> => {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting user from Firestore:', error);
        throw error;
    }
};
