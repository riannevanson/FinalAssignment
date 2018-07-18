import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { fetchAllTickets, createTicket } from "../../actions/tickets";
import { Link } from "react-router-dom";
import TicketForm from "./TicketForm";

class TicketsList extends PureComponent {
  componentWillMount() {
    this.props.fetchAllTickets();
  }
  createNewTicket = ticket => {
    this.props.createTicket(ticket);
  };

  render() {
    const { tickets } = this.props;
    return (
      <div>
        <p>Welcome</p>

        {!this.props.currentUser && (
          <p>
            Please <Link to="/login">login</Link>
          </p>
        )}

        <p>
          <h1>All tickets</h1>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>
                    <Link to={`/tickets/${ticket.id}`}>{ticket.name}</Link>
                  </td>

                  <td>{ticket.pictureUrl}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Create a new ticket</h1>

          <TicketForm onSubmit={this.createNewTicket} />
        </p>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    tickets: state.tickets,
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllTickets,
    createTicket
  }
)(TicketsList);
