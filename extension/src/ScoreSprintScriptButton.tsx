import React from 'react';
import ScriptButton from "./ScriptButton"
import UrlUnderstander from './UrlUnderstander';

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
    console.log("Hello!");
    console.log(this);
    console.log(this.state.understander.getTaskIdIfPresent());
  }

  render() {
    return (<input type="button" value="Score the current sprint" onClick={this.scoreSprint}/>);
  }

}

export default ScoreSprintScriptButton;
