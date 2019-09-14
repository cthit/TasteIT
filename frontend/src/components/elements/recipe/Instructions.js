import React, { Component } from "react";
import { DigitText } from "@cthit/react-digit-components";
import "./Instructions.css";

class Instructions extends Component {
    render() {
        console.log(this.props.instructions);
        return (
            <div className="recipeInstructionsArea">
                <DigitText.Text text={this.props.instructions} />
            </div>
        );
    }
}

export default Instructions;
