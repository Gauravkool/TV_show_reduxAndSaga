import axios from "axios";
import { Show } from "./models/Show";

export const serachShow = (keyword: string) => {
  return axios
    .get<{ show: Show }[]>("https://api.tvmaze.com/search/shows?q=" + keyword)
    .then((res) => res.data.map((item) => item.show));
};
