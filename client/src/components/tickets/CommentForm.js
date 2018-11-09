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
          <label htmlFor="name">Comment name</label>
          <input
            name="name"
            id="name"
            value={
              this.state.name !== undefined
                ? this.state.name
                : initialValues.name
            }
            onChange={this.handleChange}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="picture">Comment picture</label>
          <input
            name="pictureUrl"
            id="pictureUrl"
            value={
              this.state.pictureUrl !== undefined
                ? this.state.pictureUrl
                : initialValues.pictureUrl
            }
            onChange={this.handleChange}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="description">Comment description</label>
          <input
            name="description"
            id="description"
            value={
              this.state.description !== undefined
                ? this.state.description
                : initialValues.description
            }
            onChange={this.handleChange}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="price">price</label>
          <input
            name="price"
            id="price"
            value={
              this.state.price !== undefined
                ? this.state.price
                : initialValues.price
            }
            onChange={this.handleChange}
            type="integer"
          />
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}

export default CommentForm;
