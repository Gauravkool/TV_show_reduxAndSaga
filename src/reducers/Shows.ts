import { produce } from "immer";
import { AnyAction } from "redux";
import {} from "./../actions";
import { Show } from "../models/Show";
import {
  SHOWS_LOADED,
  SHOWS_QUERY_CHANGE,
  SHOW_DETAIL_LOADED,
} from "../actions/Shows";
import { normalize, schema } from "normalizr";

export type State = {
  shows: { [showId: number]: Show };
  query: string;
  query_show: { [query: string]: number[] };
};
export const initialState: State = {
  shows: {},
  query: "",
  query_show: {},
};

function ShowReducer(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case SHOWS_LOADED:
      return produce(state, (draft) => {
        const shows = action.payload as Show[];
        // if (!shows || shows.length === 0) {
        //   return;
        // }
        const showSchema = new schema.Entity("shows");
        const normalizeData = normalize(shows, [showSchema]);
        console.log(normalizeData);
        draft.query_show[draft.query] = normalizeData.result;
        draft.shows = { ...draft.shows, ...normalizeData.entities.shows };
      });

    case SHOWS_QUERY_CHANGE:
      return produce(state, (draft) => {
        draft.query = action.payload;
      });
    case SHOW_DETAIL_LOADED:
      return produce(state, (draft) => {
        const show = action.payload;
        draft.shows[show.id] = show;
      });
    default:
      return state;
  }
}
export default ShowReducer;
