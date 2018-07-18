import React, { PureComponent } from "react";
import { connect } from "react-redux";

class CommentsList extends PureComponent {
  render() {
    const { products } = this.props;

    return <div>I will be some comments</div>;
  }
}

const mapStateToProps = function(state) {
  return {
    // products: state.sampleReducer
  };
};

export default connect(mapStateToProps)(CommentsList);
