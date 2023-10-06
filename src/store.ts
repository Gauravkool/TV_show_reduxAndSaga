import createSagaMiddleware from "redux-saga";
import { debounce, takeEvery } from "redux-saga/effects";
import { LOAD_SHOW_ACTION } from "./actions/Shows";
import { fetchShows, fetchShowsDetail } from "./sagas/Shows";
import { configureStore } from "@reduxjs/toolkit";
import showsReducer, { showsQueryChangeAction } from "./slices/Shows";

function* rootSaga() {
  yield debounce(200, showsQueryChangeAction, fetchShows);
  yield takeEvery(LOAD_SHOW_ACTION, fetchShowsDetail);
}
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    shows: showsReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof store.getState>;
export default store;
