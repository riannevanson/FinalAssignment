import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchAllTickets } from "../../actions/tickets";
import * as riskLogic from "../../lib/riskLogic";

class RiskCalculator extends PureComponent {
  render() {
    const { tickets, currentTicket } = this.props;
    if (currentTicket.length === 0 || tickets.length === 0) return "Loading...";

    const numberTicketsAuthor = tickets.filter(ticket => {
      return ticket.user.id === currentTicket.user.id;
    }).length;

    const priceTicketArray = tickets
      .filter(ticket => {
        return (
          ticket.event.id === currentTicket.event.id &&
          ticket.user.id !== currentTicket.user.id
        );
      })
      .map(ticket => ticket.price);

    const comments = currentTicket.comment;
    const currentTicketPrice = currentTicket.price;
    const currentTimeStamp = currentTicket.timestamp;

    const averagePriceTicket =
      priceTicketArray.length === 0
        ? currentTicketPrice
        : priceTicketArray.reduce((total, score) => total + score) /
          priceTicketArray.length;

    // if (currentTicket !== undefined) {
    //   const averagePriceTicket = priceTicketArray => {
    //     if (priceTicketArray.length > 0) {
    //       return (
    //         priceTicketArray.reduce((total, score) => total + score) /
    //         priceTicketArray.length
    //       );
    //     } else {
    //       return currentTicketPrice;
    //     }
    //   };

    const numberofcomments = comments.length;
    const time = new Date(currentTimeStamp);
    const timestampHour = time.getHours() + 2;
    console.log(numberofcomments, "numberofcomments");
    console.log(timestampHour, "timestampHour");

    const countedRisk =
      riskLogic.numberTicketsAuthorRisk(numberTicketsAuthor) +
      riskLogic.averagePriceRisk(averagePriceTicket, currentTicketPrice) +
      riskLogic.timeAddedRisk(timestampHour) +
      riskLogic.commentRisk(numberofcomments);

    return (
      <div>
        <div>
          finalRisk: {Math.round(riskLogic.finalRisk(countedRisk) * 10) / 10}
          <br />
          <br />
          <br />
          {/* <div>priceTicketArray is: {priceTicketArray}</div>
          <div>numberTicketsAuthor is: {numberTicketsAuthor}</div>
          {console.log(numberTicketsAuthor, "numberTicketsAuthor")}
          <div>averagePriceTicket is: {averagePriceTicket}</div>
          {console.log(averagePriceTicket, "averagePriceTicke")}
          <div>currentTicketPrice is: {currentTicketPrice}</div>
          {console.log(currentTicketPrice, "currentTicketPrice")}
          <div>numberofcomments is: {numberofcomments}</div>
          {console.log(numberofcomments, "numberofcomments")}
          <div>timestampHour is: {timestampHour}</div>
          {console.log(timestampHour, "timestampHour")}
          {console.log(currentTicket, "currentTicket")}
          <div>
            numberTicketsAuthorRisk:
            {riskLogic.numberTicketsAuthorRisk(numberTicketsAuthor)}
          </div>
          <div>
            averagePriceRisk:
            {riskLogic.averagePriceRisk(averagePriceTicket, currentTicketPrice)}
          </div>
          <div>timeAddedRisk: {riskLogic.timeAddedRisk(timestampHour)}</div>
          <div>commentRisk: {riskLogic.commentRisk(numberofcomments)}</div>
          <div>finalRisk: {riskLogic.finalRisk(countedRisk)}</div> */}
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
  { fetchAllTickets }
)(RiskCalculator);
