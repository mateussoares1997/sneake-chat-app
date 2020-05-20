import React from 'react';
import Welcome from '../Welcome';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter	outer>
        <Switch>
            <Route exact path="/" component={Welcome} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
