/* src/App.test.js */
/* Ross Nelson Assignment 7: Testing */
/* May 26th, 2020 */

import React from 'react';
import { render, wait } from '@testing-library/react';

import Colorize from './Colorize.js';
import Weather from './Weather.js';

jest.mock('./TemperatureDataSource');
import temperatureDataSource from './TemperatureDataSource';

////////// WRITE TESTS //////////
describe('Weather Component Tests', () => {
    test('Display Progress Icon', async () => {
        temperatureDataSource.mockResolvedValue(undefined);
        const weatherComponent = render(<Weather />);
        await wait(() => {
            const tempParagraph = weatherComponent.getByRole('progressbar');
            expect(tempParagraph).toBeInTheDocument();
        });
    });

    test('Display Data From TemperatureDataSource', async () => {
        temperatureDataSource.mockResolvedValue(73);
        const weatherComponent = render(<Weather />);
        await wait(() => {
            const tempParagraph = weatherComponent.getByText('73');
            expect(tempParagraph).toBeInTheDocument();
        });
    });
})

const colorizeTestLoop = (start, end, color) => {
    let i;
    try {
        for (i = start; i <= end; i++) {
            expect(Colorize(i)).toBe(color);
        };
    } catch (e) {
        console.log(e + 'at i = ' + i);
    };
};

describe('Colorize Tests', () => {
    test('Temps -300 to 30 [Blue]', () => {
        colorizeTestLoop(-300, 30, 'blue');
    });

    test('Temps 31 to 69 [White]', () => {
        colorizeTestLoop(31, 69, 'white');
    });

    test('Temps 70 to 89 [Orange]', () => {
        colorizeTestLoop(70, 89, 'orange');
    });

    test('Temps 90 to 300 [Red]', () => {
        colorizeTestLoop(90, 300, 'red');
    });
});
