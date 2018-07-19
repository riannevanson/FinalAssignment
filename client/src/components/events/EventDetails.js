// import React, { PureComponent } from "react";

// import { connect } from "react-redux";
// import { fetchEvent, updateEvent, deleteEvent } from "../../actions/events";
// import EventForm from "./EventForm";

// class EventDetails extends PureComponent {
//   state = {
//     edit: false
//   };

//   componentWillMount(props) {
//     this.props.fetchEvent(this.props.match.params.id);
//   }

//   toggleEdit = () => {
//     this.setState({
//       edit: !this.state.edit
//     });
//   };

//   updateEvent = event => {
//     this.props.updateEvent(this.props.match.params.id, event);
//     this.toggleEdit();
//   };

//   deleteThisEvent = eventId => {
//     this.props.deleteEvent(eventId);
//   };

//   render() {
//     const { event } = this.props;
//     if (!event) return null;
//     return (
//       <div>
//         {this.state.edit && (
//           <EventForm initialValues={event} onSubmit={this.updateEvent} />
//         )}

//         {!this.state.edit && (
//           <div>
//             <h1>{event.name}</h1>
//             <p> {event.description}</p>
//           </div>
//         )}

//         <button>Buy this event</button>
//         <button onClick={() => this.toggleEdit(event.id)}>EDIT EVENT</button>
//         <button onClick={() => this.deleteThisEvent(event.id)}>
//           Remove product
//         </button>
//       </div>
//     );
//   }
// }
// const mapStateToProps = function(state, props) {
//   return {
//     event: state.event
//   };
// };

// export default connect(
//   mapStateToProps,
//   { fetchEvent, updateEvent, deleteEvent }
// )(EventDetails);
