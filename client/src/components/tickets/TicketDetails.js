import React, { PureComponent } from "react";

import { connect } from "react-redux";
import {
  fetchTicket,
  updateTicket,
  deleteTicket,
  fetchAllTickets
} from "../../actions/tickets";
import TicketForm from "./TicketForm";
import CommentsList from "./CommentsList";
import RiskCalculator from "./RiskCalculator";
import Button from "material-ui/Button";

class TicketDetails extends PureComponent {
  state = {
    edit: false
  };

  componentWillMount(props) {
    this.props.fetchTicket(this.props.match.params.ticketId);
    this.props.fetchAllTickets(0);
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  updateTicket = ticket => {
    const ticketId = this.props.match.params.ticketId;
    const eventId = this.props.match.params.id;
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
        <div className="displayCenter">
          {this.state.edit && (
            <TicketForm initialValues={ticket} onSubmit={this.updateTicket} />
          )}
          {!this.state.edit && (
            <div className="displayCenter">
              <div className="bigFont">Ticketname: {ticket.name}</div>
              <div> Desciption: {ticket.description}</div>
              <div className="mediumFont">
                <RiskCalculator
                  currentTicket={ticket}
                  ticketId={this.props.match.params.ticketId}
                />
              </div>
            </div>
          )}
          <Button onClick={() => this.toggleEdit(ticket.id)}>
            Edit ticket
          </Button>
          <br /> <br />
          <CommentsList />
        </div>
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
  { fetchTicket, updateTicket, deleteTicket, fetchAllTickets }
)(TicketDetails);
