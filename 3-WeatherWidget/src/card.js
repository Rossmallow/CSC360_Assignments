import React, { useState, useEffect } from 'react';
import './index.css';
import { APIKEY } from './key.js';
import fetchWeather from './api.js';
import moment from 'moment';
import RefreshIcon from '@material-ui/icons/Refresh';
import { ToggleButtonGroup, ToggleButton, Skeleton } from '@material-ui/lab/';
import {
    Card, CardActions, CardContent, CardHeader, CircularProgress, Fade, Icon,
    IconButton, makeStyles, Typography
} from '@material-ui/core';

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

export default function WeatherCard() {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [units, setUnits] = useState("imperial");

    const [time, setTime] = useState("--");
    const [temp, setTemp] = useState("--");
    const [icon, setIcon] = useState("--");
    const [desc, setDesc] = useState("--");

    const getURL = () => {
        return 'https://api.openweathermap.org/data/2.5/forecast?'
            + 'zip=' + "60654" + '&units=' + units + '&APPID=' + APIKEY;
    }

    const getWeather = (message = "") => {
        if (message !== "") {
            console.log(message);
        }

        setLoading(true);
        setTime("--");
        setTemp("--");
        setIcon("--");
        setDesc("--");

        fetchWeather(getURL())
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
                setLoading(false);
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
        console.log(units);
        let temp = newUnits;
        if (newUnits !== null) {
            console.log("New Units: " + temp);
            setUnits(temp);
            console.log("CHANGED UNITS TO: " + units);
            getWeather("FETCH FROM HANDLE UNIT");
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
                <Fade
                    in={loading}
                    style={{
                        transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <Skeleton
                        variant="circle"
                        width={30}
                        height={30}
                        animation="pulse"
                    />
                </Fade>
            )
        }
    }

    const getTime = () => {
        if (time !== "--") {
            return time
        } else {
            return (
                <Fade
                    in={loading}
                    style={{
                        transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <Skeleton
                        variant="text"
                        width={250}
                        animation="wave"
                    />
                </Fade>
            )
        }
    }

    const getTemp = () => {
        if (!loading) {
            return (
                <Typography aria-label="temperature" variant="h1" component="h2">
                    {temp}&#176;
                </Typography>
            )
        } else {
            return (
                <Fade
                    in={loading}
                    style={{
                        transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress color="inherit" />
                </Fade>
            )
        }
    }

    useEffect(() => {
        getWeather("FETCH FROM PAGE LOAD")
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
                        onClick={() => { getWeather("FETCH FROM RELOAD") }}
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
                    value={units}
                    exclusive
                    onChange={handleUnit}
                    aria-label="Toggle Box"
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