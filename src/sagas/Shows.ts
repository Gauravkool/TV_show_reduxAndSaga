import { call, put } from "redux-saga/effects";
import { loadShowDetail, searchShows, searchShows2 } from "../api";
import { Action } from "../actions";
import { ShowsLoadedAction, showLoadedAction } from "../actions/Shows";

export function* fetchShows(action: Action): Generator<any, any, any> {
  searchShows("game").then((res)=>console.log("response is", res))
  // const shows = yield call(searchShows, action.payload);
  // yield put(ShowsLoadedAction(shows));
}
export function* fetchShowsDetail(action: Action): Generator<any, any, any> {
  const show = yield call(loadShowDetail, action.payload);
  yield put(showLoadedAction(show))
}
