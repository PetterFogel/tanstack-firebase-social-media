import { toast } from "@/components/ui/use-toast";
import { auth, db } from "./firebase.config";
import { FirebaseError } from "firebase/app";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { IBook } from "@/types/books";
import { INewUser, IUser } from "@/types/user";

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

export const getUserDoc = async (userId: string) => {
  const userDoc = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDoc);

  if (!userDocSnap.exists()) return;
  const userData = userDocSnap.data() as IUser;
  return userData;
};

export const getCurrentUserDoc = async (authUser: User | null) => {
  if (!authUser) return;
  const userData = await getUserDoc(authUser.uid);

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

export const addBookToUserBookShelf = async (book: IBook, userId: string) => {
  const bookshelfDocRef = doc(db, "bookshelf", userId);

  try {
    await updateDoc(bookshelfDocRef, {
      books: arrayUnion({
        id: book.id,
        volumeInfo: {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          categories: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          imageLinks: {
            thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
            smallThumbnail: book.volumeInfo.imageLinks?.smallThumbnail || "",
          },
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          publishedDate: book.volumeInfo.publishedDate,
        },
        userId,
        addedAt: new Date(),
        updatedAt: new Date(),
      }),
      updatedAt: new Date(),
    });
    toast({ title: "Book was added to your bookshelf!" });
  } catch (error) {
    console.error("Error adding book to user bookshelf: ", error);
    toast({ title: "Couldn't add book right now." });
  }
};

export const getUserBookshelf = async (userId: string) => {
  const bookshelfDocRef = doc(db, "bookshelf", userId);
  const bookshelfDocSnap = await getDoc(bookshelfDocRef);

  const user = await getUserDoc(userId);

  if (!bookshelfDocSnap.exists()) return;
  const bookshelfData = bookshelfDocSnap.data();
  const books = bookshelfData.books as IBook[];

  const bookshelf = { user, books };
  return bookshelf;
};

export const checkIfBookExistsInShelf = async (
  bookId: string,
  userId: string
) => {
  const bookshelf = await getUserBookshelf(userId);

  const bookExists = bookshelf?.books.some((book: IBook) => book.id === bookId);
  return bookExists;
};

export const removeBookFromShelf = async (bookId: string, userId: string) => {
  try {
    const bookshelfDocRef = doc(db, "bookshelf", userId);
    const bookshelfDocSnap = await getDoc(bookshelfDocRef);

    if (!bookshelfDocSnap.exists()) return;

    const bookshelfData = bookshelfDocSnap.data();
    const books = bookshelfData.books || [];

    const updatedBooks = books.filter((book: IBook) => book.id !== bookId);

    await updateDoc(bookshelfDocRef, {
      books: updatedBooks,
      updatedAt: new Date(),
    });

    toast({ title: "Book was removed from your bookshelf!" });
  } catch (error) {
    console.error("Error removing book from user bookshelf: ", error);
    toast({ title: "Couldn't remove book right now." });
  }
};

export const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const usersList = usersSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  return usersList;
};
