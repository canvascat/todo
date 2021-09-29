import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import { App } from './App';
import { TimerView } from './pages/mobx';
import './styles/common.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/mobx' component={TimerView} />
        <Route path='/' component={App} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
