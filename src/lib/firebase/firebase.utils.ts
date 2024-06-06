import { auth } from "./firebase.config";
import { INewUser } from "@/types/user";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const createUserAccount = async (user: INewUser) => {
  const { email, password } = user;
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
