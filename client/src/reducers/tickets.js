import { CREATE_TICKET } from "../actions/tickets";
import { REMOVE_TICKET } from "../actions/tickets";
import { UPDATE_TICKET } from "../actions/tickets";

import {
  FETCHED_ALL_TICKETS,
  FETCHED_ALL_TICKETS_FROM_EVENT_ID
} from "../actions/tickets";

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_ALL_TICKETS:
      return action.payload;
    case FETCHED_ALL_TICKETS_FROM_EVENT_ID:
      return action.payload;
    case CREATE_TICKET:
      return [...state, action.payload]; //state.concat(action.payload)
    case REMOVE_TICKET:
      return state.filter(ticket => ticket.id !== action.payload.id);
    case UPDATE_TICKET:
      return state.map(ticket => {
        if (ticket.id === action.payload) {
          return action.payload;
        } else {
          return ticket;
        }
      });

    default:
      return state;
  }
}
