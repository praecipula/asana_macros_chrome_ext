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
    let client = Asana.Client.create().useAccessToken(AppSecrets.asana_pat);
    let promise = this.state.understander.getTaskIdIfPresent();
    promise.then((res: UrlMatch) => {
        console.log("The result is " + res.task_gid);
        return client.tasks.findById(res.task_gid);
      }
    ).then((apiResult: any) => {
      console.log(apiResult);
      console.log("Parsing task description ");
      let regexp = new RegExp('.*Date: (?<send_date>.*) at (?<send_time_local>.*(AM|PM))');
      let text = apiResult.notes;
      let match: any = regexp.exec(text);
      if (!match) {
        console.error("Could not parse date! " + text);
      }
      let date_time = new Date(match.groups.send_date + ' ' +  match.groups.send_time_local) 
      console.log("Setting due date to " + date_time + " (" + date_time.toISOString() + ")");
      return client.tasks.update(apiResult.gid, { due_at: date_time.toISOString() });
    });
  }

  render() {
    return (<input type="button" value="Parse and set due datetime from email" onClick={this.parseAndSetDateTime}/>);
  }

}

export default ParseForwardedEmailDateAndSetDueDateButton;
