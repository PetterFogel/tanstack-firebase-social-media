import { toast } from "@/components/ui/use-toast";
import { auth, db } from "./firebase.config";
import { FirebaseError } from "firebase/app";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { INewUser, IUser } from "@/types/user";
import { IBook, IBookFeed, IBookImageLinks, IBookShelf } from "@/types/books";

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
      bookIds: [],
      followers: [],
      following: [],
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
  const userBookShelfRef = doc(db, "userBookshelfs", userId);
  await setDoc(userBookShelfRef, {
    bookIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const getUserBookshelf = async (userId: string) => {
  const savedBooksDocRef = doc(db, "userBookshelfs", userId);
  const savedBooksDocSnap = await getDoc(savedBooksDocRef);

  if (!savedBooksDocSnap.exists()) return;

  const bookshelfData = savedBooksDocSnap.data();
  const booksIds = bookshelfData.bookIds || [];

  const booksQuery = query(
    collection(db, "books"),
    where("__name__", "in", booksIds),
    limit(10)
  );

  const booksSnapshot = await getDocs(booksQuery);
  const usersBooks = booksSnapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as IBook[];

  return usersBooks;
};

export const getBookCollection = async () => {
  const booksCollection = collection(db, "books");
  const booksSnapshot = await getDocs(booksCollection);
  const booksList = booksSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  return booksList as IBook[];
};

export const checkIfBookExistsInShelf = async (
  bookId: string,
  userId: string
) => {
  const books = await getUserBookshelf(userId);

  const bookExists = books?.some((book: IBook) => book.id === bookId);
  return bookExists;
};

const deleteBookFromCollection = async (bookId: string) => {
  const bookRef = doc(db, "books", bookId);
  await deleteDoc(bookRef);
};

const removeBookIdFromUser = async (userId: string, bookId: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) return;

  const userData = userDocSnap.data();
  const bookIds = userData.bookIds || [];

  const updatedBookIds = bookIds.filter((id: string) => id !== bookId);

  await updateDoc(userDocRef, {
    bookIds: updatedBookIds,
  });
};

export const removeBookFromUserShelf = async (
  bookId: string,
  userId: string
) => {
  try {
    const bookshelfDocRef = doc(db, "userBookshelfs", userId);
    const bookshelfDocSnap = await getDoc(bookshelfDocRef);

    if (!bookshelfDocSnap.exists()) return;

    const bookshelfData = bookshelfDocSnap.data();
    const books = bookshelfData.bookIds || [];

    const updatedBooks = books.filter((id: string) => id !== bookId);

    const users = await getUsers();

    const userBookIds = users.flatMap((user) => user.bookIds);
    const filteredUserBookIds = userBookIds.filter((id) => id === bookId);
    if (filteredUserBookIds.length === 1) {
      await deleteBookFromCollection(bookId);
    }

    await updateDoc(bookshelfDocRef, {
      bookIds: updatedBooks,
      updatedAt: new Date(),
    });

    const reviewId = `${userId}_${bookId}`;
    const reviewDocRef = doc(db, "reviews", reviewId);
    await deleteDoc(reviewDocRef);

    await removeBookIdFromUser(userId, bookId);

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

  return usersList as IUser[];
};

export const followUser = async (userId: string, followerId: string) => {
  const userDocRef = doc(db, "users", userId);

  const followedUserDocRef = doc(db, "users", followerId);
  const followedUserDocSnap = await getDoc(followedUserDocRef);

  if (!followedUserDocSnap.exists()) return;

  const followedUsername = followedUserDocSnap.data().name || "";

  try {
    await updateDoc(userDocRef, {
      following: arrayUnion(followerId),
    });
    await updateDoc(followedUserDocRef, {
      followers: arrayUnion(userId),
    });

    toast({ title: `You are now following ${followedUsername}!` });
  } catch (error) {
    console.error("Error following user: ", error);
    toast({ title: "Couldn't follow user right now." });
  }
};

export const unfollowUser = async (userId: string, followerId: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) return;

  const followingList = userDocSnap.data().following || [];
  const updatedFollowingList = followingList.filter(
    (id: string) => id !== followerId
  );

  const unfollowedUserDocRef = doc(db, "users", followerId);
  const unfollowedUserDocSnap = await getDoc(unfollowedUserDocRef);
  if (!unfollowedUserDocSnap.exists()) return;

  const currentFollowersList = unfollowedUserDocSnap.data().followers || [];
  const updatedFollowersList = currentFollowersList.filter(
    (id: string) => id !== userId
  );

  const unfollowingUsername = unfollowedUserDocSnap.data().name || "";

  try {
    await updateDoc(userDocRef, {
      following: updatedFollowingList,
    });

    await updateDoc(unfollowedUserDocRef, {
      followers: updatedFollowersList,
    });

    toast({ title: `You unfollowed ${unfollowingUsername}.` });
  } catch (error) {
    console.error("Error unfollowing user: ", error);
    toast({ title: "Couldn't unfollow user right now." });
  }
};

export const checkIfUserIsFollowing = async (
  userId: string,
  followerId: string
) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) return;

  const userData = userDocSnap.data();
  const following = userData.following || [];

  const isFollowing = following.includes(followerId);
  return isFollowing;
};

export const addBookToCollection = async (bookId: string, bookInfo: IBook) => {
  const bookRef = doc(db, "books", bookId);
  const bookSnapshot = await getDoc(bookRef);

  if (bookSnapshot.exists()) return;
  await setDoc(bookRef, bookInfo);
};

export const saveBookForUser = async (userId: string, bookId: string) => {
  const userBooksRef = doc(db, "userBookshelfs", userId);

  await updateDoc(userBooksRef, {
    bookIds: arrayUnion(bookId),
    updatedAt: new Date(),
  });
};

export const addReviewForBook = async (
  user: IUser,
  bookId: string,
  bookTitle: string,
  bookImages?: IBookImageLinks
) => {
  try {
    const reviewId = `${user.id}_${bookId}`;
    const reviewRef = doc(db, "reviews", reviewId);

    const initialReview = {
      userId: user.id,
      username: user.username,
      bookId,
      bookTitle,
      imageLinks: {
        thumbnail: bookImages?.thumbnail,
        smallThumbnail: bookImages?.smallThumbnail,
      },
      reviewText: "",
      rating: 0,
      actionStatus: "bookAdded",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(reviewRef, initialReview);
  } catch (error) {
    console.error("Error adding review: ", error);
  }
};

const addBookIdsForUser = async (userId: string, bookId: string) => {
  const userBooksRef = doc(db, "users", userId);

  await updateDoc(userBooksRef, {
    bookIds: arrayUnion(bookId),
  });
};

export const addBookToUserShelf = async (book: IBook, user: IUser) => {
  const { id: bookId, volumeInfo } = book;

  const newBook: IBook = {
    id: bookId,
    volumeInfo: {
      title: volumeInfo.title,
      authors: volumeInfo.authors,
      categories: volumeInfo.authors,
      description: volumeInfo.description,
      imageLinks: {
        thumbnail: volumeInfo.imageLinks?.thumbnail || "",
        smallThumbnail: volumeInfo.imageLinks?.smallThumbnail || "",
      },
      pageCount: volumeInfo.pageCount,
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await addBookToCollection(bookId, newBook);
    await addBookIdsForUser(user.id, bookId);
    await addReviewForBook(
      user,
      book.id,
      newBook.volumeInfo.title,
      newBook.volumeInfo.imageLinks
    );
    await saveBookForUser(user.id, bookId);
    toast({ title: "Book was added to your bookshelf!" });
  } catch (error) {
    console.error("Error adding book to user bookshelf: ", error);
    toast({ title: "Couldn't add book right now." });
  }
};

export const getFollowingList = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) return [];

  const userData = userDocSnap.data();
  return userData.following || [];
};

const getSavedBooksByIds = async (userIds: string[]) => {
  const savedBooksCollectionRef = collection(db, "userBookshelfs");
  const savedBooksQuery = query(
    savedBooksCollectionRef,
    where("__name__", "in", userIds),
    limit(10)
  );
  const savedBooksQuerySnapshot = await getDocs(savedBooksQuery);

  const savedBooks = savedBooksQuerySnapshot.docs.map((doc) => ({
    userId: doc.id,
    ...doc.data(),
  })) as IBookShelf[];

  return savedBooks;
};

const getReviewsCollection = async (userIds: string[], bookIds: string[]) => {
  const reviewsCollectionRef = collection(db, "reviews");

  const reviewsQuery = query(
    reviewsCollectionRef,
    where("userId", "in", userIds),
    where("bookId", "in", bookIds),
    limit(20)
  );

  const reviewsQuerySnapshot = await getDocs(reviewsQuery);

  const reviews = reviewsQuerySnapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as IBookFeed[];

  return reviews;
};

export const getFollowingFeed = async (userId: string) => {
  const followingIds = await getFollowingList(userId);
  const idsWithCurrentUser = [...followingIds, userId];

  try {
    const savedBooks = await getSavedBooksByIds(idsWithCurrentUser);
    const allBookIds = savedBooks.flatMap((savedBook) => savedBook.bookIds);

    const reviews = await getReviewsCollection(idsWithCurrentUser, allBookIds);
    return reviews;
  } catch (error) {
    console.error("Something went wrong.", error);
    return [];
  }
};

export const getSpecificUserFeed = async (
  userId: string
): Promise<{ bookFeed: IBookFeed[]; user: IUser } | undefined> => {
  try {
    const reviewsCollectionRef = collection(db, "reviews");
    const reviewsQuery = query(
      reviewsCollectionRef,
      where("userId", "==", userId),
      limit(10)
    );

    const reviewsQuerySnapshot = await getDocs(reviewsQuery);
    const bookFeed = reviewsQuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as IBookFeed[];

    const user = (await getUserDoc(userId)) as IUser;

    return { bookFeed, user };
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};
