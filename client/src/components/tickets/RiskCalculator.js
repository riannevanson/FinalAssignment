import React, { PureComponent } from "react";
import { connect } from "react-redux";

class RiskCalculator extends PureComponent {
  render() {
    const { products } = this.props;

    const timeNow = Date.now();

    return (
      <div>
        {timeNow}
        I will be some Risks
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    // products: state.sampleReducer
  };
};

export default connect(mapStateToProps)(RiskCalculator);
