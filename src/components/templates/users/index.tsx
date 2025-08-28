"use client";

import CustomTable from "@/components/modules/table";
import React from "react";
import { renderUserCell } from "./renderCell";
import { userColumns } from "./columns";

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  // ...
];

function UsersPageTemplate() {
  return (
    <div>
      <CustomTable columns={userColumns} rows={users} renderCell={renderUserCell} />
    </div>
  );
}

export default UsersPageTemplate;
