import React, { useState } from 'react';
import Welcome from '../Welcome';
import Chat from '../Chat';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {

  const [ userName, setUserName ] = useState('')

  return (
    <BrowserRouter	outer>
        <Switch>
            <Route exact path="/" render={ (props) =>
                  <Welcome userName={userName} setUserName={setUserName} />
            } />
        </Switch>
        <Switch>
            <Route path="/chat" render={ (props) =>
                  <Chat userName={userName} setUserName={setUserName} />
            } />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
