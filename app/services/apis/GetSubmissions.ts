import api from "../api";

const GetSubmissions = async () => {
  const result = await api.get("/forms/submissions");
  return result.data;
};

export default GetSubmissions;
