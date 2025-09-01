"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  Input,
  Button,
  Select,
  CardHeader,
  CardBody,
  SelectItem,
  Divider,
  Spinner,
} from "@heroui/react";
import dynamic from "next/dynamic";
import { useCreateQuestion } from "@/lib/services/questions";
import { useRouter } from "next/navigation";

const QuillEditor = dynamic(() => import("@/components/modules/htmlEditor"), {
  ssr: false,
});

const schema = z.object({
  title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
  description: z.string().min(1, "توضیح سوال الزامی است"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "ورودی الزامی است"),
        expected: z.string().min(1, "خروجی الزامی است"),
      })
    )
    .min(1, "حداقل یک تست کیس نیاز است"),
});

type FormData = z.infer<typeof schema>;

export default function CreateQuestionForm() {
  const { mutate, isPending } = useCreateQuestion();
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "EASY",
      testCases: [{ input: "", expected: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testCases",
  });

  const onSubmit = async (data: FormData) => {
    mutate(data, {
      onSuccess() {
        router.push("/dashboard/questions");
      },
    });
  };

  return (
    <Card className="text-sm max-w-[1280px] mx-auto">
      <CardHeader>
        <h2 className="text-lg font-bold">Add New Question</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Title</label>
            <Input aria-label="title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label>Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <QuillEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label>Difficulty</label>
            <Controller
              control={control}
              name="difficulty"
              render={({ field }) => (
                <Select
                  aria-label="difficulty"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <SelectItem key="EASY">Easy</SelectItem>
                  <SelectItem key="MEDIUM">Medium</SelectItem>
                  <SelectItem key="HARD">Hard</SelectItem>
                </Select>
              )}
            />
            {errors.difficulty && (
              <p className="text-red-500">{errors.difficulty.message}</p>
            )}
          </div>

          <div>
            <label>Test Cases</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2 items-center">
                <Input
                  aria-label="input"
                  {...register(`testCases.${index}.input`)}
                  placeholder="Input"
                />
                <Input
                  aria-label="Output"
                  {...register(`testCases.${index}.expected`)}
                  placeholder="Output"
                />
                <Button
                  type="button"
                  color="danger"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              color="secondary"
              variant="flat"
              onClick={() => append({ input: "", expected: "" })}
            >
              Add Test Case
            </Button>
          </div>
          <Divider />
          <Button color="primary" type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner color="white" size="sm" /> Submitting...
              </>
            ) : (
              "Submit Question"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
