import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Show } from "../models/Show";


const showsAdaptor = createEntityAdapter<Show>();

const initialState = showsAdaptor.getInitialState({
  query_show: {} as { [query: string]: number[] },
  query: "",
  show_loading: {} as { [showId: number]: boolean },
  loading: false,
});

export type State = typeof initialState;

export const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    loaded,
    queryChange,
    showsDetailsLoaded: showsAdaptor.addOne,
  },
});

export function loaded(state: State, action: PayloadAction<Show[]>) {
  const shows = action.payload as Show[];
  state.query_show[state.query] = shows.map((s) => s.id);
  state.loading = false;
  showsAdaptor.addMany(state, action);
}

export function queryChange(state: State, action: PayloadAction<string>) {
  state.query = action.payload;
  state.loading = true;
}

const { actions, reducer: showsReducer } = showsSlice;

export const {
  loaded: showsLoadedAction,
  queryChange: showsQueryChangeAction,
  showsDetailsLoaded: showLoadedAction,
} = actions;

export default showsReducer;
