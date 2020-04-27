import React from 'react';
import Question from './Qustion'
import {BrowserRouter,Route, Switch } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exactpath='/' component={Question}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
