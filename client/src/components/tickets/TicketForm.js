import React, { PureComponent } from "react";

class TicketForm extends PureComponent {
  state = {};

  handleSubmit = e => {
    e.prticketDefault();
    this.props.onSubmit(this.state);
  };

  handleChange = ticket => {
    const { name, value } = ticket.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const initialValues = this.props.initialValues || {};
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Ticket name</label>
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
          <label htmlFor="picture">Ticket picture</label>
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
          <label htmlFor="description">Ticket description</label>
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

export default TicketForm;
