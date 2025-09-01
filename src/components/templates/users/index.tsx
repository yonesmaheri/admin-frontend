"use client";

import CustomTable from "@/components/modules/table";
import React from "react";
import { renderUserCell } from "./renderCell";
import { userColumns } from "./columns";
import { useUsers } from "@/lib/services/users";

function UsersPageTemplate() {
  const { isPending, data } = useUsers();

  return (
    <div>
      <CustomTable
        isLoading={isPending}
        columns={userColumns}
        rows={data?.data || []}
        renderCell={renderUserCell}
      />
    </div>
  );
}

export default UsersPageTemplate;
