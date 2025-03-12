import axios from "axios";

const api = axios.create({
  baseURL: "https://assignment.devotel.io/api/insurance",
});

export default api;
