import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Calculator from "./Calculator"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import Scientific from './Scientific'

ReactDOM.render(
  <HashRouter basename="/">
    <Route exact path="/" component={Calculator} />
    <Route path="/scientific" component={Scientific} />
  </HashRouter>,
  document.getElementById('container')
)