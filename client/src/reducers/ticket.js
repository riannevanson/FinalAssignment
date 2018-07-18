import { FETCHED_DETAILED_EVENT } from "../actions/events";
import { UPDATE_EVENT } from "../actions/events";

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_DETAILED_EVENT:
      return action.payload;
    case UPDATE_EVENT:
      if (action.payload.id === state.id) {
        return action.payload;
      } else return state;
    default:
      return state;
  }
}
