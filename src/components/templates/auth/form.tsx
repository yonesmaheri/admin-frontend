"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Input, Button, Spinner } from "@heroui/react";
import { useLogin } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(3, "Password must be at least 3 characters"),
});
type FormValues = z.infer<typeof formSchema>;

function AuthForm() {
  const { mutate, isPending } = useLogin();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  function onSubmit(data: any) {
    mutate(data, {
      onSuccess: async (data) => {
        await fetch("back/auth/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: data.token }),
        });
        router.push("/dashboard");
      },
    });
  }

  return (
    <div>
      <Form
        className="w-full max-w-xs flex flex-col gap-3"
        validationErrors={(Object.keys(errors) as (keyof FormValues)[]).reduce(
          (acc, key) => {
            acc[key as string] = errors[key]?.message || "";
            return acc;
          },
          {} as Record<string, string>
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Username"
          labelPlacement="outside"
          {...register("username")}
          placeholder="Enter your username"
        />
        <Input
          label="Username"
          labelPlacement="outside"
          {...register("password")}
          placeholder="Enter your password"
        />
        <Button type="submit" disabled={isPending} color="primary">
          {isPending ? (
            <>
              <Spinner color="white" /> Please Wait...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </div>
  );
}

export default AuthForm;
