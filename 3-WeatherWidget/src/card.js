import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { APIKEY } from './key.js';
import fetchWeather from './api.js';
import moment from 'moment';
import RefreshIcon from '@material-ui/icons/Refresh';
import { ToggleButtonGroup, ToggleButton, Skeleton } from '@material-ui/lab/';
import {
    Card, CardActions, CardContent, CardHeader, CircularProgress, Icon,
    IconButton, makeStyles, Typography
} from '@material-ui/core';

let UNITS = 'imperial';
const ZIP = '60654';

const useStyles = makeStyles({
    root: {
        width: 450,
        height: 300
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

        setTime("--");
        setTemp("--");
        setIcon("--");
        setDesc("--");

        fetchWeather(getURL(UNITS))
            .then((json) => {
                // console.dir(json);
                const data = json.list[0];
                let d = new Date();
                console.dir(data);
                setTime(moment(data.dt_txt)
                    .format('dddd, MMMM Do YYYY, h:mm:ss a'));
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

    const getIcon = () => {
        if (icon !== "--" && desc !== "--") {
            let iconSrc = 'https://openweathermap.org/img/wn/' + icon + '.png';
            return (
                <Icon aria-label={desc}>
                    <img src={iconSrc} alt={desc} />
                </Icon>
            )
        } else {
            return (
                <Skeleton
                    variant="circle"
                    width={30}
                    height={30}
                    animation="pulse"
                />
            )
        }
    }

    const getTime = () => {
        if (time !== "--") {
            return time
        } else {
            return (
                <Skeleton
                    variant="text"
                    width={250}
                    animation="wave"
                />
            )
        }
    }

    const getTemp = () => {
        if (temp != "--") {
            return (
                <Typography aria-label="temperature" variant="h1" component="h1">
                    {temp}&#176;
                </Typography>
            )
        } else {
            return <CircularProgress color="inherit" />
        }
    }

    useEffect(() => {
        getWeather("WEATHERCARD");
    }, []);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    getIcon()
                }
                action={
                    <IconButton
                        aria-label="refresh"
                        onClick={() => { getWeather("REFRESH") }}
                    >
                        <RefreshIcon />
                    </IconButton>
                }
                title="Weather"
                subheader={getTime()}
            />
            <CardContent>
                {getTemp()}
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