"use client";

import CustomTable from "@/components/modules/table";
import React, { useEffect } from "react";
import { renderUserCell } from "./renderCell";
import { userColumns } from "./columns";
import { useQuestions } from "@/lib/services/questions";
import HeaderSection from "./header";

function QuestionsPageTemplate() {
  const { isPending, data } = useQuestions();
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
        renderCell={renderUserCell}
      />
    </div>
  );
}

export default QuestionsPageTemplate;
