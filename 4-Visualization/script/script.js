/* script/script.js */
/* Ross Nelson Assignment 4: Visualization */
/* May 5th, 2020 */

function fetchData(URL) {
    return fetch(URL)
        .then((response) => {
            // console.dir(response);
            return response.json();
        })

}

function getData(URL) {
    let years = []
    let total = []
    let rail = []
    let bus = []
    let paratransit = []

    fetchData(URL)
        .then((json) => {
            console.log(json)
            json.map(obj => {
                years.push(obj.year);
                total.push(obj.total);
                rail.push(obj.rail);
                bus.push(obj.bus);
                paratransit.push(obj.paratransit);
            })
        })
        .catch(err => {
            years = ["Could not retrieve"];
            total = [0];
            rail = [0];
            bus = [0];
            paratransit = [0];
        });

    return [years, total, rail, bus, paratransit];
}

function getYears() {
    let ALL = getData('https://data.cityofchicago.org/resource/w8km-9pzd');
    console.log(ALL);
    console.log(ALL[0]);
    console.log(ALL[0][0]);
    return ["January", "February", "March", "April", "May", "June", "July"];
}

let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: getYears(),
        datasets: [{
            label: 'Total',
            backgroundColor: 'rgb(147, 243, 169)',
            borderColor: 'rgb(87, 237, 120)',
            data: [0, 10, 5, 2, 500000, 30, 45]
        },
        {
            label: 'Rail',
            backgroundColor: 'rgb(242, 145, 150)',
            borderColor: 'rgb(235, 85, 92)',
            data: [10, 5, 2, 20, 30, 45, 0]
        },
        {
            label: 'Bus',
            backgroundColor: 'rgb(151, 145, 240)',
            borderColor: 'rgb(98, 88, 232)',
            data: [10, 5, 2, 20, 30, 45, 0]
        },
        {
            label: 'Paratransit',
            backgroundColor: 'rgb(252, 212, 148)',
            borderColor: 'rgb(249, 174, 52)',
            data: [10, 5, 2, 20, 30, 45, 0]
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
