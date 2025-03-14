import axios from "../api";

interface Props {
  country: string;
}

const GetStates = async ({ country }: Props) => {
  const result = await axios.get(`https://assignment.devotel.io/api/getStates?country=${country}`);
  return result.data.states;
};

export default GetStates;
