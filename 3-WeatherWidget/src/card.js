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


// Returns HTML for the page depending on the data returned from the API
export default function WeatherCard() {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [units, setUnits] = useState("imperial");

    const [time, setTime] = useState("--");
    const [temp, setTemp] = useState("--");
    const [icon, setIcon] = useState("--");
    const [desc, setDesc] = useState("--");

    // Returns a url to fetch the temperature with the appropriate units.
    const getURL = () => {
        return 'https://api.openweathermap.org/data/2.5/forecast?'
            // eslint-disable-next-line
            + 'zip=' + "60654" + '&units=' + units + '&APPID=' + APIKEY;
    }

    // Takes an optional message to be logged to the console
    // Sets hooks to the appropriate value based on the API data
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
                const data = json.list[0];
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

    // Toggles the value of 'units' if a new value is passed
    const handleUnit = (event, newUnits) => {
        if (newUnits !== null) {
            setUnits(newUnits);
        }
    };

    //  Returns an icon if 'loading' is false, else, returns a skeleton
    const getIcon = () => {
        if (!loading) {
            let iconSrc = 'https://openweathermap.org/img/wn/' + icon + '.png';
            let ariaLabel = "The current forcast is " + desc;
            return (
                <img src={iconSrc} alt={ariaLabel} aria-label={ariaLabel} />
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
                        className="iconSkeleton"
                    />
                </Fade>
            )
        }
    }

    // Returns the date if 'loading' is false, else, returns a skeleton
    const getTime = () => {
        if (!loading) {
            let ariaLabel = "The temperature was last updated on " + time;
            return <time aria-label={ariaLabel}>{time}</time>
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
                        className="timeSkeleton"
                    />
                </Fade>
            )
        }
    }

    // Returns the temperature if 'loading' is false, else, returns a loading icon
    const getTemp = () => {
        if (!loading) {
            let ariaLabel = "The current temperature is " + temp + " degrees "
                + (units === "imperial" ? "fahrenheit" : "celsius");
            return (
                <Typography aria-label={ariaLabel} variant="h1" component="h1">
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
                    <CircularProgress color="inherit" className="tempProgress" />
                </Fade>
            )
        }
    }

    useEffect(() => {
        getWeather("FETCH FROM PAGE LOAD")
        // eslint-disable-next-line
    }, [units, setUnits]);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    getIcon()
                }
                action={
                    <IconButton
                        aria-label="fetch weather"
                        onClick={() => { getWeather("FETCH FROM RELOAD") }}
                    >
                        <RefreshIcon />
                    </IconButton>
                }
                title="Weather"
                subheader={getTime()}
            />
            <CardContent className="content">
                {getTemp()}
            </CardContent>
            <CardActions>
                <ToggleButtonGroup
                    value={units}
                    exclusive
                    onChange={handleUnit}
                    aria-label="toggle between fahrenheit and celsius"
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