"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import AuthForm from "./form";

function AuthTemplate() {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgb(13,110,253) 0%, rgb(59,127,34) 50%, rgb(14,24,250) 100%)",
      }}
    >
      <Card isBlurred className="p-4 w-[350px]">
        <CardHeader className="items-center justify-center">
          <h1 className="text-center font-bold text-2xl">Admin Login</h1>
        </CardHeader>
        <CardBody>
          <AuthForm />
        </CardBody>
      </Card>
    </div>
  );
}

export default AuthTemplate;
