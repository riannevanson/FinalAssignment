import React, { PureComponent } from "react";

import { connect } from "react-redux";
import {
  fetchAllCommentsFromTicketId,
  createComment
} from "../../actions/comments";
import { fetchAllTicketsFromEventId, fetchTicket } from "../../actions/tickets";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { fetchEvent, updateEvent, deleteEvent } from "../../actions/events";

class CommentsList extends PureComponent {
  componentWillMount() {
    this.props.fetchAllCommentsFromTicketId(this.props.ticket.id);
  }

  createNewComment = (comment, ticketId) => {
    this.props.createComment(comment, ticketId);
  };

  render() {
    const { comments, ticket } = this.props;
    let ticketComments = comments.filter(
      comment => comment.ticket !== undefined && comment.ticket.id === ticket.id
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
          <h1>{ticket.name}</h1>
          <p> {ticket.description}</p>
        </div>
        <div>
          <h1>All comments for this ticket</h1>

          <table>
            <thead>
              <tr>
                <th>user</th>
                <th>comment</th>
              </tr>
            </thead>
            <tbody>
              {ticketComments.map(comment => (
                <tr key={comment.id}>
                  <td>{comment.user.email}</td>
                  <td>
                    <Link to={`comments/${comment.id}`}>{comment.comment}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Create a new comment</h1>

          <CommentForm onSubmit={this.createNewComment} ticket={ticket.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    comments: state.comments,
    currentUser: state.currentUser,
    ticket: state.ticket
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
