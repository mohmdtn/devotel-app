"use client";

import { useState } from "react";
import { Form, Radio, Select, Input, Checkbox } from "antd";
import { FormField } from "@/app/types/form";

const FormRender = ({ field }: { field: FormField }) => {
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});

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

    const handleChange = (value: unknown) => handleFieldChange(id, value);

    switch (type) {
      case "text":
        return (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Input onChange={(e) => handleChange(e.target.value)} />
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Input
              type="number"
              onChange={(e) => handleChange(e.target.value)}
            />
          </Form.Item>
        );
      case "date":
        return (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Input type="date" onChange={(e) => handleChange(e.target.value)} />
          </Form.Item>
        );
      case "select":
        return (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Select
              options={options?.map((opt) => ({ value: opt, label: opt }))}
              onChange={handleChange}
            />
          </Form.Item>
        );
      case "radio":
        return (
          <Form.Item key={id} label={label} name={id} rules={[{ required }]}>
            <Radio.Group onChange={(e) => handleChange(e.target.value)}>
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
              onChange={(checkedValues) => handleChange(checkedValues)}
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

  return renderField(field);
};

export default FormRender;
