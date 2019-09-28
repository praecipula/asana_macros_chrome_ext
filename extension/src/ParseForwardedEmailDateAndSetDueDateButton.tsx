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
    let promise = this.state.understander.getTaskIdIfPresent();
    promise.then((res: string) => {
        console.log("The result is " + res);
      }
    )
  }

  render() {
    return (<input type="button" value="Parse and set due datetime from email" onClick={this.parseAndSetDateTime}/>);
  }

}

export default ParseForwardedEmailDateAndSetDueDateButton;
