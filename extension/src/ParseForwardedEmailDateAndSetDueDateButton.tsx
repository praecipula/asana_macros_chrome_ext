import React from 'react';
import ScriptButton from "./ScriptButton"
import UrlUnderstander from './UrlUnderstander';

interface IParseDateAndSetDueDateTime {
  understander: UrlUnderstander
}

export class ParseForwardedEmailDateAndSetDueDateButton extends ScriptButton<any, IParseDateAndSetDueDateTime> {
  constructor(props: any) {
    super(props);
    this.state = {
      understander: new UrlUnderstander(),
    }
  };

  parseAndSetDateTime = () => {
    console.log("Hello!");
    console.log(this);
    console.log(this.state.understander.getTaskIdIfPresent());
  }

  render() {
    return (<input type="button" value="Parse and set due datetime from email" onClick={this.parseAndSetDateTime}/>);
  }

}

export default ParseForwardedEmailDateAndSetDueDateButton;
