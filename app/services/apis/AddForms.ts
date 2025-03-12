import api from "../api";

const AddForms = (data: Record<string, unknown>) => {
  const result = api
    .post("/forms/submit", { params: data })
    .then((res) => res.data);
  return result;
};

export default AddForms;
