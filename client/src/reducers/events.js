import { CREATE_EVENT } from "../actions/events";
import { REMOVE_EVENT } from "../actions/events";
import { UPDATE_EVENT } from "../actions/events";

import { FETCHED_ALL_EVENTS } from "../actions/events";

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_ALL_EVENTS:
      return action.payload;
    case CREATE_EVENT:
      return [...state, action.payload]; //state.concat(action.payload)
    case REMOVE_EVENT:
      return state.filter(event => event.id !== action.payload.id);
    case UPDATE_EVENT:
      return state.map(event => {
        if (event.id === action.payload) {
          return action.payload;
        } else {
          return event;
        }
      });

    default:
      return state;
  }
}
