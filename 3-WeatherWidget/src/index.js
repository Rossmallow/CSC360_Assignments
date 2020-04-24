import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { APIKEY } from './key.js'

let ZIP = '60654'
let url = 'https://api.openweathermap.org/data/2.5/forecast?zip='
    + ZIP + '&APPID=' + APIKEY;

fetch(url).then(function (response) {
    response.json().then(function (json) {
        console.log(json);
    });
});

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    getHeader() {
        return (
            <div className="header">
                HEADER
            </div>
        );
    }

    getContent() {
        return (
            <div className="content">
                CONTENT
            </div>
        );
    }

    getActions() {
        return (
            <div className="actions">
                ACTIONS
            </div>
        );
    }

    render() {
        let header = this.getHeader();
        let content = this.getContent();
        let actions = this.getActions();


        return (
            <div className="card">
                {header}
                {content}
                {actions}
            </div>
        );
    }
}

ReactDOM.render(
    <Card />,
    document.getElementById('root')
);