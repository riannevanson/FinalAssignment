import React, { PureComponent } from "react";

class CommentForm extends PureComponent {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state, this.props.event);
    // console.log(this.props.event, "event in form");
  };

  handleChange = comment => {
    const { name, value } = comment.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const initialValues = this.props.initialValues || {};

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="comment">Add comment: </label>
          <input
            name="comment"
            id="comment"
            value={
              this.state.comment !== undefined
                ? this.state.comment
                : initialValues.comment
            }
            onChange={this.handleChange}
            type="text"
          />
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}

export default CommentForm;
