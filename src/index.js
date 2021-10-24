import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom'
import Calculator from "./Calculator"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import Scientific from './Scientific';

ReactDOM.render(
  <BrowserRouter history={window.history}>
    <Route exact path="/react-calculator/" component={Calculator} />
    <Route path="/react-calculator/scientific" component={Scientific} />
  </BrowserRouter>,
  document.getElementById('container')
)