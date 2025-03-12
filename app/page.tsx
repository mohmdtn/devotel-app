"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Button } from "antd";
import toast from "react-hot-toast";
import GetForms from "./services/apis/GetForms";
import Loading from "./components/shared/Loading";
import AddForms from "./services/apis/AddForms";
import FormRender from "./components/pages/forms/FormRender";
import { useDragDropContext } from "@/app/providers/DragDropContext";
import { SortableItem } from "./components/shared/SortableItem";

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryFn: GetForms,
    queryKey: ["dynamicForm"],
  });

  const { forms, setForms } = useDragDropContext();

  useEffect(() => {
    if (data) setForms(data);
  }, [data, setForms]);

  const { mutateAsync } = useMutation({
    mutationFn: AddForms,
    onSuccess: () => toast.success("Form submitted successfully."),
    onError: () => toast.error("Something went wrong..."),
  });

  const onFinish = async (values: Record<string, unknown>) => {
    mutateAsync(values);
  };

  if (isLoading) return <Loading className="h-screen" />;

  return (
    <div className="p-2 md:p-6 md:pt-0 flex justify-center flex-col items-center">
      <Form layout="vertical" onFinish={onFinish} className="w-full">
        <section className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {forms.map(({ title, formId, fields }) => (
            <SortableItem key={formId} id={formId}>
              <div className="p-4 border rounded-md bg-white dark:bg-stone-900 border-gray-300 shadow-sm">
                <h1 className="text-xl font-bold mb-4">{title}</h1>
                {fields.map((field) => (
                  <FormRender key={field.id} field={field} />
                ))}
              </div>
            </SortableItem>
          ))}
        </section>
        <Button type="primary" className="w-full" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
