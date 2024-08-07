import { useQuery } from "@tanstack/react-query";
import { getSpecificBook } from "../utils";
import { QUERY_KEYS } from "./queryKeys";
import {
  checkIfBookExistsInShelf,
  checkIfUserIsFollowing,
  getSpecificUserFeed,
  getFollowingFeed,
  getUserBookshelf,
  getUsers,
} from "../firebase/firebase.utils";

export const useGetSpecificBook = (bookId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SPECIFIC_BOOK, bookId],
    queryFn: () => getSpecificBook(bookId),
    enabled: !!bookId,
  });
};

export const useCheckIfBookExistInShelf = (bookId: string, userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOK_EXISTS_IN_SHELF, userId, bookId],
    queryFn: () => checkIfBookExistsInShelf(bookId, userId),
    enabled: !!bookId && !!userId,
  });
};

export const useGetUserBookshelf = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_BOOK_SHELF, userId],
    queryFn: () => getUserBookshelf(userId),
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: () => getUsers(),
  });
};

export const useCheckIfUserIsFollowing = (
  userId: string,
  followerId: string
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.IS_USER_FOLLOWING, userId, followerId],
    queryFn: () => checkIfUserIsFollowing(userId, followerId),
  });
};

export const useGetFollowingFeed = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWING_FEED, userId],
    queryFn: () => getFollowingFeed(userId),
    enabled: !!userId,
  });
};

export const useGetSpecificUserFeed = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SPECIFIC_USER_FEED, userId],
    queryFn: () => getSpecificUserFeed(userId),
    enabled: !!userId,
  });
};
