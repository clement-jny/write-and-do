import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { createUser } from '@/hooks/useUser';
import { User } from '@/models/User';

export const signUp = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const newUser: User = {
            uid: user.uid,
            email,
            firstname,
            lastname
        };

        await createUser(newUser);
        return user;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};
