import { combineReducers , createStore} from "redux";
import ShowReducer from "./reducers/Shows";
const reducer = combineReducers({shows: ShowReducer});
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export type State = ReturnType<typeof reducer>;
export default store;