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
    let { events } = this.props;

    function isFutureEvent(value) {
      const currentDate = new Date();
      const eventDate = new Date(value.endDate);
      return currentDate.getTime() < eventDate.getTime();
    }
    events = events.filter(isFutureEvent);

    return (
      <div>
        <p>Welcome here you can see all events</p>

        {!this.props.currentUser && (
          <p>
            Please <Link to="/login">login</Link>
          </p>
        )}

        <div className="pageWrapperBody">
          <div className="createEventWrapper">
            <h1>Create a new event</h1>

            <EventForm onSubmit={this.createNewEvent} className="eventFormwrapper"/>
          </div>

          <div className="allEventsWrapper">
            <h1>All events</h1>
            <div className="eventCardTable">
              {events.map(event => (
                <div key={event.id} className="card">
                  <img className="card--Img" src={event.pictureUrl} />
                  <div ey={event.id} className="card--event--txtWrapper">
                    <h3>{event.name}</h3>
                    <h4>{event.description}</h4>
                    <h4>
                      <Link to={`/events/${event.id}/tickets`}>
                        ga naar dit event >
                      </Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
