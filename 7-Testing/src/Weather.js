import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import temperatureDataSource from "./TemperatureDataSource.js"
import colorize from "./Colorize"

/**
 * The weather component is responsible for obtaining a weather value
 * from the weather data source and displaying it to the user in some
 * kind of text format. The data source should be consulted and the
 * value should be displayed upon initial mounting of the React component.
 * 
 * The color of the weather value text needs to be determined by the `Colorize` module.
 */
export default class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temp: undefined
        }
    }

    componentDidMount() {
        temperatureDataSource()
            .then(temp => {
                this.setState({
                    temp: temp
                })
            })
    }

    render() {
        const temperature = this.state.temp;
        return <>
            {this.state.temp === undefined ?
                <CircularProgress />
                :
                <p style={{ color: colorize(temperature) }} id="temperature">{temperature}</p>
            }
        </>
    }
}