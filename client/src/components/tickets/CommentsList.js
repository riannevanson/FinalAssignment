import React, { PureComponent } from "react";

import { connect } from "react-redux";
import {
  fetchAllCommentsFromTicketId,
  createComment
} from "../../actions/comments";
import {
  fetchAllTicketsFromEventId,
  createTicket
} from "../../actions/tickets";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { fetchEvent, updateEvent, deleteEvent } from "../../actions/events";

class CommentsList extends PureComponent {
  componentWillMount() {
    //   this.props.fetchAllTicketsFromEventId(this.props.match.params.id);
    // this.props.fetchAllCommentsFromTicketId(this.props.match.params.id);
  }
  createNewComment = (comment, eventId) => {
    this.props.createComment(comment, eventId);
  };

  render() {
    const { comments, event } = this.props;
    console.log(event, "event");
    let eventComments = comments.filter(
      comment => comment.event !== undefined && comment.event.id === event.id
    );

    return (
      <div>
        <p>Welcome</p>

        {!this.props.currentUser && (
          <p>
            Please <Link to="/login">login</Link>
          </p>
        )}
        <div>
          <h1>{event.name}</h1>
          <p> {event.description}</p>
        </div>
        <div>
          <h1>All comments for this ticket</h1>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>user</th>
              </tr>
            </thead>
            <tbody>
              {eventComments.map(comment => (
                <tr key={comment.id}>
                  <td>{comment.id}</td>
                  <td>
                    <Link to={`comments/${comment.id}`}>{comment.comment}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Create a new comment</h1>

          <CommentForm onSubmit={this.createNewComment} event={event.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    comments: state.comments,
    currentUser: state.currentUser,
    event: state.event
  };
};

export default connect(
  mapStateToProps,
  {
    // fetchAllComments,
    createComment,
    fetchEvent,
    updateEvent,
    deleteEvent,
    fetchAllCommentsFromTicketId,
    fetchAllTicketsFromEventId
  }
)(CommentsList);
