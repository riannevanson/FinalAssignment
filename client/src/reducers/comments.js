import { CREATE_COMMENT } from "../actions/comments";
import { REMOVE_COMMENT } from "../actions/comments";
import { UPDATE_COMMENT } from "../actions/comments";

import {
  FETCHED_ALL_COMMENTS,
  FETCHED_ALL_COMMENTS_FROM_EVENT_ID
} from "../actions/comments";

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_ALL_COMMENTS:
      return action.payload;
    case FETCHED_ALL_COMMENTS_FROM_EVENT_ID:
      return action.payload;
    case CREATE_COMMENT:
      return [...state, action.payload]; //state.concat(action.payload)
    case REMOVE_COMMENT:
      return state.filter(comment => comment.id !== action.payload.id);
    case UPDATE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.payload) {
          return action.payload;
        } else {
          return comment;
        }
      });

    default:
      return state;
  }
}
