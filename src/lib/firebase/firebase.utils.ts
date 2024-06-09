import { toast } from "@/components/ui/use-toast";
import { auth, db } from "./firebase.config";
import { INewUser } from "@/types/user";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signInAccount = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAccount = async () => signOut(auth);

export const createUserAccount = async (userValues: INewUser) => {
  const { email, password, name, username } = userValues;
  if (!email || !password) return;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      name,
      email,
      username,
      createdAt: new Date(),
    });

    toast({ title: "Account created successfully!" });
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Error creating user account or document:", error.code);
      if (error.code === "auth/email-already-in-use")
        return toast({ title: "Entered email already exists." });

      toast({ title: "Something went wrong..." });
    }
  }
};
