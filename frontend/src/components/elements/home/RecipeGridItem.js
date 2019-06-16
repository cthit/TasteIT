import React, {Component} from 'react'
import {DigitText, DigitButton} from '@cthit/react-digit-components'
import './RecipeGridItem.css'

class RecipeGridItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipename: this.props.recipename,
      recipetime: this.props.recipetime,
      // Rest of props are to be sent to recipe page
      recipeamount: this.props.recipeamount,
      recipedescription: this.props.recipedescription,
      recipeingredients: this.props.recipeingredients,
      recipeinstructions: this.props.recipeinstructions,
      recipecreator: this.props.recipecreator
    };
  }

  openRecipePage = () => {
    // Store information in localStorage, then opens Recipe page
    // TODO: Figure out how to open a new page
  }

  formatTime() {
    var str = "Time: ";
    var returnStr = str.concat(this.state.recipetime, " min");
    return returnStr;
  }

  render() {
    return (
      <div className="recipegriditem">
        <DigitText.Title className="recipetitle"
                         white="true"
                         text={this.state.recipename} />
        <DigitText.Text text={this.formatTime()}
                        white="true"/>
        <div className="buttondiv">
          <DigitButton text="Open recipe"
                       onClick={this.openRecipePage()}
                       raised="true"/>
        </div>
      </div>
    );
  }

}

export default RecipeGridItem;
