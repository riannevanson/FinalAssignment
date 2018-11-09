import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { fetchEvent, updateEvent, deleteEvent } from "../../actions/events";
import EventForm from "./EventForm";
import { Button } from "../../../node_modules/material-ui";

class EventDetails extends PureComponent {
  state = {
    edit: false
  };

  componentWillMount(props) {
    // this.props.fetchEvent(this.props.match.params.id);
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  updateEvent = event => {
    this.props.updateEvent(this.props.match.params.id, event);
    this.toggleEdit();
  };

  deleteThisEvent = eventId => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { event } = this.props;
    if (!event) return null;
    return (
      <div className="generalContainerCenter">
        {this.state.edit && (
          <EventForm
            initialValues={event}
            //    initialValuesPicture="http://www.youthincmag.com/wp-content/uploads/2016/07/musicfestival1.jpg"
            onSubmit={this.updateEvent}
          />
        )}

        {!this.state.edit && (
          <div>
            <h1>Eventname: {event.name}</h1>
            <p>Description: {event.description}</p>
          </div>
        )}

        <Button onClick={() => this.toggleEdit(event.id)}>EDIT EVENT</Button>
      </div>
    );
  }
}
const mapStateToProps = function(state, props) {
  return {
    event: state.event
  };
};

export default connect(
  mapStateToProps,
  { fetchEvent, updateEvent, deleteEvent }
)(EventDetails);
