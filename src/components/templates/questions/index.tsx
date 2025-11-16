"use client";

import CustomTable from "@/components/modules/table";
import React, { useEffect } from "react";
import { renderUserCell } from "./renderCell";
import { userColumns } from "./columns";
import { useDeleteQuestion, useQuestions } from "@/lib/services/questions";
import HeaderSection from "./header";

function QuestionsPageTemplate() {
  const { isPending, data } = useQuestions();
  const { mutate, isPending: isDeleting } = useDeleteQuestion();
  useEffect(() => {
    console.log(data);
  }, [isPending]);
  return (
    <div className="gap-4 flex flex-col">
      <HeaderSection />
      <CustomTable
        isLoading={isPending}
        columns={userColumns}
        rows={data || []}
        renderCell={(question: any, columnKey: string) =>
          renderUserCell(question, columnKey, (id) => {
            mutate(+id, {
              onSuccess: () => {
                console.log("Question deleted", id);
              },
            });
          })
        }
      />
    </div>
  );
}

export default QuestionsPageTemplate;
