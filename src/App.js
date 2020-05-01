import React from 'react';
import Question from './Qustion'
import {BrowserRouter,Route, Switch } from 'react-router-dom'
import signIn from './SignIn';
import SignIn from './SignIn';
function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path='/' component={SignIn}/>
    <Route exact path='/input' component={Question}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
