"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../services/firebase";
import { User } from "@/models/User";
import { getUserInfos } from "@/hooks/useUser";

interface UserContextProps {
  user: User | null;
}

const UserContext = createContext<UserContextProps>({ user: null });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async (userUid: string) => {
    const users = await getUserInfos(userUid);

    setUser({
      uid: users[0].uid,
      email: users[0].email,
      lastname: users[0].lastname,
      firstname: users[0].firstname,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      } else {
        getUser(firebaseUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
