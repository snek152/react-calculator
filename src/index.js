import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom'
import Calculator from "./Calculator"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import { HashRouter } from 'react-router-dom';
import Scientific from './Scientific'

ReactDOM.render(
  <HashRouter>
    <Route exact path="/react-calculator/" component={Calculator} />
    <Route path="/react-calculator/scientific" component={Scientific} />
  </HashRouter>,
  document.getElementById('container')
)