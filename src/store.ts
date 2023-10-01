import { applyMiddleware, combineReducers, createStore } from "redux";
import ShowReducer from "./reducers/Shows";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import { takeEvery } from "redux-saga/effects";
import { SHOWS_QUERY_CHANGE } from "./actions/Shows";
import { fetchShows } from "./sagas/Shows";
const reducer = combineReducers({ shows: ShowReducer });
function* rootSaga() {
  yield takeEvery(SHOWS_QUERY_CHANGE, fetchShows)
}
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof reducer>;
export default store;
