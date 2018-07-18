import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { fetchAllEvents, createEvent } from "../../actions/events";
import { Link } from "react-router-dom";
import EventForm from "./EventForm";

class EventsList extends PureComponent {
  componentWillMount() {
    this.props.fetchAllEvents();
  }
  createNewEvent = event => {
    this.props.createEvent(event);
  };

  render() {
    const { events } = this.props;
    return (
      <div>
        <p>Welcome</p>

        {!this.props.currentUser && (
          <p>
            Please <Link to="/login">login</Link>
          </p>
        )}

        <p>
          <h1>All events</h1>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>
                    <Link to={`/events/${event.id}`}>{event.name}</Link>
                  </td>

                  <td>{event.pictureUrl}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h1>Create a new event</h1>

          <EventForm onSubmit={this.createNewEvent} />
        </p>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    events: state.events,
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllEvents,
    createEvent
  }
)(EventsList);
