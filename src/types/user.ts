import { Timestamp } from "firebase/firestore";

export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  createdAt: Timestamp;
  following: string[];
  followers: string[];
}

export interface INewUser {
  name: string;
  email: string;
  username: string;
  password: string;
}
