/* src/api.js */
/* Ross Nelson Assignment 6: HTTP Backend */
/* May 19th, 2020 */

export default (URL) => {
    return fetch(URL)
        .then((response) => {
            // console.dir(response);
            return response.json();
        })
}