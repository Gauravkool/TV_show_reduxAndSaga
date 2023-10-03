import axios from "axios";
import { Show } from "./models/Show";

const BASE_URL = "https://api.tvmaze.com/";

export const searchShows = async (keyword: string) => {
  const res = await axios.get<{ show: Show }[]>(
    BASE_URL + "search/shows?q=" + keyword
  );
  return res.data.map((item) => item.show);
};

export const searchShows2 = (keyword: string) => {
  return axios
    .get<{ show: Show }[]>(BASE_URL + "search/shows?q=" + keyword)
    .then((res) => res.data.map((item) => item.show));
};

export const loadShowDetail = async (showId: number) => {
  const res = await axios.get(BASE_URL + "shows/" + showId);
  return res.data;
};
