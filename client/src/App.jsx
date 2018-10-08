/* eslint-env browser */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NewBill from './pages/NewBill';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/newBill" component={NewBill} />
    </Switch>
  </BrowserRouter>
);

export default App;
