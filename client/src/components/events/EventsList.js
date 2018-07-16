import React, { PureComponent } from "react";
import { connect } from "react-redux";
// import SampleComponent from "./SampleComponent";

class EventsList extends PureComponent {
  render() {
    // const { products } = this.props;
    return <div>hi</div>;
    // return products ? <SampleComponent /> : "Loading";
  }
}

const mapStateToProps = function(state) {
  return {
    // products: state.sampleReducer
  };
};

export default connect(mapStateToProps)(EventsList);
