import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

require('./style.css');

import App from './pages/App';
import Home from './pages/Home';
import Image from './pages/Image';
import Album from './pages/Album';
import About from './pages/About';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/:album" component={Album}/>
      <Route path="/:album/:image" component={Image}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
