import axios from "axios";

const API_BASE_URL = "http://localhost:9876/numbers"; // Change if needed

export const fetchNumbers = async (type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
