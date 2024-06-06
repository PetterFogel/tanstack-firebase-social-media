import { auth } from "./firebase.config";
import { INewUser } from "@/types/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const createUserAccount = async (user: INewUser) => {
  const { email, password } = user;
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAccount = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAccount = async () => signOut(auth);
