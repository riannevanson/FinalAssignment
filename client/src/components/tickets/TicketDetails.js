import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { fetchTicket, updateTicket, deleteTicket } from "../../actions/tickets";
import TicketForm from "./TicketForm";
import CommentsList from "./CommentsList";
import RiskCalculator from "./RiskCalculator";

class TicketDetails extends PureComponent {
  state = {
    edit: false
  };

  componentWillMount(props) {
    this.props.fetchTicket(this.props.match.params.ticketId);
    // this.props.fetchTicket(this.props.match.params.id);
    // console.log(this.props.match.params.id);
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  updateTicket = (ticket, ticketId, eventId) => {
    ticketId = this.props.match.params.ticketId;
    eventId = this.props.match.params.id;
    this.props.updateTicket(ticket, ticketId, eventId);
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
            <h1>{ticket.name}</h1>'hi i am an ticket'
            <p> {ticket.description}</p>
          </div>
        )}
        <button onClick={() => this.toggleEdit(ticket.id)}>Edit ticket</button>
        <button onClick={() => this.deleteThisTicket(ticket.id)}>
          Remove ticket
        </button>
        <br />
        <br /> <br />
        <CommentsList />
        <br />
        <br /> <br />
        <RiskCalculator currentTicket={ticket} />
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
