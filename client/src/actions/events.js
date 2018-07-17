import * as request from "superagent";

const baseUrl = "http://localhost:4000";

export const FETCHED_DETAILED_EVENT = "FETCHED_DETAILED_EVENT";
export const FETCHED_ALL_EVENTS = "FETCHED_ALL_EVENTS";
export const CREATE_EVENT = "CREATE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";

export const fetchEvent = eventId => dispatch => {
  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(response =>
      dispatch({
        type: FETCHED_DETAILED_EVENT,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

export const fetchAllEvents = () => dispatch => {
  request
    .get(`${baseUrl}/events`)
    .then(response =>
      dispatch({
        type: FETCHED_ALL_EVENTS,
        payload: response.body.events
      })
    )
    .catch(err => alert(err));

  // ... implement!
  // Hint: make sure to use json.events and not json as payload,
  // because you send back an envelope! (so response.body.events)
};

export const createEvent = event => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .post(`${baseUrl}/events`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(event)
    .then(response =>
      dispatch({
        type: CREATE_EVENT,
        payload: response.body
      })
    );
};
//(response => alert(JSON.stringify(response.body)))

export const deleteEvent = eventId => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .delete(`${baseUrl}/events/${eventId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response => {
      console.log(response.body);
      dispatch({
        type: REMOVE_EVENT,
        payload: response.body
      });
    });
};

export const updateEvent = (eventId, updates) => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .put(`${baseUrl}/events/${eventId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(updates)
    .then(response => {
      console.log(response.body);
      dispatch({
        type: UPDATE_EVENT,
        payload: response.body
      });
    });
};
