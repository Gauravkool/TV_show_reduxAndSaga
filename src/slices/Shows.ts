import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Show } from "../models/Show";
import { normalize, schema } from "normalizr";

export type State = {
  shows: { [showId: number]: Show };
  query_show: { [query: string]: number[] };
  query: string;
  show_loading: { [showId: number]: boolean };
  loading: boolean;
};

const initialState: State = {
  shows: {},
  query_show: {},
  query: "",
  show_loading: {},
  loading: false,
};

export const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    loaded,
    queryChange,
  },
});

export function loaded(state: State, action: PayloadAction<Show[]>) {
  const shows = action.payload as Show[];
  if (!shows || shows.length === 0) {
    return;
  }
  const showSchema = new schema.Entity("shows");
  const normalizeData = normalize(shows, [showSchema]);
  state.loading = false;
  state.query_show[state.query] = normalizeData.result;
  state.shows = { ...state.shows, ...normalizeData.entities.shows };
}

export function queryChange(state: State, action: PayloadAction<string>) {
  state.query = action.payload;
  state.loading = true;
}

const { actions, reducer: showsReducer } = showsSlice;

export const {
  loaded: showsLoadedAction,
  queryChange: showsQueryChangeAction,
} = actions;

export default showsReducer;
