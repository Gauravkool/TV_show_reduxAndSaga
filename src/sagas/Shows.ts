import { call } from "redux-saga/effects";
import { searchShows } from "../api";
import { Action } from "../actions";

export function* fetchShows(action: Action): Generator<any, any, any> {
  const shows = yield call(searchShows, action.payload);
}
