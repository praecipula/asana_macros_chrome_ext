import React from 'react';
import './App.css';

import ScoreSprintScriptButton from './ScoreSprintScriptButton';
import ParseForwardedEmailDateAndSetDueDateButton from './ParseForwardedEmailDateAndSetDueDateButton/Button';

export class App extends React.Component<{}, {}> {
  render() {
    return (
    <div className="App">
      <div className="container">
        <h2 className="App-header">Quick Scripts
        </h2>
        <ScoreSprintScriptButton />
        <ParseForwardedEmailDateAndSetDueDateButton />
      </div>
    </div>
    )
  };
}

export default App;
