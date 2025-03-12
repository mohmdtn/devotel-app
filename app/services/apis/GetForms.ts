import api from "../api";

const GetForms = async () => {
  const result = await api.get("/forms");
  return result.data;
};

export default GetForms;
