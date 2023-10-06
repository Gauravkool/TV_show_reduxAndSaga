import { produce } from "immer";
import { AnyAction } from "redux";
import {} from "./../actions";
import { Show } from "../models/Show";
import { SHOW_DETAIL_LOADED } from "../actions/Shows";
import { normalize, schema } from "normalizr";

export type State = {
  shows: { [showId: number]: Show };
  query_show: { [query: string]: number[] };
  query: string;
  show_loading: { [showId: number]: boolean };
  loading: boolean;
};
export const initialState: State = {
  shows: {},
  query_show: {},
  query: "",
  show_loading: {},
  loading: false,
};

function ShowReducer(state = initialState, action: AnyAction): State {
  switch (action.type) {
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
