/* src/index.js */
/* Ross Nelson Assignment 5: Routing */
/* Mayu 12th, 2020 */

import React from 'react';
import ReactDOM from 'react-dom';
import Page from './page.js';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
        <Page />
    </Router>,
    document.querySelector('#root')
);