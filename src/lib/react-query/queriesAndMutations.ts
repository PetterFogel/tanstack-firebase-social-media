import { INewUser } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../firebase/firebase.utils";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
    onError: (error) => {
      console.error("Error signing in:", error);
    },
  });
};
