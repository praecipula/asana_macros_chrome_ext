/*global chrome*/

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

interface IParseTextLinks {
  understander: UrlUnderstander
}

export class OpenLinksInTaskButton extends ScriptButton<any, IParseTextLinks> {
  constructor(props: any) {
    super(props);
    this.state = {
      understander: new UrlUnderstander("https://app.asana.com/0/1154676001323306/1154676001323309"),
    }
  };

  parseForLinks = () => {
    let client = Asana.Client.create().useAccessToken(AppSecrets.asana_pat);
    let promise = this.state.understander.getTaskIdIfPresent();
    promise.then((res: UrlMatch) => {
        console.log("The result is " + res.task_gid);
        return client.tasks.findById(res.task_gid, {"fields": ["name", "gid", "html_notes"]});
      }
    ).then((apiResult: any) => {
      console.log(apiResult);
      console.log("Parsing task notes");
      let parser = new DOMParser();
      let structure = parser.parseFromString(apiResult.html_notes, "application/xml");
      let links = structure.getElementsByTagName('a')
      for (let i: number = 0; i < links.length; i++){ 
        let link_url = links[i].getAttribute("href");
        console.log(link_url);
        chrome.tabs.create({ url: link_url || "https://app.asana.com"});
      }

      debugger;
    });
  }

  render() {
    return (<input type="button" value="Open links in this task" onClick={this.parseForLinks}/>);
  }

}

export default OpenLinksInTaskButton;
