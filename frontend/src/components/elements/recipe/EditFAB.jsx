import React, { Component } from "react";
import { DigitFAB } from "@cthit/react-digit-components";

class EditFAB extends Component {
  renderFABIfCreator = () => {
    let isCreator = this.props.isCreator;
    if (isCreator) {
      return (
        <DigitFAB icon={this.props.icon} primary onClick={this.props.onClick} />
      );
    }
  };

  render() {
    return <div className="editFAB">{this.renderFABIfCreator()}</div>;
  }
}

export default EditFAB;
