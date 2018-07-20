import React, { PureComponent } from "react";

import { connect } from "react-redux";
import {
  fetchAllCommentsFromTicketId,
  createComment
} from "../../actions/comments";
import { fetchAllTickets } from "../../actions/tickets";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { fetchEvent, updateEvent, deleteEvent } from "../../actions/events";
import Card from "@material-ui/core/Card";

class CommentsList extends PureComponent {
  componentWillMount() {
    this.props.fetchAllCommentsFromTicketId(this.props.ticket.id);
  }

  createNewComment = comment => {
    this.props.createComment(this.props.ticket.id, comment);
  };

  render() {
    const { comments, ticket } = this.props;
    let ticketComments = comments.filter(
      comment => comment.ticket !== undefined && comment.ticket.id === ticket.id
    );

    const ticketUserId = ticket.user !== undefined ? ticket.user.id : 0;

    return (
      <div>
        {!this.props.currentUser && (
          <p>
            Please <Link to="/login">login</Link>
          </p>
        )}

        <div className="pageContainer">
          <div className="displayCenter">
            <div className="bigFont">All comments for this ticket</div>

            <div>
              <tbody>
                {ticketComments.map(comment => (
                  <Card className="eventCard " key={comment.id}>
                    <div className="dikgedrukt">{comment.user.firstName}</div>
                    <div>said "{comment.comment}"</div>
                  </Card>
                ))}
              </tbody>
            </div>
          </div>
          {1 && (
            <div className=".creatNew">
              <h1>Create a new comment</h1>
              <CommentForm
                onSubmit={this.createNewComment}
                ticket={ticket.id}
              />
            </div>
          )}
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
    createComment,
    fetchEvent,
    updateEvent,
    deleteEvent,
    fetchAllCommentsFromTicketId,
    fetchAllTickets
  }
)(CommentsList);
