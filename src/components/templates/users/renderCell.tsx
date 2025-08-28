// components/modules/table/users.render.tsx
import { Chip, Tooltip, User } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FaDeleteLeft } from "react-icons/fa6";
import React from "react";

export const renderUserCell = (user: any, columnKey: string) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ radius: "lg", src: user.avatar }}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
          <p className="text-bold text-sm capitalize text-default-400">
            {user.team}
          </p>
        </div>
      );
    case "status":
      return (
        <Chip className="capitalize" size="sm" variant="flat">
          {cellValue}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <BsEye />
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <BiEdit />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <FaDeleteLeft />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
