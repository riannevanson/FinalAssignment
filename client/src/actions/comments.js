import * as request from "superagent";

import { baseUrl } from "../constants";

export const FETCHED_DETAILED_COMMENT = "FETCHED_DETAILED_COMMENT";
export const FETCHED_ALL_COMMENTS = "FETCHED_ALL_COMMENTS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const FETCHED_ALL_COMMENTS_FROM_EVENT_ID =
  "FETCHED_ALL_COMMENTS_FROM_EVENT_ID";

// export const fetchComment = () => dispatch => {
//   request
//     .get(`${baseUrl}/tickets/${ticketId}/comments/${commentId}`)
//     .then(response =>
//       dispatch({
//         type: FETCHED_DETAILED_COMMENT,
//         payload: response.body
//       })
//     )
//     .catch(err => alert(err));
// };

export const fetchAllCommentsFromTicketId = ticketId => dispatch => {
  request
    .get(`${baseUrl}/tickets/${ticketId}/comments`)
    .then(response =>
      dispatch({
        type: FETCHED_ALL_COMMENTS_FROM_EVENT_ID,
        payload: response.body.comments
      })
    )
    .catch(err => alert(err));

  // ... implement!
  // Hint: make sure to use json.comments and not json as payload,
  // because you send back an envelope! (so response.body.comments)
};

// export const fetchAllComments = () => dispatch => {
//   request
//     .get(`${baseUrl}/comments`)
//     .then(response =>
//       dispatch({
//         type: FETCHED_ALL_COMMENTS,
//         payload: response.body.comments
//       })
//     )
//     .catch(err => alert(err));

//   // ... implement!
//   // Hint: make sure to use json.comments and not json as payload,
//   // because you send back an envelope! (so response.body.comments)
// };

export const createComment = (ticketId, comment) => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .post(`${baseUrl}/tickets/${ticketId}/comments`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(comment)
    .then(response =>
      dispatch({
        type: CREATE_COMMENT,
        payload: response.body
      })
    );
};
//(response => alert(JSON.stringify(response.body)))

export const deleteComment = commentId => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .delete(`${baseUrl}/comments/${commentId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response => {
      console.log(response.body);
      dispatch({
        type: REMOVE_COMMENT,
        payload: response.body
      });
    });
};

export const updateComment = (commentId, updates) => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .put(`${baseUrl}/comments/${commentId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(updates)
    .then(response => {
      console.log(response.body);
      dispatch({
        type: UPDATE_COMMENT,
        payload: response.body
      });
    });
};
