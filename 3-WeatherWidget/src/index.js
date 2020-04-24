import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { APIKEY } from './key.js'

let ZIP = '60654'
let url = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + ZIP + '&APPID=' + APIKEY;

fetch(url).then(function (response) {
    response.json().then(function (json) {
        console.log(json);
    });
});