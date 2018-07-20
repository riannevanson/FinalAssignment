import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { fetchAllEvents, createEvent } from "../../actions/events";
import { Link } from "react-router-dom";
import EventForm from "./EventForm";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

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
        {!this.props.currentUser && (
          <p className="login">
            Please <Link to="/login">login</Link>
          </p>
        )}
        <div className="pageContainer">
          <div className="allListContainer">
            <h1>All events</h1>

            {events.map(event => (
              <div className="cardWrapper">
                <Card className="eventCard">
                  <img src={event.pictureUrl} className="pictureEvent" />
                  <CardContent>
                    <div key={event.id}>
                      <div>
                        <Link to={`/events/${event.id}/tickets`}>
                          <div className="dikgedrukt"> {event.name}</div>
                        </Link>
                        <div>starts at: {event.startDate}</div>
                        <div> Ends at: {event.endDate} </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          {this.props.currentUser && (
            <Card className="creatNew">
              <h1>Create a new event!</h1>

              <EventForm onSubmit={this.createNewEvent} />
            </Card>
          )}
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
