import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userId } from "../../jwt";
import { fetchAllTicketsFromEventId } from "../../actions/tickets";

class RiskCalculator extends PureComponent {
  componentWillMount() {
    this.props.fetchAllTicketsFromEventId(2);
  }
  render() {
    //const { products } = this.props;
    let finalRisk = 0;

    if (this.props.currentTicket.length !== 0) {
      // const numberTicketsAuthor = this.props.tickets.filter(ticket => {
      //   return ticket.user.id === this.props.currentTicket.user.id;
      // }).length

      // const averagePriceTicket =     this.props.tickets
      // .filter(ticket => {
      //   return (
      //     ticket.event.id === this.props.currentTicket.event.id &&
      //     ticket.user.id !== this.props.currentTicket.user.id
      //   );
      // })
      // .map(ticket => ticket.price)
      // const numberOfComments =

      // const ticketPrice = this.props.currentTicket.price

      //  const time = new Date(this.props.currentTicket.timestamp);
      //  const timestampHour = time.getHours() + 2;

      console.log(
        "averagePriceTicket=",
        this.props.tickets
          .filter(ticket => {
            return (
              ticket.event.id === this.props.currentTicket.event.id &&
              ticket.user.id !== this.props.currentTicket.user.id
            );
          })
          .map(ticket => ticket.price)
      );
    }
    return (
      <div>
        <h1>
          {" "}
          Risk rating:
          {finalRisk}
        </h1>
      </div>
    );
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
