/**
 * Responsible for determining the color of the text that's used to show
 * the user the temperature.
 * 
 * If the temperature is cold (<= 30) return 'blue'
 * If the temperature is warm (>= 70) return 'orange'
 * If the tempature is hot (>= 90) return 'red'
 * 
 * If the temperature is NOT a numeric value OR does not meet any 
 * of the conditions above, return 'white'
 * 
 * @param {Number} fahrenheitValue 
 * @returns {String} A string representing the CSS color
 */
export default function (fahrenheitValue) {
    var color = 'white';
    if (isNumeric(fahrenheitValue)) {
        if (fahrenheitValue >= 90) {
            color = 'red';
        } else if (fahrenheitValue >= 70) {
            color = 'orange';
        } else if (fahrenheitValue <= 30) {
            return 'blue';
        }
    }
    return color;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}