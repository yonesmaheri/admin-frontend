import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

function HeaderSection() {
  return (
    <div className="p-4 flex relative justify-between gap-4 bg-content1 overflow-auto shadow-small rounded-large w-full">
      <div>
        <h1>Questions List on Website</h1>
        <p className="text-sm text-gray-600/50">Here you can view, edit or delete any question</p>
      </div>
      <Button color="primary" as={Link} href="/dashboard/questions/add">Add Question</Button>
    </div>
  );
}

export default HeaderSection;
