import axios from "axios";

export async function getImages(query, pageNumber, resultsAmount) {
  const BASE_URL = "https://pixabay.com/api/";
  const API_KEY = "40892819-7576baf715197fa05f261aab0";

  const resp = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${API_KEY}`,
      q: `${query}`,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      page: `${pageNumber}`,
      per_page: `${resultsAmount}`,
    },
  });
  return resp.data;
}
