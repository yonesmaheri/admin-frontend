export type UserList = {
  id: number;
  name: string;
  role: "admin" | "user";
  profilePic: null | string;
  username: string;
};
