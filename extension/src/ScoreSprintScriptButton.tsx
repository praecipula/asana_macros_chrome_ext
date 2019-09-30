import React from 'react';
import ScriptButton from "./ScriptButton"
import UrlUnderstander from './UrlUnderstander';
import { UrlMatch } from './UrlUnderstander';
import ClientFactory from './ClientFactory';

interface IScoreSprintState {
  understander: UrlUnderstander
}

export class ScoreSprintScriptButton extends ScriptButton<any, IScoreSprintState> {
  constructor(props: any) {
    super(props);
    this.state = {
      understander: new UrlUnderstander(),
    }
  };

  scoreSprint = () => {
    this.state.understander.getTaskIdIfPresent().then(
      (captures: UrlMatch) => {
        console.log(captures)
        console.log("Task gid is " + captures.task_gid + " and " + captures.project_gid);
    }).then( () => {
        console.log(ClientFactory.client());
    });
  }

  render() {
    return (<input type="button" value="Score the current sprint" onClick={this.scoreSprint}/>);
  }

}

export default ScoreSprintScriptButton;
