import { toast } from "@/components/ui/use-toast";
import { auth, db } from "./firebase.config";
import { INewUser } from "@/types/user";
import { FirebaseError } from "firebase/app";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  if (!user.email || !user.password) return;
  try {
    return await signInWithEmailAndPassword(auth, user.email, user.password);
  } catch (error) {
    console.error("Error signing in: ", error);
    toast({ title: "Wrong email or password." });
  }
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
      id: user.uid,
      name,
      email,
      username,
      createdAt: new Date(),
    });

    await addbookshelfForUser(user.uid);

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

export const getCurrentUserDoc = async (authUser: User | null) => {
  if (!authUser) return;
  const userDoc = doc(db, "users", authUser?.uid);
  const userDocSnap = await getDoc(userDoc);

  if (!userDocSnap.exists()) return;
  const userData = userDocSnap.data();
  return userData;
};

const addbookshelfForUser = async (userId: string) => {
  const userBookShelfRef = doc(db, "bookshelf", userId);
  await setDoc(userBookShelfRef, {
    bookIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const addBookToUserBookShelf = async (
  bookId: string,
  userId: string
) => {
  const bookshelfDocRef = doc(db, "bookshelf", userId);

  try {
    await updateDoc(bookshelfDocRef, {
      bookIds: arrayUnion(bookId),
      updatedAt: new Date(),
    });
    toast({ title: "Book was added to your bookshelf!" });
  } catch (error) {
    console.error("Error adding book to user bookshelf: ", error);
    toast({ title: "Couldn't add book right now." });
  }
};

export const checkIfBookExistInShelf = async (
  bookId: string,
  userId: string
) => {
  const bookshelfDocRef = doc(db, "bookshelf", userId);
  const bookshelfDocSnap = await getDoc(bookshelfDocRef);

  if (!bookshelfDocSnap.exists()) {
    return false;
  }

  const bookshelfData = bookshelfDocSnap.data();
  const bookIds = bookshelfData.bookIds;
  const bookExist = bookIds.includes(bookId);

  return bookExist ? true : false;
};

export const removeBookFromShelf = async (bookId: string, userId: string) => {
  try {
    const bookshelfDocRef = doc(db, "bookshelf", userId);
    await updateDoc(bookshelfDocRef, {
      bookIds: arrayRemove(bookId),
      updatedAt: new Date(),
    });

    toast({ title: "Book was removed from your bookshelf!" });
  } catch (error) {
    console.error("Error removing book from user bookshelf: ", error);
    toast({ title: "Couldn't remove book right now." });
  }
};
