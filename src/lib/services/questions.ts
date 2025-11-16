import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiCall from "../api";
import toast from "react-hot-toast";
import { CreateQuestionInput } from "../types/question";

const getQuestions = async () => {
  const res = await apiCall.get("/questions");
  return res.data;
};

export const useQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });
};

const getQuestion = async (id: string) => {
  const res = await apiCall.get(`/questions/${id}`);
  return res.data;
};

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestion(id),
    enabled: !!id,
  });
};

const createQuestion = async (data: CreateQuestionInput) => {
  const res = await apiCall.post("/questions", data);
  return res.data;
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      toast.success("Question added successfuly", {
        position: "bottom-center",
      });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

const deleteQuestion = async (id: number) => {
  const res = await apiCall.delete(`/questions/${id}`);
  return res.data;
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      toast.success("Question Deleted successfuly", {
        position: "bottom-center",
      });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};
