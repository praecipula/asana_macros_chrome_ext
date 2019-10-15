import React from 'react';
import ScriptButton from "../ScriptButton"
import UrlUnderstander from '../UrlUnderstander';
import { UrlMatch } from '../UrlUnderstander';
// This is an import from outside of the repo because we don't want to check this file in.
// It is maintained in a separate private Github repository.
// If we were to release the chrome extension publicly this would still be insecure,
// but ¯\_(ツ)_/¯ why set up a server just to store secrets for my own private extension?
import AppSecrets from '../AppSecrets/AppSecrets';

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
        let client = Asana.Client.create().useAccessToken(AppSecrets.asana_pat);
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
