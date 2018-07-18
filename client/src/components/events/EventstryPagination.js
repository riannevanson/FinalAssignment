import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { fetchAllEvents, createEvent } from "../../actions/events";
import { Link } from "react-router-dom";
import EventForm from "./EventForm";
import { Table, Pagination } from "react-bootstrap";
import { routerMiddleware, push } from "react-router-redux";

class EventsList extends PureComponent {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    this.props.fetchAllEvents();
  }
  createNewEvent = event => {
    this.props.createEvent(event);
  };

  render() {
    const page = 1;
    //pagination
    const per_page = 9;
    const pages = Math.ceil(this.props.events.length / per_page);
    const current_page = this.props.page;
    const start_offset = (current_page - 1) * per_page;
    let start_count = 0;

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
              {events.map((event, index) => {
                if (index >= start_offset && start_count < per_page) {
                  start_count++;
                  return (
                    <tr key={event.id}>
                      <td>{event.id}</td>
                      <td>
                        <Link to={`/events/${event.id}`}>{event.name}</Link>
                      </td>

                      <td>{event.pictureUrl}</td>
                    </tr>
                  );
                }
                // <tr key={event.id}>
                //   <td>{event.id}</td>
                //   <td>
                //     <Link to={`/events/${event.id}`}>{event.name}</Link>
                //   </td>

                //   <td>{event.pictureUrl}</td>
                // </tr>
              })}
            </tbody>
          </table>

          <Pagination
            className="events-pagination pull-right"
            bsSize="medium"
            maxButtons={9}
            first
            last
            next
            prev
            boundaryLinks
            items={pages}
            activePage={current_page}
            onSelect={this.changePage}
          />
          <h1>Create a new event</h1>

          <EventForm onSubmit={this.createNewEvent} />
        </p>
      </div>
    );
  }

  changePage(page) {
    this.props.dispatch(push("/?page=" + page));
  }
}

const mapStateToProps = function(state) {
  return {
    events: state.events,
    currentUser: state.currentUser
    //  page: Number(state.routing.locationBeforeTransitions.query.page) || 1
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllEvents,
    createEvent
  }
)(EventsList);
