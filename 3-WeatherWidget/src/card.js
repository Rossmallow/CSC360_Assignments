import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { APIKEY } from './key.js';
import fetchWeather from './api.js';
import moment from 'moment';
import RefreshIcon from '@material-ui/icons/Refresh';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab/';
import {
    Card, CardHeader, CardActions, CardContent, IconButton, Typography,
    makeStyles, Icon, Backdrop
} from '@material-ui/core';

let UNITS = 'imperial';
const ZIP = '60654';

const useStyles = makeStyles({
    root: {
        maxWidth: 450
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

function getURL(units, zip = ZIP) {
    return 'https://api.openweathermap.org/data/2.5/forecast?'
        + 'zip=' + zip + '&units=' + units + '&APPID=' + APIKEY;
}

export default function WeatherCard() {
    const classes = useStyles();

    const [time, setTime] = useState("--");
    const [temp, setTemp] = useState("--");
    const [icon, setIcon] = useState("--");
    const [desc, setDesc] = useState("--");

    const getWeather = (message = "") => {
        if (message !== "") {
            console.log(message);
        }
        console.log(getURL(UNITS));
        fetchWeather(getURL(UNITS))
            .then((json) => {
                // console.dir(json);
                const data = json.list[0];
                let d = new Date();
                console.dir(data);
                setTime(moment(data.dt_txt).format('dddd, MMMM Do YYYY, h:mm:ss a'));
                setTemp(data.main.temp);
                setIcon(data.weather[0].icon);
                setDesc(data.weather[0].description);
            })
            .catch(err => {
                setTime("Could not retrieve");
                setTemp("Could not retrieve");
                setIcon("Could not retrieve");
                setDesc("Could not retrieve");
                console.error("Weather request failed", err);
            });
    }

    const handleUnit = (event, newUnits) => {
        if (newUnits !== null) {
            UNITS = newUnits;
            console.log("UNITS: " + UNITS)
            getWeather("HANDLE UNIT");
        }
    };

    const weatherIconSrc = 'https://openweathermap.org/img/wn/' + icon + '.png';

    getWeather("WEATHERCARD");

    if (temp === "") {
        return <p>LOADING...</p>
    }
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Icon aria-label={desc}>
                        <img src={weatherIconSrc} alt={desc} />
                    </Icon>
                }
                action={
                    <IconButton aria-label="refresh" onClick={() => { getWeather("REFRESH") }}>
                        <RefreshIcon />
                    </IconButton>
                }
                title="Weather"
                subheader={time}
            />
            <CardContent>
                <Typography aria-label="temperature" variant="h1" component="h1">
                    {temp}&#176;
                </Typography>
            </CardContent>
            <CardActions>
                <ToggleButtonGroup
                    value={UNITS}
                    exclusive
                    onChange={handleUnit}
                    aria-label=""
                >
                    <ToggleButton value="imperial" aria-label="fahrenheit">
                        &#8457;
                        </ToggleButton>
                    <ToggleButton value="metric" aria-label="celsius">
                        &#8451;
                        </ToggleButton>
                </ToggleButtonGroup>
            </CardActions>
        </Card>
    );
}



// class Card extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             temp: "--",
//             icon: "--",
//             alt: "--"
//         }
//     }

//     componentDidMount() {
//         console.log(getURL(UNITS));
//         fetchWeather(getURL(UNITS))
//             .then((json) => {
//                 // console.dir(json);
//                 const data = json.list[0];
//                 console.dir(data);
//                 this.setState({
//                     time: moment(data.dt_txt).format('dddd, MMMM Do YYYY, h:mm:ss a'),
//                     temp: data.main.temp,
//                     icon: data.weather[0].icon,
//                     description: data.weather[0].description
//                 })
//             })
//             .catch(err => {
//                 this.setState({
//                     tempStr: "Could not retrieve"
//                 })
//                 console.error("Weather request failed", err);
//             });
//     }

//     getHeader() {

//         const imageSrc = 'https://openweathermap.org/img/wn/'
//             + this.state.icon + '@2x.png';

//         console.log("temp: " + this.state.temp
//             + "\n" + "icon: " + this.state.icon
//             + "\n" + "description: " + this.state.description);

//         return (
//             <section className="header">
//                 <img src={imageSrc} alt={this.state.description} />
//                 Weather
//                 {this.state.time}
//                 <button><RefreshIcon aria-label="refresh" aria-hidden="false"
//                     onClick={() => this.componentDidMount()}
//                 /></button>
//             </section>
//         );
//     }

//     getContent() {
//         let ariaLabel = this.state.temp + ' Degrees'

//         return (
//             <section className="content">
//                 <h1 aria-label='ariaLabel'>{this.state.temp}&#176;</h1>
//             </section>
//         );
//     }

//     getActions() {
//         const handleUnit = (event, newUnits) => {
//             if (newUnits !== null) {
//                 UNITS = newUnits;
//                 console.log("UNITS: " + UNITS)
//                 this.componentDidMount();
//             }
//         };

//         let ariaLabel = "Toggle units. " + { UNITS } + " units selected."

//         return (
//             <section className="actions">
//                 <div className="toggleContainer">
//                     <ToggleButtonGroup
//                         value={UNITS}
//                         exclusive
//                         onChange={handleUnit}
//                         aria-label={ariaLabel}
//                     >
//                         <ToggleButton value="imperial" aria-label="fahrenheit">
//                             &#8457;
//                         </ToggleButton>
//                         <ToggleButton value="metric" aria-label="celsius">
//                             &#8451;
//                         </ToggleButton>
//                     </ToggleButtonGroup>
//                 </div>
//             </section >
//         );
//     }

//     render() {
//         let header = this.getHeader();
//         let content = this.getContent();
//         let actions = this.getActions();

//         return (
//             <section className="card">
//                 {header}
//                 {content}
//                 {actions}
//             </section>
//         );
//     }
// }
