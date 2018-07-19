import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userId } from "../../jwt";
import { fetchAllTicketsFromEventId } from "../../actions/tickets";
import * as riskLogic from "../../lib/riskLogic";

class RiskCalculator extends PureComponent {
  componentWillMount() {
    this.props.fetchAllTicketsFromEventId(2);
  }

  render() {
    const { tickets, currentTicket, event } = this.props;
    if (currentTicket === null || tickets === null || event === null)
      return "Loading...";
    if (!currentTicket) return "Not found currentTicket";

    const numberTicketsAuthor = this.props.tickets.filter(ticket => {
      return ticket.user.id === this.props.currentTicket.user.id;
    }).length;

    const PriceTicketArray = this.props.tickets
      .filter(ticket => {
        return (
          ticket.event.id === this.props.currentTicket.event.id &&
          ticket.user.id !== this.props.currentTicket.user.id
        );
      })
      .map(ticket => ticket.price);

    const comments = this.props.currentTicket.comment;

    const currentTicketPrice = this.props.currentTicket.price;

    const currentTimeStamp = this.props.currentTicket.timestamp;

    const renderVariables = (numberTicketsAuthor,
    PriceTicketArray,
    currentTicketPrice,
    comments,
    currentTimeStamp);
    if (numberTicketsAuthor.length > 0 || PriceTicketArray.length > 0) {
      const averagePriceTicket =
        PriceTicketArray.reduce((total, score) => total + score) /
        PriceTicketArray.length;

      const numberofcomments = comments.length;
      const time = new Date(currentTimeStamp);
      const timestampHour = time.getHours() + 2;

      const countedRisk =
        riskLogic.numberTicketsAuthorRisk(numberTicketsAuthor) +
        riskLogic.averagePriceRisk(averagePriceTicket, currentTicketPrice) +
        riskLogic.timeAddedRisk(timestampHour) +
        riskLogic.commentRisk(numberofcomments);

      return (
        <div>
          <div>finalRisk: {riskLogic.finalRisk(countedRisk)}</div>
        </div>
      );
    } else {
      return "riskRating = pietje";
    }

    //let finalRisk = numberTicketsAuthor;
    //logic--------------------------------------------------------------
    //  riskLogic.averagePriceRisk(averagePriceTicket, ticketPrice);

    // console.log("numberofcomments=", this.props.currentTicket.comment.length);
  }
}

const mapStateToProps = function(state) {
  return {
    event: state.event,
    tickets: state.tickets
  };
};

export default connect(
  mapStateToProps,
  { fetchAllTicketsFromEventId }
)(RiskCalculator);
