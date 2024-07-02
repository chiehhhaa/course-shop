import axios from "axios";

const API_URL = "/api";

export const getCoursesUsingThenCatch = () => {
  return axios
    .get(API_URL)
    .then((response) => {
      console.log("API response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching courses:", error.message);
      throw error;
    });
};
