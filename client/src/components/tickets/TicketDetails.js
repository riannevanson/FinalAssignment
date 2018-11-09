import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { fetchTicket, updateTicket, deleteTicket } from "../../actions/tickets";
import TicketForm from "./TicketForm";

class TicketDetails extends PureComponent {
  state = {
    edit: false
  };

  componentWillMount(props) {
    this.props.fetchTicket(this.props.match.params.id);
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  updateTicket = ticket => {
    this.props.updateTicket(this.props.match.params.id, ticket);
    this.toggleEdit();
  };

  deleteThisTicket = ticketId => {
    this.props.deleteTicket(ticketId);
  };

  render() {
    const { ticket } = this.props;
    if (!ticket) return null;
    return (
      <div>
        {this.state.edit && (
          <TicketForm initialValues={ticket} onSubmit={this.updateTicket} />
        )}

        {!this.state.edit && (
          <div>
            <h1>{ticket.name}</h1>
            <p> {ticket.description}</p>
          </div>
        )}

        <button>Buy this ticket</button>
        <button onClick={() => this.toggleEdit(ticket.id)}>EDIT EVENT</button>
        <button onClick={() => this.deleteThisTicket(ticket.id)}>
          Remove product
        </button>
      </div>
    );
  }
}
const mapStateToProps = function(state, props) {
  return {
    ticket: state.ticket
  };
};

export default connect(
  mapStateToProps,
  { fetchTicket, updateTicket, deleteTicket }
)(TicketDetails);
