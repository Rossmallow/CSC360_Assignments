/* src/api.js */
/* Ross Nelson Assignment 3: Weather Widget */
/* April 28th, 2020 */

export default (URL) => {
    return fetch(URL)
        .then((response) => {
            // console.dir(response);
            return response.json();
        })
}