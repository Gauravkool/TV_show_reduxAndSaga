import { ActionCreator } from ".";
import { Show } from "../models/Show";


export const LOAD_SHOW_ACTION = "LOAD_SHOW_ACTION";

export const loadShowAction: ActionCreator<number> = (showId: number) => ({
  type: LOAD_SHOW_ACTION,
  payload: showId,
});
