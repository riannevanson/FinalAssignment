import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchAllTickets, createTicket } from "../../actions/tickets";
import { Link } from "react-router-dom";
import TicketForm from "./TicketForm";
import { fetchEvent, updateEvent, deleteEvent } from "../../actions/events";
import EventDetails from "../events/EventDetails";
import Card from "@material-ui/core/Card";

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
      <div className="pageContainer">
        {!this.props.currentUser && (
          <p>
            Please <Link to="/login">login</Link>
          </p>
        )}
        <div>
          <EventDetails eventId={event.id} />
          <Card className="creatNew">
            Create a new ticket
            <TicketForm onSubmit={this.createNewTicket} event={event.id} />
          </Card>
        </div>
        <div className="allListContainer">
          <h1>All tickets for this event</h1>

          {eventTickets.map(ticket => (
            <Card className="eventCard">
              <tr key={ticket.id}>
                <td>
                  <img className="pictureEvent" src={ticket.pictureUrl} />
                </td>
                <td>
                  <Link to={`tickets/${ticket.id}`}>
                    <div className="dikgedrukt">{ticket.name} </div>
                  </Link>
                </td>
                <td> for €{ticket.price}</td>
              </tr>
            </Card>
          ))}
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
