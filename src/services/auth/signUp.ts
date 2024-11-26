import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { createUser } from '../../hooks/useUser';
import { User } from '../../models/User';

export const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const newUser: User = {
            uid: user.uid,
            email
        };

        await createUser(newUser);
        return user;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};
