import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import './index.css';
import { APIKEY } from './key.js'

let ZIP = '60654'
const URL = 'https://api.openweathermap.org/data/2.5/forecast?zip='
    + ZIP + '&APPID=' + APIKEY;

class Card extends React.Component {
    getHeader(json) {
        let date = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
        //let icon = this.json.weather.icon;

        console.log(json);

        return (
            <section className="header">

                Weather
                {date}
                REFRESH BUTTON
            </section>
        );
    }

    getContent() {
        return (
            <section className="content">
                CONTENT
            </section>
        );
    }

    getActions() {
        return (
            <section className="actions">
                ACTIONS
            </section>
        );
    }

    render() {
        const json = getWeather("Called from here");
        console.log(json);

        let header = this.getHeader(this.props.json);
        let content = this.getContent();
        let actions = this.getActions();

        return (
            <section className="card">
                {header}
                {content}
                {actions}
            </section>
        );
    }
}

ReactDOM.render(
    <Card
        json={getWeather("Called from card")}
    />,
    document.getElementById('root')
);

function getWeather(message) {
    console.log(message);
    let jsondata;
    fetch(URL).then(
        function (u) { return u.json(); }
    ).then(
        function (json) {
            jsondata = json;
        }
    )
    return jsondata;
}