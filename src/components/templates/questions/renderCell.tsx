import { Tooltip } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FaDeleteLeft } from "react-icons/fa6";
import React from "react";
import Link from "next/link";

export const renderUserCell = (question: any, columnKey: string) => {
  const cellValue = question[columnKey];

  switch (columnKey) {
    case "title":
      return cellValue;
    case "difficulty":
      return cellValue;
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <Link
              href={`/dashboard/questions/${question.id}`}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <BsEye />
            </Link>
          </Tooltip>
          <Tooltip content="Edit Question">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <BiEdit />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete">
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
