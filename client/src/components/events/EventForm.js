import React, { PureComponent } from "react";

class EventForm extends PureComponent {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const initialValues = this.props.initialValues || {};
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Event name</label>
          <input
            name="name"
            id="name"
            value={
              this.state.name !== undefined
                ? this.state.name
                : initialValues.name
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="picture">Event picture</label>
          <input
            name="pictureUrl"
            id="pictureUrl"
            value={
              this.state.pictureUrl !== undefined
                ? this.state.pictureUrl
                : initialValues.pictureUrl
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Event description</label>
          <input
            name="description"
            id="description"
            value={
              this.state.description !== undefined
                ? this.state.description
                : initialValues.description
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="startDate">startDate</label>
          <input
            name="startDate"
            id="startDate"
            value={
              this.state.startDate !== undefined
                ? this.state.startDate
                : initialValues.startDate
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="endDate">endDate</label>
          <input
            name="endDate"
            id="endDate"
            value={
              this.state.endDate !== undefined
                ? this.state.endDate
                : initialValues.endDate
            }
            onChange={this.handleChange}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}

export default EventForm;
