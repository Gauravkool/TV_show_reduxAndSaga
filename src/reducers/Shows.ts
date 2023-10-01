import { produce } from "immer";
import { AnyAction } from "redux";
import {} from "./../actions";
import { Show } from "../models/Show";
import { SHOWS_LOADED, SHOWS_QUERY_CHANGE } from "../actions/Shows";
import { normalize, schema } from "normalizr";

export type State = {
  shows: { [showId: number]: Show };
  query: string;
};
export const initialState: State = {
  shows: {},
  query: "",
};

function ShowReducer(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case SHOWS_LOADED:
      return produce(state, (draft) => {
        const shows = action.payload as Show[];
        const showSchema = new schema.Entity("shows");
        const normalizeData = normalize(shows, [showSchema]);
        draft.shows = normalizeData.entities.shows || {};
      });

    case SHOWS_QUERY_CHANGE:
      return produce(state, (draft) => {
        draft.query = action.payload;
      });
    default:
      return state;
  }
}
export default ShowReducer;
