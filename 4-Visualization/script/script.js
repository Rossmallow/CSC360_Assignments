/* script/script.js */
/* Ross Nelson Assignment 4: Visualization */
/* May 5th, 2020 */

const URL = 'https://data.cityofchicago.org/resource/w8km-9pzd'; // API
let ALL = [[], [], [], [], []]; /* 2D array to hold values
                                   0: years, 1: total, 2: rail, 3: bus, 4: paratransit */

// Make ajax request
function fetchData(url) {
    return fetch(url)
        .then((response) => {
            return response.json();
        })

}

// Parse ajax response
function getData(url) {
    return fetchData(url)
        .then((json) => {
            console.log(json)
            json.map(obj => {
                // Parse response and fill arrays with appropriate values
                ALL[0].push(obj.year);
                ALL[1].push(obj.total);
                ALL[2].push(obj.rail);
                ALL[3].push(obj.bus);
                ALL[4].push(obj.paratransit);
            })
            return;
        })
        .catch(err => {
            ALL[0] = ["Could not retrieve"];
            ALL[1] = [0];
            ALL[2] = [0];
            ALL[3] = [0];
            ALL[4] = [0];
            return;
        });
}

// Call getData to fill ALL array with appropriate values from the ajax request
getData(URL)
    .then(() => {
        let ctx = document.getElementById('myChart').getContext('2d');
        let chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                labels: ALL[0],
                datasets: [{
                    label: 'Total',
                    backgroundColor: 'rgb(147, 243, 169)',
                    borderColor: 'rgb(87, 237, 120)',
                    data: ALL[1]
                },
                {
                    label: 'Rail',
                    backgroundColor: 'rgb(242, 145, 150)',
                    borderColor: 'rgb(235, 85, 92)',
                    data: ALL[2]
                },
                {
                    label: 'Bus',
                    backgroundColor: 'rgb(151, 145, 240)',
                    borderColor: 'rgb(98, 88, 232)',
                    data: ALL[3]
                },
                {
                    label: 'Paratransit',
                    backgroundColor: 'rgb(252, 212, 148)',
                    borderColor: 'rgb(249, 174, 52)',
                    data: ALL[4]
                }]
            },

            // Configuration options go here
            options: {
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Boardings',
                        },
                        type: 'logarithmic',
                        ticks: {
                            callback: function (value, index, values) {
                                return Number(value.toString());
                            }
                        }
                    }]
                }
            }
        });
    });