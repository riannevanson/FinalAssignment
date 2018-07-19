import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userId } from "../../jwt";
import { fetchAllTicketsFromEventId } from "../../actions/tickets";
import * as riskLogic from "../../lib/riskLogic";

class RiskCalculator extends PureComponent {
  componentWillMount() {
    this.props.fetchAllTicketsFromEventId(2);
    // const fetchCurrentTicket = () => {
    //   let currentTicket = 0;
    //   if (this.props.currentTicket.length > 0) {
    //     return this.props.currentTicket;
    //   } else {
    //     return null;
    //   }
    // };
  }

  render() {
    const { tickets, currentTicket, event } = this.props;
    if (currentTicket === null || tickets === null || event === null)
      return "Loading...";
    if (!currentTicket) return "Not found currentTicket";
    // const currentTicket = this.props.currentTicket || {};
    // let finalRisk = 0;

    // if (this.props.currentTicket || this.props.currentTicket.length > 0) {

    //nessesary variables------------------------------------
    const numberTicketsAuthor = this.props.tickets.filter(ticket => {
      return ticket.user.id === this.props.currentTicket.user.id;
    }).length;

    // console.log(numberTicketsAuthor, "numberTicketsAuthor");

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

      return (
        <div>
          <div>PriceTicketArray is: {PriceTicketArray}</div>

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

          <div>
            numberTicketsAuthorRisk:{" "}
            {riskLogic.numberTicketsAuthorRisk(numberTicketsAuthor)}
          </div>

          <div>
            averagePriceRisk:{" "}
            {riskLogic.averagePriceRisk(averagePriceTicket, currentTicketPrice)}
          </div>

          <div>timeAddedRisk: {riskLogic.timeAddedRisk(timestampHour)}</div>
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
