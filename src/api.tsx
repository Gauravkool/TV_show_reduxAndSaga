import axios from "axios";
import { Show } from "./models/Show";

const BASE_URL = "https://api.tvmaze.com/";

export const searchShows = async (keyword: string) => {
  const res = await axios.get<{ show: Show }[]>(
    BASE_URL + "search/shows?q=" + keyword
  );
  const shows = res.data.map((item) => item.show);
  const castPromises = [];
  for (let i = 0; i < shows.length; i++) {
    castPromises.push(getCast(shows[i]));
  }
  return Promise.all(castPromises);
};

export const getCast = async (show: Show) => {
  const castResponse = axios.get(BASE_URL + "shows/" + show.id + "/cast");
  const cast = (await castResponse).data.map((item: any) => item.person);
  return { show, cast };
};

export const searchShows2 = (keyword: string) => {
  return axios
    .get<{ show: Show }[]>(BASE_URL + "search/shows?q=" + keyword)
    .then((res) => {
      const shows = res.data.map((item) => item.show);
      const castPromises = [];
      for (let i = 0; i < shows.length; i++) {
        const castAndShowPromise = axios
          .get(BASE_URL + "shows/" + shows[i].id + "/cast")
          .then((res) => {
            const cast = res.data.map((item: any) => item.person);
            return { show: shows[i], cast };
          });
        castPromises.push(castAndShowPromise);
      }
      return castPromises;
    });
};

export const loadShowDetail = async (showId: number) => {
  const res = await axios.get(BASE_URL + "shows/" + showId);
  return res.data;
};
