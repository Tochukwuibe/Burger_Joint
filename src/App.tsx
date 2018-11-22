import * as React from 'react';
import AppRouter from './app-router';

export class App extends React.Component {


  public render() {
    const style = { height: '100%' };

    return (
      <div style={style} className="page">
        <AppRouter />
      </div>
    );
  }
}

export default App;
