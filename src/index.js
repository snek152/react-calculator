import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom'
import Calculator from "./Calculator"
import "./index.css"

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" exact component={Calculator} />
  </BrowserRouter>,
  document.getElementById('container')
);
