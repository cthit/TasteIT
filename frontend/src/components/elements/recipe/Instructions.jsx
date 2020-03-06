import React, { Component } from "react";
import { DigitMarkdown } from "@cthit/react-digit-components";
import "./styles/Instructions.css";

class Instructions extends Component {
  render() {
    return (
      <div className="recipeInstructionsArea">
        <DigitMarkdown markdownSource={this.props.instructions} />
      </div>
    );
  }
}

export default Instructions;
