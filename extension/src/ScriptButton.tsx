import React from 'react';

//export interface ScriptButtonProps { text: string; }

class ScriptButton<IScriptButtonProps, IScriptButtonState> extends React.Component<any, any> {
  render() {
    return (<input type="button" value="This is a default button! Oops!" />);
  }
}

export default ScriptButton;
