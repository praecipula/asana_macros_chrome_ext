import React from 'react';
import ScriptButton from "../ScriptButton"
import UrlUnderstander from '../UrlUnderstander';
import { UrlMatch } from '../UrlUnderstander';

declare var Asana: any;

interface IParseDateAndSetDueDateTime {
  understander: UrlUnderstander
}

export class ParseForwardedEmailDateAndSetDueDateButton extends ScriptButton<any, IParseDateAndSetDueDateTime> {
  constructor(props: any) {
    super(props);
    this.state = {
      understander: new UrlUnderstander("https://app.asana.com/0/1136793057241237/1144512157268097"),
    }
  };

  parseAndSetDateTime = () => {
    console.log("Hello!");
    let promise = this.state.understander.getTaskIdIfPresent();
    promise.then((res: UrlMatch) => {
        console.log("The result is " + res.task_gid);
        let myTestingPatRemoveMe = "0/aeca1b52e85be7554917a8ce3ef31981";
        let client = Asana.Client.create().useAccessToken(myTestingPatRemoveMe);
        return client.tasks.findById(res.task_gid);
      }
    ).then((apiResult: any) => {
      console.log(apiResult);
    });
  }

  render() {
    return (<input type="button" value="Parse and set due datetime from email" onClick={this.parseAndSetDateTime}/>);
  }

}

export default ParseForwardedEmailDateAndSetDueDateButton;
