import { createSelector } from "reselect";
import { State } from "../store";

const showStateSelector = (state: State) => state.shows;

export const showsQuerySelector = createSelector(
  showStateSelector,
  (showsState) => showsState.query
);

export const showsMapSelector = createSelector(
  showStateSelector,
  (showsState) => showsState.shows
);

export const queryShowMapSelector = createSelector(
  showStateSelector,
  (showState) => showState.query_show
);
export const showsLoadingSelector = createSelector(
  showStateSelector,
  (showsState) => showsState.loading
);

export const showsSelector = createSelector(
  showsMapSelector,
  showsQuerySelector,
  queryShowMapSelector,
  (showsMap, query, queryShowsMap) =>
    queryShowsMap[query]?.map((showId) => showsMap[showId])
);
