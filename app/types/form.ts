export interface FormField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  dynamicOptions?: {
    dependsOn: string;
    endpoint: string;
    method: string;
  };
  visibility?: {
    dependsOn: string;
    condition: string;
    value: string;
  };
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  fields: FormField[];
}

export interface FormFields {
  formId: string;
  title: string;
  fields: FormField[];
}