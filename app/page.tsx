"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import GetForms from "./services/apis/GetForms";
import Loading from "./components/shared/Loading";
import AddForms from "./services/apis/AddForms";
import GetStates from "./services/apis/GetStates";
import { useDragDropContext } from "@/app/providers/DragDropContext";
import { SortableItem } from "./components/shared/SortableItem";
import { Form, Radio, Select, Input, Checkbox, Button } from "antd";
import { FormField } from "@/app/types/form";

export default function HomePage() {
  const { forms, setForms } = useDragDropContext();
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [states, setStates] = useState<string[]>([]);
  const [form] = Form.useForm();
  
  const { data, isLoading } = useQuery({
    queryFn: GetForms,
    queryKey: ["dynamicForm"],
  });

  const { mutateAsync } = useMutation({
    mutationFn: AddForms,
    onSuccess: () => toast.success("Form submitted successfully."),
    onError: () => toast.error("Something went wrong..."),
  });

  const onFinish = async (values: Record<string, unknown>) => {
    await mutateAsync(values);
  };

  const { data: stateData, isLoading: stateLoading } = useQuery({
    queryFn: () => GetStates({ country: formValues.country as string }),
    queryKey: ["states", formValues.country],
    enabled: !!formValues.country,
  });

  useEffect(() => {
    if (data) setForms(data);
  }, [data, setForms]);

  useEffect(() => {
    if (stateData) setStates(stateData);
  }, [stateData, setStates]);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      state: undefined,
    }));
    form.resetFields(["state"]);
  }, [form, formValues.country]);

  const handleFieldChange = (key: string, value: unknown) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isFieldVisible = (field: FormField): boolean => {
    if (field.visibility) {
      const { dependsOn, condition, value } = field.visibility;
      const currentValue = formValues[dependsOn];
      if (condition === "equals") {
        return currentValue === value;
      }
      return false;
    }
    return true;
  };

  const renderField = (field: FormField) => {
    const { id, label, type, required, options } = field;

    if (!isFieldVisible(field)) return null;

    switch (type) {
      case "text":
        return (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Input onChange={(e) => handleFieldChange(id, e.target.value)} />
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Input
              type="number"
              onChange={(e) => handleFieldChange(id, e.target.value)}
            />
          </Form.Item>
        );
      case "date":
        return (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Input type="date" onChange={(e) => handleFieldChange(id, e.target.value)} />
          </Form.Item>
        );
      case "select":
        return id === "state" ? (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Select
              options={states.map((state) => ({ value: state, label: state }))}
              onChange={(value) => handleFieldChange(id, value)}
              loading={stateLoading}
              disabled={stateLoading}
            />
          </Form.Item>
        ) : (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Select
              options={options?.map((opt) => ({ value: opt, label: opt }))}
              onChange={(value) => handleFieldChange(id, value)}
            />
          </Form.Item>
      );
      case "radio":
        return (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Radio.Group onChange={(e) => handleFieldChange(id, e.target.value)}>
              {options?.map((opt) => (
                <Radio key={opt} value={opt}>
                  {opt}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item key={id} label={label} name={id} valuePropName="checked">
            <Checkbox.Group
              options={options}
              onChange={(checkedValues) => handleFieldChange(id, checkedValues)}
            />
          </Form.Item>
        );
      case "group":
        return (
          <div
            key={id}
            className="mb-4 p-2 border rounded-md border-gray-300 shadow-md"
          >
            <h2 className="text-lg font-semibold">{label}</h2>
            {field.fields?.map(renderField)}
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) return <Loading className="h-screen" />;

  return (
    <div className="p-2 md:p-6 md:pt-0 flex justify-center flex-col items-center">
      <Form form={form} layout="vertical" onFinish={onFinish} className="w-full">
        <section className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {forms.map(({ title, formId, fields }) => (
            <SortableItem key={formId} id={formId}>
              <div className="p-4 border rounded-md bg-white dark:bg-stone-900 border-gray-300 shadow-sm">
                <h1 className="text-xl font-bold mb-4">{title}</h1>
                {fields.map(renderField)}
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
