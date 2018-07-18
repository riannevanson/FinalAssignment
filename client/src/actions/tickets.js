import * as request from "superagent";

import { baseUrl } from "../constants";

export const FETCHED_DETAILED_TICKET = "FETCHED_DETAILED_TICKET";
export const FETCHED_ALL_TICKETS = "FETCHED_ALL_TICKETS";
export const CREATE_TICKET = "CREATE_TICKET";
export const REMOVE_TICKET = "REMOVE_TICKET";
export const UPDATE_TICKET = "UPDATE_TICKET";
export const FETCHED_ALL_TICKETS_FROM_EVENT_ID =
  "FETCHED_ALL_TICKETS_FROM_EVENT_ID";

export const fetchTicket = ticketId => dispatch => {
  request
    .get(`${baseUrl}/tickets/${ticketId}`)
    .then(response =>
      dispatch({
        type: FETCHED_DETAILED_TICKET,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

export const fetchAllTicketsFromEventId = eventId => dispatch => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets`)
    .then(response =>
      dispatch({
        type: FETCHED_ALL_TICKETS_FROM_EVENT_ID,
        payload: response.body.tickets
      })
    )
    .catch(err => alert(err));

  // ... implement!
  // Hint: make sure to use json.tickets and not json as payload,
  // because you send back an envelope! (so response.body.tickets)
};

// export const fetchAllTickets = () => dispatch => {
//   request
//     .get(`${baseUrl}/tickets`)
//     .then(response =>
//       dispatch({
//         type: FETCHED_ALL_TICKETS,
//         payload: response.body.tickets
//       })
//     )
//     .catch(err => alert(err));

//   // ... implement!
//   // Hint: make sure to use json.tickets and not json as payload,
//   // because you send back an envelope! (so response.body.tickets)
// };

export const createTicket = (ticket, eventId) => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;
  console.log(eventId, "eventId in action");

  request
    .post(`${baseUrl}/events/${eventId}/tickets`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(ticket)
    .then(response =>
      dispatch({
        type: CREATE_TICKET,
        payload: response.body
      })
    );
};
//(response => alert(JSON.stringify(response.body)))

export const deleteTicket = ticketId => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .delete(`${baseUrl}/tickets/${ticketId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response => {
      console.log(response.body);
      dispatch({
        type: REMOVE_TICKET,
        payload: response.body
      });
    });
};

export const updateTicket = (ticketId, updates) => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .put(`${baseUrl}/tickets/${ticketId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(updates)
    .then(response => {
      console.log(response.body);
      dispatch({
        type: UPDATE_TICKET,
        payload: response.body
      });
    });
};
