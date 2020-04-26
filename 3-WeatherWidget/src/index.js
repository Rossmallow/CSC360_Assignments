import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import './index.css';
import { APIKEY } from './key.js'
import fetchWeather from './api.js'
import RefreshIcon from '@material-ui/icons/Refresh';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab/';

let UNITS = 'imperial';
let ZIP = '60654';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: "--",
            icon: "--",
            alt: "--"
        }
    }

    componentDidMount() {
        console.log(getURL(UNITS, ZIP));
        fetchWeather(getURL(UNITS, ZIP))
            .then((json) => {
                // console.dir(json);
                const data = json.list[0];
                console.dir(data);
                this.setState({
                    time: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
                    temp: data.main.temp,
                    icon: data.weather[0].icon,
                    description: data.weather[0].description
                })
            })
            .catch(err => {
                this.setState({
                    tempStr: "Could not retrieve"
                })
                console.error("Weather request failed", err);
            });
    }

    getHeader() {

        const imageSrc = 'https://openweathermap.org/img/wn/'
            + this.state.icon + '@2x.png';

        console.log("temp: " + this.state.temp
            + "\n" + "icon: " + this.state.icon
            + "\n" + "description: " + this.state.description);

        return (
            <section className="header">
                <img src={imageSrc} alt={this.state.description} />
                Weather
                {this.state.time}
                <RefreshIcon onClick={() => this.componentDidMount()} />
            </section>
        );
    }

    getContent() {
        return (
            <section className="content">
                <h1>{this.state.temp}&#176;</h1>
            </section>
        );
    }

    getActions() {
        const handleUnit = (event, newUnits) => {
            if (newUnits !== null) {
                UNITS = newUnits;
                console.log("UNITS: " + UNITS)
                this.componentDidMount();
            }
        };

        return (
            <section className="actions">
                <div className="{classes.toggleContainer}">
                    <ToggleButtonGroup
                        value={UNITS}
                        exclusive
                        onChange={handleUnit}
                        aria-label="temperature units"
                    >
                        <ToggleButton value="imperial" aria-label="imperial">
                            F&#176;
                        </ToggleButton>
                        <ToggleButton value="metric" aria-label="metric">
                            C&#176;
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </section>
        );
    }

    render() {
        let header = this.getHeader();
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
    <Card />,
    document.getElementById('root')
);

function getURL(units, zip) {
    return 'https://api.openweathermap.org/data/2.5/forecast?'
        + 'zip=' + zip + '&units=' + units + '&APPID=' + APIKEY;
}