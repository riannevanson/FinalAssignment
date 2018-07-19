import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchAllTickets, createTicket } from "../../actions/tickets";
import { Link } from "react-router-dom";
import TicketForm from "./TicketForm";
import { fetchEvent, updateEvent, deleteEvent } from "../../actions/events";

class TicketsList extends PureComponent {
  componentWillMount() {
    this.props.fetchAllTickets(this.props.match.params.id);
    this.props.fetchEvent(this.props.match.params.id);
  }
  createNewTicket = (ticket, eventId) => {
    this.props.createTicket(ticket, eventId);
  };

  render() {
    const { tickets, event } = this.props;
    let eventTickets = tickets.filter(
      ticket => ticket.event !== undefined && ticket.event.id === event.id
    );
    return (
      <div>
        <p>Welcome</p>

        {!this.props.currentUser && (
          <p>
            Please <Link to="/login">login</Link>
          </p>
        )}
        <div>
          <h1>{event.name}</h1>
          <p> {event.description}</p>
        </div>
        <div>
          <h1>All tickets for this event</h1>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {eventTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>
                    <Link to={`tickets/${ticket.id}`}>{ticket.name}</Link>
                  </td>

                  <td>
                    <img src={ticket.pictureUrl} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Create a new ticket</h1>

          <TicketForm onSubmit={this.createNewTicket} event={event.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    tickets: state.tickets,
    currentUser: state.currentUser,
    event: state.event
  };
};

export default connect(
  mapStateToProps,
  {
    createTicket,
    fetchEvent,
    updateEvent,
    deleteEvent,
    fetchAllTickets
  }
)(TicketsList);
