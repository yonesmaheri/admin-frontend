import { useQuery } from "@tanstack/react-query";
import apiCall from "../api";

const getUsers = async () => {
  const res = await apiCall.get("/users");
  return res.data;
};
export const useUsers= () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};


const getUser = async (id: string) => {
  const res = await apiCall.get(`/users/${id}`);
  return res.data;
};
export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};